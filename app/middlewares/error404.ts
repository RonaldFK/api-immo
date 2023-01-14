import { Request,Response } from "express";

export function error404(req:Request,res:Response) {
  res.status(404).json({Error:'Page not Found'});
}
