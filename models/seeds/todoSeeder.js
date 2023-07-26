import Todo from "../todo.js";
import db from "../../config/mongoose.js";

db.once('open', () => {
    for (let i = 0; i < 10; i++) {
        Todo.create({ name: `name-${i}` })
    }
    console.log('Done.')
})

