import express from "express";
import multer from "multer";
import cors from "cors";

import { createNewPost, listPosts, updatePost, uploadImg } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });

const upload = multer({dest:"./upload", storage});

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));
    app.get("/posts", listPosts); //Fetch all posts
    app.post("/posts", createNewPost); //Add a new post
    app.post("/upload", upload.single("img"), uploadImg);
    app.put("/upload/:id", updatePost)
}

export default routes;