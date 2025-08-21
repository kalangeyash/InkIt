import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./middleware";

const app = express();

app.get('/signup' ,(req,res)=>{
    const body = req.body;



    res.send(400)
})
app.get('/signin' ,(req,res)=>{
    const body = req.body;

    const userId = 1;
    const token = jwt.sign({userId},JWT_SECRET);

    res.send({
        token
    })
})
app.get('/room',authMiddleware ,(req,res)=>{
    const body = req.body;

    res.send(400)
})

app.listen(3001)