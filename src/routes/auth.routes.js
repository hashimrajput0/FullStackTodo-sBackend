import express from "express"
import authController from "../controllers/auth.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"


const router = express.Router()

router.post("/register", authController.RegisterUser )

router.post("/login", authController.LoginUser )

router.get("/isloggedin",authMiddleware, authController.isLoggedIn )


export default router