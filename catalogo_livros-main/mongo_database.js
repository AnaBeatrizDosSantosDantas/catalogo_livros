import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";
const dbName = process.env.DB_NAME || "livros";
const collectionName = "livro";

app.use(
    cors({
        origin: "http://localhost:8080",
    })
);
app.use(express.json());

async function connectToDatabase() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Conexão estabelecida com sucesso!");
        return client.db(dbName).collection(collectionName);
    } catch (error) {
        console.error("Erro ao se conectar:", error);
        throw error;
    }
}

// Routes
app.get("/livros/:page", async (req, res) => {
    const page = parseInt(req.params.page);
    const skip = (page - 1) * 10;
    try {
        const collection = await connectToDatabase();
        const books = await collection.find({}).skip(skip).limit(10).toArray();
        res.json(books);
    } catch (error) {
        console.error("Ocorreu um erro ao buscar os dados dos livros:", error);
        res.status(500).json({ error: "Erro ao buscar livros" });
    }
});

app.get("/len", async (req, res) => {
    try {
        const collection = await connectToDatabase();
        const amount = await collection.countDocuments();
        res.json({ amount });
    } catch (error) {
        console.error("Ocorreu um erro ao contar os documentos:", error);
        res.status(500).json({
            error: "Ocorreu um erro ao contar os documentos",
        });
    }
});

app.listen(port, () => {
    console.log(`O servidor está atualmente rodando na porta ${port}`);
});
