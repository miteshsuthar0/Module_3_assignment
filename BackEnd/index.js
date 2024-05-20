var express = require('express');
var app = express();
const mysql = require("mysql");
var bodyParser = require("body-parser");
var cors = require('cors');

app.use(express.json());

app.use(cors());

const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"todo"
})

conn.connect((err)=>{
    if (err) {
        console.log("Error Occured:",err);
    } else {
        console.log("DB Connected!");
    }
})



app.get('/todo', async(req,res)=>{
    conn.query("SELECT * from data",(err,data)=>{
        if(err){
            console.log("Error Occured:",err);
        }
        res.send(data);
    });
});

app.post("/todo",async(req,res)=>{
    const {task} = req.body;
    conn.query("INSERT INTO data(Tasks) VALUES(?)",[task],(err,data)=>{
        if(err){
            console.log("error occured:",err);
        }
        res.status(201).send("Task Added Successfully!");
    })
});

app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params;
    conn.query("DELETE FROM data WHERE id = ?", [id], (err, data) => {
        if (err) {
            console.log("Error Occured:", err);
            res.status(500).send("Error deleting task");
        } else {
            res.status(200).send("Task Deleted Successfully!");
        }
    });
});


app.listen(5000,()=>{
    console.log("Server Has Started!");
})

