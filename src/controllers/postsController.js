import {getAllPosts, createPost, postUpdate} from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createNewPost(req, res) {
    const newPost = req.body;
    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    } catch(createError) {
        console.error(createError.message);
        res.status(500).json({"Error":"Requisition failed (Create Post)"});
    }
}

export async function uploadImg(req, res) {
    const newPost = {
        description: "",
        imgurl: req.file.originalname,
        alttxt: ""
    };
    try {
        const postCreated = await createPost(newPost);
        const imgUpdate = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, imgUpdate);
        res.status(200).json(postCreated);
    } catch(createImgError) {
        console.error(createImgError.message);
        res.status(500).json({"Error":"Requisition failed"});
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    const imgAdress = `http://localhost:3000/${id}.png`
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await gerarDescricaoComGemini(imgBuffer);
        const updatedPost = { 
            imgurl: imgAdress,
            description: description,
            alttxt: req.body.alttxt
        }
        const postUpdated = await postUpdate(id, updatedPost);

        res.status(200).json(postUpdated);
    } catch(updateError) {
        console.error(updateError.message);
        res.status(500).json({"Error":"Update fail"});
    } 
}