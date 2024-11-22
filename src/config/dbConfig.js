import { MongoClient } from 'mongodb';

export default async function connecttoDB(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao);
        console.log('Connecting to DB cluster...');
        await mongoClient.connect();
        console.log('Sucessfully connected to MongoDB Atlas!');

        return mongoClient;
    } catch (erro) {
        console.error('Connection failed!', erro);
        process.exit();
    }
}