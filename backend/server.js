const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const todoRoutes = express.Router();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());
let Todo = require('./db/model');

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.use('/todos', todoRoutes);

todoRoutes.route('/').get(function(req,res){
    Todo.find(function(err, todos){
        if(err){
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Todo.findById(id, function(err, todo){
        res.json(todo);
    });
})

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    console.log(todo);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.todo_responsible = req.body.todo_responsible;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});