import { MongoServerClosedError } from "mongodb";
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
   
    title: {
        type:String,
        required: true
    },
    completed: {
        type:String,
        default: false
    },
    description: 
    {
        type: String,
        required: true
    },
    dueDate: 
    {
        type: Date,
    },
    createdBy: 
    {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: "true",
    }

}, {
    timestamps: true
})

const Task = mongoose.model("Task",TaskSchema);

export default Task;
