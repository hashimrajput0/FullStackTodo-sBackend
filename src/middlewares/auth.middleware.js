import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";

export async function authMiddleware(req, res, next) {

    try {
        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({
                message : "Unauthorized Access"
            })
        }

        const decoded =  jwt.verify(token, process.env.JWT_SECRET)

        const user = await UserModel.findOne({
            _id : decoded.id
        })
        
        req.user = user
        next()
    } catch(err) {
        res.status(500).json({
            message : "Internal Server Error at Middleware"
        })

    }

}