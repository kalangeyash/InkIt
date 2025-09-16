import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware.js";
import { CreateUserSchema , SignInSchema , CreateRoomSchema } from "@repo/common/types.ts";
import { prismaClient } from "@repo/db-common/client"

const app = express();

app.get('/signup' ,async(req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success)
    { 
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }
    try{
        await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name : parsedData.data.name
            }
        })
        res.send(200).json({
            userId:1234
        })
    }catch(e)
    {
        res.status(411).json({message: "User already exists with this username"})
    }
}) 
app.get('/signin' ,(req,res)=>{
    const data =  xnSignInSchema.safeParse(req.body);
    if(!data.success)
    { 
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }
    const userId = 1;
    const token = jwt.sign({userId},JWT_SECRET);

    res.send({
        token
    })
})
app.get('/room',authMiddleware ,(req,res)=>{
    const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success)
    { 
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }

    res.send(200).json({
        roomId:123
    })
}) 

app.listen(3001);