const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://happydays111:dummy123@cluster0.2as0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
, {useNewUrlParser: true}) // connect to the database

mongoose.connection.once('open', function() {
    console.log("CONNECTED TO DB");
})

const PersonSchema = new Schema({
    Name: String,
    ID: Number
})

const PersonModel = mongoose.model("Person", PersonSchema);

app.get('/', async function(req, res) {
    const person = await PersonModel.find();
    console.log("Person: ", person)
    res.json(person);  
})

app.post('/post', function(req, res) {
    console.log("Req: ", req.body);

    let personObj = {
        name: req.body.name,
        ID: req.body.ID
    }
    
    const person = PersonModel.create(personObj);
    console.log("PERSON OBJ: ", person)
    res.send({post: "Info posted"});
    res.send("REQ :", req.body);
})

app.listen("3402", () => {
    console.log("App listening on port 3402");
})


