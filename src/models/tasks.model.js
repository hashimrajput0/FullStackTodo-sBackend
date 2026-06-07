import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        required : true,
        default: false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

}, { timestamps : true })

export const TasksModel = mongoose.model("Task", taskSchema)