
// Define an interface for your environment variables for better type checking
interface Env {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  NEXT_PUBLIC_MONGO_URI: string;
  // ... add other environment variables as needed
}

// Provide a function to safely access environment variables
export function getEnv(): Env {
  return {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
    NEXT_PUBLIC_MONGO_URI: process.env.NEXT_PUBLIC_MONGO_URI || ""
    // ... validate and export other environment variables
  };
}
