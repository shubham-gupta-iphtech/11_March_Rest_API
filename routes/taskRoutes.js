import Task from "../models/tasks.js";
import express from "express"
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();


//create task 

router.post("/create", authMiddleware, async (req, res) => {
    
    const {title, completed, description , dueDate, attachment} = req.body;
    if(!title) return res.json({message: "title is required"});
 


    const formattedDueDate = dueDate ? new Date(`${dueDate}T00:00:00.000Z`) : null;

    const newTask = new Task({
        title, 
        completed,
        description,
        dueDate,
        attachment,
        createdBy: req.user.id,
    });
    await newTask.save();
    res.status(201).json(newTask);
 })
 
 // get all tasks
 
 router.get("/v1/tasks",authMiddleware, async (req, res) => {
    const tasks = await Task.find({},'-attachment');
    res.json(tasks);
 })

 router.get("/v2/tasks",authMiddleware, async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
 })
 
 //get single task
    router.get("/tasks/:id",authMiddleware, async (req, res) => {
    const particularTask = await Task.findById(req.params.id);
    particularTask ? res.json(particularTask) : res.status(404).json({ message: "task not found" });
 })
 
 
 //update task
 router.put("/tasks/:id",authMiddleware, async (req, res) => {
    const { _id } = req.params.id;
    const value = req.body;

    if(!value.title) return res.json({message: "title is required"});
    value.createdBy = req.user.id;
    const task = await Task.findOneAndUpdate(_id,value, { new: true });
    console.log(task);
    res.json(task);
 
 })
 
 //delete a task 
 router.delete("/tasks/:id",authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
 })
 
 export default router;