import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import taskRoutes from "./routes/task.route.js"
import cors from "cors"

const app = express() 

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)


export default app