const express = require("express")
const connectDB = require("./config/connectDB")
require("dotenv").config({path: "./config/.env"})

const Users = require("./models/User")
const router = express.Router()

const app = express()

app.use("/api", router)
router.use(express.json())

//GET all users
// http://localhost:5001/api/user
router.get("/user", async (req, res) => {
    try {
        const users = await Users.find()
        res.status(200).json({message: "Users found", data: users})
    } catch (error) {
       res.status(404).json({Error: error})
    }
})

//POST users
// http://localhost:5001/api/user/new
router.post("/user/new", async (req, res) => {
    try {
        const {email, password} = req.body
        const newUser = new Users({email, password})
        const user = await newUser.save()
        res.status(201).json({message: "User created", data: user})
    } catch (error) {
       res.status(404).json({Error: error})
    }
})

//Update users
// http://localhost:5001/api/user/update/:id
router.put("/user/update/:id", async (req, res) => {
    const {id} = req.params
    const {email, password} = req.body
    try {
        await Users.findByIdAndUpdate({_id: id}, {$set:{email: email, password: password}})
        res.status(200).send({message: "User updated"})
    } catch (error) {
        res.status(500).send({message: "Server error"})
        console.log(error)
    }
})

//Delete users
// http://localhost:5001/api/user/delete/:id
router.delete("/user/update/:id", async (req, res) => {
    const {id} = req.params
    try {
        await Users.findByIdAndDelete(id)
        res.status(200).send({message: "User deleted"})
    } catch (error) {
        res.status(500).send({message: "Server error"})
        console.log(error)
    }
})

connectDB()

const PORT = process.env.PORT

app.listen(PORT, (err) => {
    err ? console.log(err)
        : console.log(`Server is running on port ${PORT}`)        
})