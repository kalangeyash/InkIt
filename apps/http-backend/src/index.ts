import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware.js";
import { CreateUserSchema , SignInSchema , CreateRoomSchema } from "@repo/common/types.ts";
import { prismaClient } from "@repo/db-common/client"

const app = express();

app.use(express.json());

app.post('/signup' ,async(req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success)
    { 
        console.log(parsedData.error)
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }
    try{
        const user = await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name : parsedData.data.name
            }
        })
        res.send(200).json({
            userId:user.id
        })
    }catch(e)
    {
        res.status(411).json({message: "User already exists with this username"})
    }
}) 
app.post('/signin' ,async(req,res)=>{
    const parsedData =  SignInSchema.safeParse(req.body);
    if(!parsedData.success)
    { 
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }
    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })

    if(!user)
    {
        res.status(403).json({
            "message": "Not Autheticated"
        })
        return;
    }

    const token = jwt.sign({
        userId:user?.id
    },JWT_SECRET);

    res.send({
        token
    })
})
app.post('/room',authMiddleware , async(req,res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success)
    { 
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }
    const userId = req.userId

    await prismaClient.room.create({
        data:{
            slug:parsedData.data.name,
            adminId : userId
        }
    })

    res.send(200).json({
        roomId:123
    })
}) 

app.listen(3001);