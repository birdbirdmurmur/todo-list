import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import 'dotenv/config'
import Todo from "./models/todo.js";

if (process.env.NODE_ENV !== 'production') { }

const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    Todo.find()
        .lean()
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}.`)
})