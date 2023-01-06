import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
const app = express();
import { dataSource } from './app/data/dataSource';
import {router} from './app/routers/router';

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const port = process.env.PORT || 3000;
app.use(router);
app.listen(port, () => {
  console.log(`server launched on port : ${port}`);
});





