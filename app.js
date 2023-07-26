import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import methodOverride from "method-override"

import routes from "./routes/index.js"
import "./config/mongoose.js"

const app = express()
const port = 3000

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}.`)
})