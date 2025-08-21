import express from "express"

const app = express();

app.get('/signup' ,(req,res)=>{
    const body = req.body;

    

    res.send(400)
})
app.get('/signin' ,(req,res)=>{
    const body = req.body;

    res.send(400)
})
app.get('/create-room' ,(req,res)=>{
    const body = req.body;

    res.send(400)
})

app.listen(3001)