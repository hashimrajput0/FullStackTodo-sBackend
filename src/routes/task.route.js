import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import taskController from "../controllers/task.controller.js"


const router = express.Router()

router.post("/create", authMiddleware, taskController.CreateTask)
router.get("/all", authMiddleware, taskController.GetTasks)
router.patch("/update/:id", authMiddleware, taskController.UpdateTask)
router.delete("/delete/:id", authMiddleware, taskController.DeleteTask)


export default router