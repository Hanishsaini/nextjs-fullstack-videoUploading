-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Enable Vector extension for embeddings
create extension if not exists vector;

-- USERS TABLE
create table public.users (
  id uuid references auth.users not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  is_pro boolean default false,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PROJECTS TABLE
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  description text,
  status text default 'active', -- active, archived
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MESSAGES TABLE (Chat History)
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade, -- Optional: link to project
  user_id uuid references public.users(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EMBEDDINGS TABLE (Vector Store)
create table public.embeddings (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  metadata jsonb,
  embedding vector(1536), -- OpenAI embedding size, adjust for Gemini if needed (768 for Gemini Pro)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- PAYMENTS TABLE
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  stripe_session_id text,
  amount integer not null,
  currency text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES

-- Users: Can view and update their own data
alter table public.users enable row level security;
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Users can update own data" on public.users for update using (auth.uid() = id);

-- Projects: Users can CRUD their own projects
alter table public.projects enable row level security;
create policy "Users can view own projects" on public.projects for select using (auth.uid() = user_id);
create policy "Users can insert own projects" on public.projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects" on public.projects for update using (auth.uid() = user_id);
create policy "Users can delete own projects" on public.projects for delete using (auth.uid() = user_id);

-- Messages: Users can CRUD their own messages
alter table public.messages enable row level security;
create policy "Users can view own messages" on public.messages for select using (auth.uid() = user_id);
create policy "Users can insert own messages" on public.messages for insert with check (auth.uid() = user_id);

-- Payments: Users can view their own payments
alter table public.payments enable row level security;
create policy "Users can view own payments" on public.payments for select using (auth.uid() = user_id);

-- FUNCTIONS & TRIGGERS

-- Handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
