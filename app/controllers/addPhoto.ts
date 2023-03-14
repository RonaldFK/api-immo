import {Request,Response}from 'express';
import * as fs from 'fs';
import { string } from 'joi';
export const updloadPhoto = {
  async addPhoto(req:Request,res:Response){
    try{
      console.log(req.file);

      if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
      }

      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file.originalname,
      });
    }catch (err) {
      res.status(500).send({
        message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
      });
    }

  },
  getListPhoto(req:Request,res:Response) {
    console.log('GET PHOTO');

    const directoryPath = "./app/assets";
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        res.status(500).send({
          message: "Unable to scan files!",
        });
      }
      // eslint-disable-next-line prefer-const
      let fileInfos:string[] = [];


      files.forEach((file) => {
        return fileInfos.push({
          name: file,
          url: 'http://localhost:3000/photo/' + file,
        });
      });

      res.status(200).send(fileInfos);
    });
  },
  getPhoto(req:Request, res:Response){
    const fileName = req.params.name;
    const directoryPath = "app/assets/";

    res.download(directoryPath + fileName, fileName, (err) => {
      console.log('DOWNLOAD');

      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });
  },
};

// const upload = async (req, res) => {
//     try {
//       await uploadFile(req, res);

//       if (req.file == undefined) {
//         return res.status(400).send({ message: "Please upload a file!" });
//       }

//       res.status(200).send({
//         message: "Uploaded the file successfully: " + req.file.originalname,
//       });
//     } catch (err) {
//       res.status(500).send({
//         message: `Could not upload the file: ${req.file.originalname}. ${err}`,
//       });
//     }
//   };
