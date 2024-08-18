const express=require("express")
const bodyParser=require("body-parser")
const app=express()
const port=3000
app.use(bodyParser.json())
let todos=[]
const cors=require("cors")
app.use(cors());
var id=0
function findIndex(arr,idx)
{
    for (let i=0;i<arr.length;i++)
    {
        if(arr[i].id==idx)
        {
            return i
        }
    }
    return -1
}
function removeAtindex(arr,idx)
{
    for (let i=0;i<arr.length;i++)
    {
        let newarray=[]
        if(arr[i].id!=idx)
        {
            newarray.push(arr[i])
        }
        return newarray
    }
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
    todos.push(newtodo)
   
})
app.get('/todoslist',(req,res)=>
{
    res.json(todos)
})
app.delete('/todo/:id',(req,res)=>
{
    const todoindex=findIndex(todos,parseInt(req.params.id))
    if(todoindex===-1)
    {
        res.status(404).send();
    }
    else{
        todos=removeAtindex(todos,todoindex);
        res.status(200).send("Deleted")
    }
});

app.get('/',(req,res)=>
{
    
    res.json({todos})
})
app.use((req,res,next)=>
{
    res.status(404).send();
})



app.listen(port,message)
function message()
{
    console.log(`Listing on port No ${port}`)
}