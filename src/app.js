import express from "express";
import bodyParser from "body-parser";
import  router  from "./routes/cat.routes.js";

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/",router)

app.listen(3000,()=>{
    console.log("app is running on 3000...")
})