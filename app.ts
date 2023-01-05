import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import {router} from './app/routers/router'

const app = express();

const port = process.env.PORT || 3000;
app.use(router)
app.listen(port, () => {
  console.log(`server launched on port : ${port}`);
});
