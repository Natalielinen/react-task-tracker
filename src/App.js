import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState, useEffect} from 'react'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
    const [showAddTaskForm, setShowAddTaskForm] = useState(false)
    const [tasks, setTasks] = useState([])

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()

        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()

        return data
    }

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    // Add Task

    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    //delete task

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //toggle reminder
    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        const data = await res.json()

        setTasks(tasks
            .map(task => task.id === id
                ? {...task, reminder: data.reminder}
                : task))
    }
    return (
        <Router>
            <div className='container'>
                <Header
                    onShowForm={() => setShowAddTaskForm(!showAddTaskForm)}
                    isFormShowed={showAddTaskForm}
                />

                <Routes>
                    <Route path='/' exact element={
                       ( <>
                           {showAddTaskForm && <AddTask onAddTask={addTask}/>}
                           {tasks.length > 0
                               ? <Tasks
                                   tasks={tasks}
                                   onDelete={deleteTask}
                                   onToggle={toggleReminder}
                               />
                               : 'No tasks to show'}
                       </>)
                    } />
                    <Route path='/about' element={<About />}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
