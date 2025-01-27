import { Session } from 'express-session';

declare global {
  namespace Express {
    interface Session {
      username?: string;
      userId?: number;
    }
  }
}
