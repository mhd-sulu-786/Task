// const express=require('express')
// const cors=require('cors')
// const port=7000
// const mysql=require('mysql')
// const app=express()
// app.use(cors())
// app.use(express.json())


// // const db=mysql.createConnection({
// //     host:'localhost',
// //     user:'root',
// //     password:'1234567',
// //     database:'task'
// // })
// // db.connect((err)=>{
// //     if(err){
// //         console.log(err)
// //     }
// //     else{
// //         console.log('database connected')
// //     }
// // })
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ message: 'Access Denied' });

//     try {
//         const verified = jwt.verify(token, JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid Token' });
//     }
// };


// app.post('/auth/register', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = await prisma.user.create({
//         data: { email, password: hashedPassword },
//       });
//       res.status(201).json(user);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });
  
//   app.post('/auth/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await prisma.user.findUnique({ where: { email } });
//       if (!user) return res.status(404).json({ message: 'User not found' });
  
//       const validPassword = await bcrypt.compare(password, user.password);
//       if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
//       const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   app.get('/tasks', authenticateToken, async (req, res) => {
//     try {
//       const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
//       res.json(tasks);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   app.post('/tasks', authenticateToken, async (req, res) => {
//     const { title, description } = req.body;
  
//     try {
//       const task = await prisma.task.create({
//         data: { title, description, userId: req.user.id },
//       });
//       res.status(201).json(task);
//     } catch (err) {
//       res.status(400).json({ error: err.message });
//     }
//   });
  

// app.listen(port,()=>{
//     console.log('server is running on port 7000');
    
// })




const express = require('express');
const cors = require('cors');
const port = 7000;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Enable Prisma Client logging
});
require('dotenv').config(); // At the top of your file to load .env variables

const app = express();
app.use(cors());
app.use(express.json());
const JWT_SECRET = 'free12'; 
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded token to the request
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }
  });


  
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// Test database connection route
app.get('/test-db', async (req, res) => {
    try {
        // Attempt a simple query to check the connection
        const users = await prisma.user.findMany();
        res.status(200).json({ message: 'Database connected successfully', users });
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

// User registration route
app.post('/auth/register', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// User login route
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get tasks route
app.get('/api/tasks', authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create task route
app.post('/api/createtasks', authenticateToken, async (req, res) => {
    const { title, description } = req.body;

    try {
        const task = await prisma.task.create({
            data: { title, description, userId: req.user.id },
        });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Update Task
app.put("/api/updatetasks/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, description },
        });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Task
app.delete("/api/deletetasks/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Unranked Tasks
app.get("/tasks/unranked", authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id, rank: null },
        });
        res.json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rank Task
app.post("/tasks/rank", authenticateToken, async (req, res) => {
    const { id, rank } = req.body;
    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { rank },
        });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Start the server
app.listen(port, () => {
    console.log('Server is running on port 7000');
});
