const express = require('express');

const app = express();
//express.json() middleware called body-parser (included in express)-- converting body part in json into javascript 
app.use(express.json());

//New array to store data
const people = [];

//create middleware to include a custom header in the response header
app.use((req,res,next) =>{
  res.setHeader('X-time', new Date());
  //custom header
  res.setHeader('Allow-Access-From-Origin', '*');
  next();
})

//get all people, route handler -- special middleware
app.get('/people', (req, res) => {
  //destructing to get name in query param
  const {name} = req.query;
  //check if name exist, do below when name exist
  if (name){
    //function for array -- filter --> if name of item from people includes name from query parm
    const filtered = people.filter(i => i.name.includes(name));
    return res.json(filtered);
  }
  return res.json(people);
});

//post new person
app.post('/people', (req, res) => {
  //destructing
  const {name, age} = req.body;
  //define person
  const person = { name, age};
  people.push(person);
  //return status code to show creat successful and person
  return res.status(201).json(person)
});

app.listen(3000,()=>{
  console.log('listening on port 3000');
});