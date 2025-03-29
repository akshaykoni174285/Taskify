"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch("http://localhost:5000/tasks", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();
            setTasks(data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    // Add Task
    const handleAddTask = async () => {
        const token = localStorage.getItem("token");
        if (!token) return console.error("No token found!");

        const title = prompt("Enter task title:");
        const description = prompt("Enter task description:");
        if (!title || !description) return alert("Title and description cannot be empty!");

        try {
            const res = await fetch("http://localhost:5000/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, description }),
            });
            if (!res.ok) throw new Error("Failed to add task");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // Delete Task
    const handleDelete = async (taskId) => {
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Failed to delete task");
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Open Edit Modal
    const openEditModal = (task) => {
        setEditTask(task);
        setNewTitle(task.title);
        setNewDescription(task.description);
    };

    // Edit Task
    const handleEditTask = async () => {
        if (!editTask) return;
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:5000/tasks/${editTask._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title: newTitle, description: newDescription })
            });
            if (!res.ok) throw new Error("Failed to update task");
            fetchTasks();
            setEditTask(null);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
            <button 
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddTask}
            >
                Add Task
            </button>
            <ul className="space-y-4">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li key={task._id} className="p-4 bg-white shadow rounded flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                            </div>
                            <div className="space-x-2">
                                <button 
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    onClick={() => openEditModal(task)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(task._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600">No tasks found</p>
                )}
            </ul>

            {/* Edit Task Modal */}
            {editTask && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <input 
                            type="text" 
                            className="w-full p-2 border rounded mb-2" 
                            value={newTitle} 
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <textarea 
                            className="w-full p-2 border rounded mb-2" 
                            value={newDescription} 
                            onChange={(e) => setNewDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setEditTask(null)}>Cancel</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleEditTask}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
