// const dotenv = require('dotenv');
// dotenv.config();

// const express = require('express');
// // const cors = require('cors');
// const app = express();
// // const cookieParser = require('cookie-parser');
// // const connectToDb = require('./db/db');
// // const userRoutes = require('./routes/user.routes');

// // connectToDb();

// // app.use(cors());
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // app.get('/', (req, res) => {
// //     res.send('Hello World');
// // });
// app.get('/',(req,res)=>{
//     for(let i=0;i<3000000;i++){

//     }
//     res.send('Hello World');
// })
// app.get('/stress-test',(req,res)=>{
//     for(let i=0;i<3000000;i++){

//     }
//     res.send('Hello World');
// })

// // app.use('/users', userRoutes);

// const PORT = 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app;


//use of OS and clustor module for multiple instances---> by doing this number of requests will be increased significantily
// const dotenv = require('dotenv');
// dotenv.config();

const cluster = require('cluster');
const os = require('os');
const express = require('express');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Forking a new one.`);
        cluster.fork();
    });
} else {
    const app = express();
    app.get('/', (req, res) => {
        for (let i = 0; i < 3000000; i++) {}
        res.send('Hello World');
    });

    app.get('/stress-test', (req, res) => {
        for (let i = 0; i < 3000000; i++) {}
        res.send('Stress Test Complete');
    });

    // app.use('/users', userRoutes);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    });
}

