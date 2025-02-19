import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
 const session_key = process.env.SESSION_SECRET || "session123";
 export const sessionSetup = ()=>{ 
    session({
      secret: 'session_key', // Change this to a strong secret key
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Session expiration (1 day)
      },
    })
};