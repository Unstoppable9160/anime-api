// Importing modules and initiallizing app
const express = require("express");
const Joi = require("joi");
const app = express();

// Variables
app.use(express.json());
const PORT = 8080;
const db = [
    { id: 1, name: "Jojo's Bizzare Adventure: Phantom Blood", img_src: "https://cdn-eu.anidb.net/images/65/226409.jpg-thumb.jpg" },
    { id: 2, name: "Jojo's Bizzare Adventure: Stardust Crusaders", img_src: "https://cdn-eu.anidb.net/images/65/226410.jpg-thumb.jpg" },
    { id: 3, name: "Jojo's Bizzare Adventure: Diamond Is Unbreakable", img_src: "https://cdn-eu.anidb.net/images/65/226412.jpg-thumb.jpg" },
    { id: 4, name: "Jojo's Bizzare Adventure: Stone Ocean", img_src: "https://cdn-eu.anidb.net/images/65/263801.jpg-thumb.jpg" },
    { id: 5, name: "Classroom Of The Elite", img_src: "https://cdn-eu.anidb.net/images/main/257735.jpg" }
]

// Routes - post
app.post("/anime/add", (req, res) => {
    const animeSchema = {
        name: Joi.string().min(4).required(),
        img_src: Joi.string().min(9).required()
    };
    const result = Joi.validate(req.body, animeSchema)
    if (result.error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    };
    const anime = {
        id: db.length + 1,
        name: req.body.name,
        img_src: req.body.img_src
    };
    db.push(anime);
    res.send(anime);
});


// Routes - get
app.get("/anime/", (req, res) => {
    res.send(db);
});
app.get("/anime/:id", (req, res) => {
    const anime = db.find(c => c.id === parseInt(req.params.id));
    if (!anime) res.status(404).send(`The anime with the id ${req.params.id} was not found1`);
    res.send(anime);
});
app.get("/anime/search/:name", (req, res) => {
    const anime = db.find(c => c.name.toLowerCase() == req.params.name);
    if (!anime) res.status(404).send(`The anime with the name ${req.params.name} was not found`);
    res.send(anime);
});

// Start listening
app.listen(PORT, () => console.log(`✅Server is listening on port ${PORT}`));
