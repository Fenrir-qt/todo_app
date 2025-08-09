require("dotenv").config();
require('./database/db');
const isAuthenticated = require("./middleware/auth")
const express = require("express");
const session = require("express-session")
const helmet = require("helmet")
const path = require("path")

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if using HTTPS
}));
app.use(express.json()); 


const basePath = path.resolve(__dirname, '../index.html');
const loginPath = path.resolve(__dirname, '../pages/login.html');
const regPath = path.resolve(__dirname, '../pages/register.html');
const dashboardPath = path.resolve(__dirname, '../pages/dashboard.html');

app.use('/styles', express.static(path.join(__dirname, '../styles')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));

app.get("/", (req, res) => {
  res.sendFile(basePath)
})

app.get("/login", (req,res) => {
  res.sendFile(loginPath)
})

app.get("/register", (req,res) => {
  res.sendFile(regPath)
})

app.get("/dashboard", isAuthenticated, (req,res) => {
  res.sendFile(dashboardPath)
})

app.get("/logout", (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error({ message: err.message });
                return res.status(500).json({ message: "Logout failed" });
            }
            res.clearCookie("connect.sid");
            res.status(200).json({ message: "Logged out successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


const authRouter = require('./routes/authRoute')
app.use('/', authRouter)

const taskRouter = require('./routes/taskRoute')
app.use('/', taskRouter)

app.listen(process.env.PORT, () => {
  console.log(`App listeng on Port ${process.env.PORT}`);
});
