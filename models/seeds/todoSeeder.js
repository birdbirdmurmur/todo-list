import mongoose from "mongoose";
import Todo from "../todo.js";
import 'dotenv/config'

if (process.env.NODE_ENV !== 'production') { }

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
    console.log('mongodb connected!')

    for (let i = 0; i < 10; i++) {
        Todo.create({ name: `name-${i}` })
    }
    console.log('Done.')
})

