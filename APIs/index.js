import { bootstrap } from "./src/bootstrap.js"

import express from "express"

const app = express()

bootstrap(app ,express )


app.listen( process.env.PORT , ()=>{

    console.log("Hello World!");

})