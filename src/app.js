import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.route.js"

const app = express() 
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)


export default app