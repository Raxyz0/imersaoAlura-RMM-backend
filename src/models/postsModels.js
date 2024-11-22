import 'dotenv/config';
import { ObjectId } from "mongodb";
import connecttoDB from "../config/dbConfig.js";

const connectionData =  await connecttoDB(process.env.STRING_CONEXAO);

export async function getAllPosts() {
    const db = connectionData.db("Alura-IB"); //criamos uma variavel db que pega os dados da conexao com o banco
    const collection1 = db.collection("posts");//criamos uma coleção de posts vindo do banco que conectamos previamente 
    return collection1.find().toArray();
}

export async function createPost(newPost) {
    const db = connectionData.db("Alura-IB");
    const collection1 = db.collection("posts");
    return collection1.insertOne(newPost);
}

export async function postUpdate(id, updatedPost) {
    const db = connectionData.db("Alura-IB");
    const collection1 = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection1.updateOne({_id: new ObjectId(objID)}, {$set:updatedPost});
}