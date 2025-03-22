import User from '../models/User.js';
import Task from '../models/Task.js';
import mongoose from 'mongoose';

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        // Create and save new task
        const newTask = new Task({
            userId: req.user.id, 
            title,
            description
        });

        await newTask.save();
        res.status(201).json(newTask);

    } catch (err) {
        console.error("Error adding task:", err);
        res.status(500).json({ error: err.message });
    }
};

export const getTasks = async (req, res) => {

    try {
        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: No user ID found" });
        }

        // Fetch tasks for the logged-in user
        const tasks = await Task.find({ userId: req.user.id });

        res.status(200).json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: err.message });
    }
}

export const deleteTask = async(req,res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Task ID format' });
        }
        console.log(`Attempting to delete task with ID: ${id}`);

        const result = await Task.findByIdAndDelete(req.params.id);

        console.log('MongoDB Delete Result:', result.userId);

        if(!result){
            return res.status(404).json({message: 'Task not found'});

        }
        res.json({ message:"Task deleted successfully"})
    } catch (err) {
        res.status(500).json({error: err.message});

    }
}


export const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const {title,description,status} = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "invalid task id format"});

        }

        if(!description && !status && !title){
            return res.status(400).json({message: "please provide description or status or title"});

        }
        const allowedStatuses = ["pending", "in-progress", "completed"];
        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value. Allowed values: 'pending', 'in-progress', 'completed'" });
        }
    
        let updatefield = {}
        if(title) updatefield.title = title;
        if(description) updatefield.description = description;
        if(status) updatefield.status = status;
        

        const updatedTask = await Task.findByIdAndUpdate(id, updatefield,{new : true})

        if(!updatedTask){
            return res.status(404).json({message:"Task not found"})
        }
        return res.status(200).json({message:"Task updated sucessfully"})
    } catch (error) {
        console.log("Error updating the task", error);
        res.status(500).json({error: error.message})
    }
}

