import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { dataSource } from './app/data/dataSource';
import {router} from './app/routers/router';

import { routerAuth } from './app/routers/routerAuth';

const app = express();
const port = process.env.PORT || 3000;

// Connecion à la source de donnée pour TypeOrm
dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });


app.use(express.json());
app.use('/login',routerAuth);
app.use('/',router);

app.listen(port, () => {
  console.log(`server launched on port : ${port}`);
});





