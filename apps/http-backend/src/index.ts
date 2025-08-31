import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware";
import { CreateUserSchema , SignInSchema , CreateRoomSchema } from "@repo/common/types.ts";

const app = express();

app.get('/signup' ,(req,res)=>{
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success)
    { 
        res.json({
            message:"Incorreect Inputs"
        })
        return;
    }
    res.send(200).json({
        userId:1234
    })
})
app.get('/signin' ,(req,res)=>{
    const data = SignInSchema.safeParse(req.body);
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