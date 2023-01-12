import express,{Request,Response} from "express";

export const routerAuth = express.Router();

routerAuth.get('/',(req:Request,res:Response)=>{
  res.json('test nouvelle route');
  console.log('test');

});
