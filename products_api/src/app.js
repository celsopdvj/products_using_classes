import express from "express";
import cors from "cors";
import ProductsDb from "./Services/firebase.js"
import dotenv from "dotenv"

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dotenv.config()


app.get("/v1/products", async (req, res) => {
    let productsDb = new ProductsDb();

    return res.json(await productsDb.getProducts())
})

app.post("/v1/products", async (req, res) => {
    let productsDb = new ProductsDb();

    let id = await productsDb.createProduct(req.body);

    return res.json({ ok: true, id: id })
})

app.patch("/v1/products/:id", async (req, res) => {
    let productsDb = new ProductsDb();
    let id = req.params.id;

    let returnId = await productsDb.updateProduct(req.body, id);

    return res.json({ ok: true, id: returnId })
})

app.delete("/v1/products/:id", async (req, res) => {
    let productsDb = new ProductsDb();
    let id = req.params.id;

    let returnId = await productsDb.deleteProduct(id);

    return res.json({ ok: true, id: returnId })
})

app.listen(8080, () => console.log("api running"))