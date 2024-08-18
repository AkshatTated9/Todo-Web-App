const express=require("express")
const bodyParser=require("body-parser")
const fs=require("fs")
const path = require("path")
const app=express()
const port=3000

app.use(bodyParser.json())


var id=0
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtindex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}
app.post('/todo',(req,res)=>
{   
    const newtodo={
        id:id,
        name:req.body.name,
        desc:req.body.desc
        
    }
    res.send("Todo Added id="+id)
    id=id+1
    fs.readFile("todolist.json","utf8",(err,data)=>
    {
        if (err) throw err;
        const todos=JSON.parse(data);
        todos.push(newtodo);
        fs.writeFile("todolist.json",JSON.stringify(todos),(err)=>
        {
            if(err) throw err
           
        });
    });
    
   
});
app.get('/todoslist',(req,res)=>
{
    fs.readFile("todolist.json","utf8",(err,data)=>
    {
        if(err) throw err;
        res.json(JSON.parse(data));
    });
});
app.delete('/todo/:id', (req, res) => {

    fs.readFile("todolist.json", "utf8", (err, data) => {
      if (err) throw err;
      var todos = JSON.parse(data);
      const todoIndex = findIndex(todos, parseInt(req.params.id));
      if (todoIndex === -1) {
        res.status(404).send();
      } else {
        todos = removeAtindex(todos, todoIndex);
        fs.writeFile("todolist.json", JSON.stringify(todos), (err) => {
          if (err) throw err;
          res.status(200).send("Deleted");
        });
      }
    });
  });

// app.get('/',(req,res)=>
// {
//     res.sendFile(__dirname+"/index.html")
// })

app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,"index.html"));
})

app.listen(port,message)
function message()
{
    console.log(`Listing on port No ${port}`)
}










//////////////////////////////////////Method 2///////////////////////////////////////////////////////

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require("fs");
// const port=3000
// const app = express();

// app.use(bodyParser.json());

// function findIndex(arr, id) {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].id === id) return i;
//   }
//   return -1;
// }

// function removeAtIndex(arr, index) {
//   let newArray = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (i !== index) newArray.push(arr[i]);
//   }
//   return newArray;
// }

// app.get('/todoslist', (req, res) => {
//   fs.readFile("todos.json", "utf8", (err, data) => {
//     if (err) throw err;
//     res.json(JSON.parse(data));
//   });
// });

// app.get('/todos/:id', (req, res) => {
//   fs.readFile("todos.json", "utf8", (err, data) => {
//     if (err) throw err;
//     const todos = JSON.parse(data);
//     const todoIndex = findIndex(todos, parseInt(req.params.id));
//     if (todoIndex === -1) {
//       res.status(404).send();
//     } else {
//       res.json(todos[todoIndex]);
//     }
//   });
// });

// app.post('/todo', (req, res) => {
//   const newTodo = {
//     id: Math.floor(Math.random() * 1000000), // unique random id
//     title: req.body.title,
//     description: req.body.description
//   };
//   fs.readFile("todos.json", "utf8", (err, data) => {
//     if (err) throw err;
//     const todos = JSON.parse(data);
//     todos.push(newTodo);
//     fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
//       if (err) throw err;
//       res.status(201).json(newTodo);
//     });
//   });
// });

// app.put('/todos/:id', (req, res) => {
//   fs.readFile("todos.json", "utf8", (err, data) => {
//     if (err) throw err;
//     const todos = JSON.parse(data);
//     const todoIndex = findIndex(todos, parseInt(req.params.id));
//     if (todoIndex === -1) {
//       res.status(404).send();
//     } else {
//       const updatedTodo = {
//         id: todos[todoIndex].id,
//         title: req.body.title,
//         description: req.body.description
//       };
//       todos[todoIndex] = updatedTodo;
//       fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
//         if (err) throw err;
//         res.status(200).json(updatedTodo);
//       });
//     }
//   });
// });

// app.delete('/todo/:id', (req, res) => {

//   fs.readFile("todos.json", "utf8", (err, data) => {
//     if (err) throw err;
//     var todos = JSON.parse(data);
//     const todoIndex = findIndex(todos, parseInt(req.params.id));
//     if (todoIndex === -1) {
//       res.status(404).send();
//     } else {
//       todos = removeAtIndex(todos, todoIndex);
//       fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
//         if (err) throw err;
//         res.status(200).send();
//       });
//     }
//   });
// });

// // for all other routes, return 404
// app.use((req, res, next) => {
//   res.status(404).send();
// });

// app.listen(port,message)
// function message()
// {
//     console.log(`Listing on port No ${port}`)
// }