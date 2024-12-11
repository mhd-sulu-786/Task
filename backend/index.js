// // const express=require('express')
// // const cors=require('cors')
// // const port=7000
// // const mysql=require('mysql')
// // const app=express()
// // app.use(cors())
// // app.use(express.json())


// // // const db=mysql.createConnection({
// // //     host:'localhost',
// // //     user:'root',
// // //     password:'1234567',
// // //     database:'task'
// // // })
// // // db.connect((err)=>{
// // //     if(err){
// // //         console.log(err)
// // //     }
// // //     else{
// // //         console.log('database connected')
// // //     }
// // // })
// // const { PrismaClient } = require('@prisma/client');
// // const prisma = new PrismaClient();
// // const authenticateToken = (req, res, next) => {
// //     const token = req.headers['authorization'];
// //     if (!token) return res.status(401).json({ message: 'Access Denied' });

// //     try {
// //         const verified = jwt.verify(token, JWT_SECRET);
// //         req.user = verified;
// //         next();
// //     } catch (err) {
// //         res.status(400).json({ message: 'Invalid Token' });
// //     }
// // };


// // app.post('/auth/register', async (req, res) => {
// //     const { email, password } = req.body;
  
// //     try {
// //       const hashedPassword = await bcrypt.hash(password, 10);
// //       const user = await prisma.user.create({
// //         data: { email, password: hashedPassword },
// //       });
// //       res.status(201).json(user);
// //     } catch (err) {
// //       res.status(400).json({ error: err.message });
// //     }
// //   });
  
// //   app.post('/auth/login', async (req, res) => {
// //     const { email, password } = req.body;
  
// //     try {
// //       const user = await prisma.user.findUnique({ where: { email } });
// //       if (!user) return res.status(404).json({ message: 'User not found' });
  
// //       const validPassword = await bcrypt.compare(password, user.password);
// //       if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });
  
// //       const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
// //       res.json({ token });
// //     } catch (err) {
// //       res.status(500).json({ error: err.message });
// //     }
// //   });
  
// //   app.get('/tasks', authenticateToken, async (req, res) => {
// //     try {
// //       const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
// //       res.json(tasks);
// //     } catch (err) {
// //       res.status(500).json({ error: err.message });
// //     }
// //   });
  
// //   app.post('/tasks', authenticateToken, async (req, res) => {
// //     const { title, description } = req.body;
  
// //     try {
// //       const task = await prisma.task.create({
// //         data: { title, description, userId: req.user.id },
// //       });
// //       res.status(201).json(task);
// //     } catch (err) {
// //       res.status(400).json({ error: err.message });
// //     }
// //   });
  

// // app.listen(port,()=>{
// //     console.log('server is running on port 7000');
    
// // })




