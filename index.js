import express from "express"
import bodyParser from "body-parser"
import axios from "axios"

const app = express()
const port = 3000
const everyURL = "https://newsapi.org/v2/everything"
const headlineURL = "https://newsapi.org/v2/top-headlines"
const api_key = "77a8aaa1a7054e31b58b28f3de7ddef6"

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    try {
        res.render("index.ejs")
    } catch (error) {
        console.error("Failed to Load:", error.message);
        res.render("index.ejs", { error: error.message });
    }
})
app.get("/random", async (req, res) => {
    try {
        let response = await axios(`${everyURL}?q=random&apiKey=${api_key}`)
        const result = response.data;
        let value = JSON.stringify(result.articles[Math.floor(Math.random() * result.articles.length)])
        res.render("article.ejs", { data: JSON.parse(value) })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("article.ejs", { error: error.message });
    }
})

app.post("/keyword", async (req, res) => {
    let word = req.body["keyword"]
    try {
        let response = await axios(`${everyURL}?q=${word}&apiKey=${api_key}`)
        const result = response.data;
        let value = JSON.stringify(result.articles[Math.floor(Math.random() * result.articles.length)])
        res.render("article.ejs", { data: JSON.parse(value) })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("article.ejs", { error: error.message });
    }
})

app.post("/country", async (req, res) => {
    let word = req.body["country"]
    try {
        let response = await axios(`${headlineURL}?country=${word}&apiKey=${api_key}`)
        const result = response.data;
        let value = JSON.stringify(result.articles[Math.floor(Math.random() * result.articles.length)])
        res.render("headline.ejs", { data: JSON.parse(value) })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("headline.ejs", { error: error.message });
    }
})

app.get("/source", async (req, res) => {
    try {
        let response = await axios(`${headlineURL}/sources?apiKey=${api_key}`)
        const result = response.data;
        res.render("source.ejs", { data: JSON.parse(JSON.stringify(result.sources)) })
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("source.ejs", { error: error.message });
    }
})


app.listen(port, () => {
    console.log(`Server Running on Port: ${port}`)
})
