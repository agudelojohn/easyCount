const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')


app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

const db = mysql.createPool({
    host:"easycount-db.ceqxmk2necme.us-east-1.rds.amazonaws.com",
    user:"admin",
    password:"Warcraft4116.14",
    database:"dataSource"
})

app.post("/api/insert",(req,res)=>{

    const steps = req.body.steps;
    const link = req.body.link;

    const sql = "INSERT INTO recipe(Steps, Link) VALUES (?,?)";
    db.query(sql, [steps, link], (error, result)=>{
        console.log(error)
    });
})

app.get('/', (req, res)=>{
    db.query("SELECT*FROM recipe", (err,result)=>{
        console.log(result)
        res.send("Hello John!! Steps:"+ result[0].steps+" Link:"+result[0].link)
    });
});


app.listen(3001, ()=>{
    console.log("Runnning on port 3001")
})