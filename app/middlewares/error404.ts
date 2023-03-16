import { Request,Response } from "express";

export function error404(_req:Request,res:Response) {
  res.status(404).json({Error:'Page not Found'});
}
