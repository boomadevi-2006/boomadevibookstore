var express = require("express");
var bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function () {
    console.log("Connected to MongoDB");
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the parent "book store" folder
app.use(express.static(path.join(__dirname, "..")));

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

// Handle Signup
app.post("/sign_up", async function (req, res) {
    var { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.send(`<script>alert("Signup Failed! Email already exists."); window.location.href = '/signup.html';</script>`);
    }

    var newUser = new User({ username, email, password });
    await newUser.save();

    console.log("User signed up successfully");
    res.redirect("/login.html");  // Redirect to login page
});

// Handle Login
app.post("/login", async function (req, res) {
    var { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
        return res.send(`<script>alert("Invalid Email or Password! Please try again."); window.location.href = '/login.html';</script>`);
    }

    console.log("User logged in successfully");
    res.redirect("/index.html");  // Redirect to index page
});

// Serve Pages
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/signup.html", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "signup.html"));
});

app.get("/login.html", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "login.html"));
});

// Start Server
app.listen(3000, function () {
    console.log("Server listening at port 3000");
});
