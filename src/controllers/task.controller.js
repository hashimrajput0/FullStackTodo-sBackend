import { TasksModel } from "../models/tasks.model.js";

async function CreateTask(req, res) {

try {

    const title = req.body.title

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

    const completed = req.body.completed

    const userID = req.user._id

  if (!userID) {
    return res.status(401).json({ message: "Unauthorized" });
}    

    const todo = await TasksModel.create({
        title : title,
        completed : completed,
        user : userID
    })
    
     res.status(201).json({
            message: "Todo created successfully",
            Todos : todo
    });

        } catch(err) {
            res.status(500).json({
                message : "Internal Server Error! At TasksController"
            })

        }


}




async function GetTasks(req, res) {


try {



    const userID = req.user._id

  if (!userID) {
    return res.status(401).json({ message: "Unauthorized" });
}    

const Tasks = await TasksModel.find({
   user : userID
})

        return res.status(200).json({
            message: "Todos fetched successfully",
            Tasks
        });

} catch(err){
    res.status(500).json({
        message : `Internal Server Error!! At Tasks Controller : ${err}`
    })
}

}


async function UpdateTask(req, res) {

try {



    const { id } = req.params
    const completed = req.body.completed
    if (!req.user) {
        return res.status(401).json({
                message: "Unauthorized"
            });
        }

const task = await TasksModel.findById(id)

      if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

         if(task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message : "Unauthorized Access, Not your task"
            })
         }

        if (completed !== undefined) task.completed = completed;
        const updatedTask = await task.save();


        return res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });

    } catch(err) {
        return res.status(500).json({
            message: "Internal Server Error"
        });

    }


}

async function DeleteTask(req, res) {
    try {
            const { id } = req.params
            if (!req.user) {
                 return res.status(401).json({
                message: "Unauthorized"
            });
        }

const task = await TasksModel.findById(id)

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

        if(task.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message : "Unauthorized Access, Not your task"
            })
         }

    await TasksModel.findByIdAndDelete(id)

        res.status(201).json({
            message : "Successfully Deleted"
        })


    }catch(err){
res.status(500).json({
    message : "Internal Server Error at TaskController"
})
    }
}




export default { CreateTask, GetTasks, UpdateTask, DeleteTask }