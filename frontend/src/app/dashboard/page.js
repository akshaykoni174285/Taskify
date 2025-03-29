"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch("http://localhost:5000/tasks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks(); // Fetch tasks when the component mounts
    }, []);

    // Function to handle task deletion
    const handleDelete = async (taskId) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) {
                throw new Error("Failed to delete task");
            }

            fetchTasks(); // Fetch updated tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h1>Task Dashboard</h1>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id}>
                            <span>{task.title}</span>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(task._id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No tasks found</p> // Show message if there are no tasks
                )}
            </ul>
        </div>
    );
}
