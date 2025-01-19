import { Session } from "express-session";

declare module "express-session" {
  interface Session {
    username?: string;
    userId?: number;  // or any other type based on your data
  }
}
