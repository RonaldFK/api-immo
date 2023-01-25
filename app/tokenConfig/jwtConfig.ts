import express from 'express';
const app = express();
import jwt from 'jsonwebtoken';
// const token = jwt.sign({ foo: 'bar' }, 'shhhhh');


const token = jwt.sign({
  // à remplacer par un objet
  data: 'userInfo'
}, 'secret', { expiresIn: '1h' });

console.log(token);


// try {
//   const decoded = jwt.verify(token, 'wrong-secret');
// } catch(err) {
//   // err
// }
