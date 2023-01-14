import express,{Request,Response} from "express";

export const authRouter = express.Router();

authRouter.get('/',(req:Request,res:Response)=>{
  res.json('test nouvelle route');
  console.log('test');

});


