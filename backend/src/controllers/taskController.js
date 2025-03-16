import User from '../models/User.js';
import Task from '../models/Task.js';

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
