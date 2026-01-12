// import mongoose from "mongoose";
// import { cache } from "react";

// const MONGODB_URI = process.env.MONGODB_URI!;


// if (!MONGODB_URI) {
//     throw new Error("please define mongo_uri in env variable");
// }

// let cached= global.mongoose

// if(!cached){
//     cached = global.mongoose = {conn: null, promise: null}
// }

// export async function connectToDatabase(){
//     if(cached.conn){
//         return cached.conn
//     }

//     if(!cached.promise){
//      const opts = {
//         bufferCommands:true,
//         maxPoolSize: 10
//      }


//         mongoose.connect(MONGODB_URI, opts )
//         .then(() => mongoose.connection)
//     }


//     try {
//         cached.conn = await cached.promise
//     } catch (error) {
//         cached.promise = null
//         throw error
//     }
//     return cached.conn
// }import mongoose from "mongoose";
// lib/mongoose.ts// lib/mongoose.ts
// lib/mongoose.ts
// lib/db.ts or lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose;

if (!cached) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    // ✅ Already connected
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    // ✅ This returns a `Promise<typeof mongoose>`, which we’ll store as-is.
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
