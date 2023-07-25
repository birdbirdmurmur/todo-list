import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'

if (process.env.NODE_ENV !== 'production') { }

const app = express()
const port = 3000

const Schema = mongoose.Schema
const todoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    done: {
        type: Boolean
    }
})
const Todo = mongoose.model('Todo', todoSchema)
export default Todo

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')
})


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}.`)
})