// const express = require('express');
// const cors = require('cors');
// const port = 7000;
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient({
//     log: ['query', 'info', 'warn', 'error'], // Enable Prisma Client logging
// });
// require('dotenv').config(); // At the top of your file to load .env variables

// const app = express();
// app.use(cors());
// app.use(express.json());
// const JWT_SECRET = 'free12'; 
// app.use((req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ message: 'Invalid Token' });
//     }
  
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = decoded; // Attach decoded token to the request
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Invalid Token' });
//     }
//   });


  
// const authenticateToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(401).json({ message: 'Access Denied' });

//     try {
//         const verified = jwt.verify(token, JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ message: 'Invalid Token' });
//         console.log(err)
//     }
// };

// // Test database connection route
// app.get('/test-db', async (req, res) => {
//     try {
//         // Attempt a simple query to check the connection
//         const users = await prisma.user.findMany();
//         res.status(200).json({ message: 'Database connected successfully', users });
//     } catch (err) {
//         res.status(500).json({ error: 'Database connection failed', details: err.message });
//     }
// });

// // User registration route
// app.post('/auth/register', async (req, res) => {
//     const { email, password, name } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await prisma.user.create({
//             data: { email, password: hashedPassword, name },
//         });
//         res.status(201).json(user);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//         console.log(err);
        
//     }

// });


// // User login route
// app.post('/auth/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await prisma.user.findUnique({ where: { email } });
//         if (!user) return res.status(404).json({ message: 'User not found' });

//         const validPassword = await bcrypt.compare(password, user.password);
//         if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

//         const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log(err);
//     }
// });

// // Get tasks route
// app.get('/api/tasks', authenticateToken, async (req, res) => {
//     try {
//         const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
//         res.json(tasks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//         console.log(err);
//     }
// });

// // Create task route
// app.post('/api/createtasks', authenticateToken, async (req, res) => {
//     const { title, description } = req.body;

//     try {
//         const task = await prisma.task.create({
//             data: { title, description, userId: req.user.id },
//         });
//         res.status(201).json(task);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//         console.log(err);
//     }
// });


// // Update Task
// app.put("/api/updatetasks/:id", authenticateToken, async (req, res) => {
//     const { id } = req.params;
//     const { title, description } = req.body;
//     try {
//         const task = await prisma.task.update({
//             where: { id: parseInt(id) },
//             data: { title, description },
//         });
//         res.json(task);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//         console.log(err);

//     }
// });

// // Delete Task
// app.delete("/api/deletetasks/:id", authenticateToken, async (req, res) => {
//     const { id } = req.params;
//     try {
//         await prisma.task.delete({
//             where: { id: parseInt(id) },
//         });
//         res.json({ message: "Task deleted" });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//         console.log(err);

//     }
// });

// // Get Unranked Tasks
// app.get("/tasks/unranked", authenticateToken, async (req, res) => {
//     try {
//         const tasks = await prisma.task.findMany({
//             where: { userId: req.user.id, rank: null },
//         });
//         res.json(tasks);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//         console.log(err);
//     }
// });

// // Rank Task
// app.post("/tasks/rank", authenticateToken, async (req, res) => {
//     const { id, rank } = req.body;
//     try {
//         const task = await prisma.task.update({
//             where: { id: parseInt(id) },
//             data: { rank },
//         });
//         res.json(task);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//         console.log(err);
//     }
// });


// // Start the server
// app.listen(port, () => {
//     console.log('Server is running on port 7000');
// });


const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config(); // Load environment variables

const app = express();
const port = 7000;
const prisma = new PrismaClient({
    log: process.env.NODE_ENV !== 'production' ? ['query', 'info', 'warn', 'error'] : [], // Enable Prisma Client logging only in development
});
const JWT_SECRET = process.env.JWT_SECRET || 'free12'; // Use env variable or default value

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',  // Set this in .env file for flexibility
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
}));

app.use(express.json());

// Middleware to log headers in development mode
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log('Incoming Headers:', req.headers);
        next();
    });
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Authorization header missing or invalid');
        return res.status(401).json({ message: 'Access Denied: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Test Database Connection
app.get('/test-db', async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Fetch all users for testing
        res.status(200).json({ message: 'Database connected successfully', users });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

// Initialize Prisma connection
(async () => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit the app if the DB connection fails
    }
})();

// User Registration
app.post('/auth/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Email, password, and name are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, name },
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

// User Login
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, email, name: user.name, id: user.id });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Get All Tasks
app.get('/api/tasks', authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    }
});

// Create Task
app.post('/api/createtasks', authenticateToken, async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const task = await prisma.task.create({
            data: { title, description, userId: req.user.id },
        });
        res.status(201).json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating task', error: err.message });
    }
});

// Get Task by ID
app.get('/api/tasksbyid/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;  // Get task ID from URL parameters

    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },  // Ensure id is an integer
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching task', error: err.message });
    }
});

// Update Task
app.put('/api/updatetasks/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    try {
        const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, description },
        });
        res.json(updatedTask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating task', error: err.message });
    }
});

// Delete Task
app.delete('/api/deletetasks/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await prisma.task.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting task', error: err.message });
    }
});

// Get Unranked Tasks
app.get('/tasks/unranked', authenticateToken, async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id, rank: null },
        });
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching unranked tasks', error: err.message });
    }
});

// Rank Task
app.post('/tasks/rank', authenticateToken, async (req, res) => {
    const { id, rank } = req.body;

    if (!id || !rank) {
        return res.status(400).json({ message: 'Task ID and rank are required' });
    }

    try {
        const task = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { rank },
        });
        res.json(task);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error ranking task', error: err.message });
    }
});



// Get All Users
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const users = await prisma.user.findMany(); // Retrieve all users
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

// Get Individual User by ID
app.get('/api/users/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;  // Get user ID from URL parameters

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },  // Ensure id is an integer
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
});


// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('Prisma disconnected. Server shutting down...');
    process.exit(0);
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
