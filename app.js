import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Todo from "./models/todo.js"; // Todo model
import 'dotenv/config'

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
app.use(bodyParser.urlencoded({ extended: true }))

// Controller
app.get('/', (req, res) => {
    Todo.find()
        .lean()
        .then(todos => res.render('index', { todos }))
        .catch(error => console.error(error))
})

app.post('/todos', (req, res) => {
    const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
    return Todo.create({ name })     // 存入資料庫
        .then(() => res.redirect('/')) // 新增完成後導回首頁
        .catch(error => console.log(error))
})

app.get('/todos/new', (req, res) => {
    return res.render('new')
})

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}.`)
})