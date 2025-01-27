import express, { Request, Response, Router } from "express";

const sessionCheck:Router = express.Router();

sessionCheck.get('/checkout', async (req:Request, res:Response):Promise<void> => {
    if (!req.session.username) {
       res.status(401).send('Please log in to proceed to checkout');
       return;
    }
    res.send('Proceeding to checkout...');
  });
  