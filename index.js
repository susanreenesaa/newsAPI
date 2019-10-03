const  Joi = require('joi');
const express = require('express');
const app =express();{id:1, name="Natasha"}

app.use(express.json());
const users =[
  {id:1, name : 'Natasha'},
  {id:2, name : 'Ritah'},
  {id:3, name : 'James'},
  {id:4, name : 'Glosh'},
  {id:5, name : 'Peter'},
]

app.get('/api/v1/users', (req,res) =>{
  res.send(users);
})

app.get('/api/v1/users/:id', (req,res) =>{
const user = users.find( c => c.id === parseInt(req.params.id));
if(!user)res.status(404).send('user with that ID not found')
res.send(user);
})

app.post('/api/v1/users', (req, res) =>{
  const userSchema={
    name: Joi.string().min(3).required()
  }
  const userResult= Joi.validate(req.body, userSchema)
  if(userResult.error){
   return res.status(400).send(userResult.error.details[0].message)
    // return;
  }
  const user ={
    id: users.length + 1,
    name: req.body.name
  }
  users.push(user);
  res.send(user);
  })

  const records = [
    { id: 1 ,
    area:'seeta',
     organisatio:'UMEME',
     personInvolved: "MD",
    text:"the MD requested for a bribe from my cousin Colins"},
    ]
    
    app.post('/api/v1/records', (req, res) =>{
      const recordSchema ={
        area:Joi.string(). min(3).required(),
        orgainsation :Joi.string(). min(2).required(),
        personInvolved: Joi.string(). min(3).required(),
        text: Joi.string(). min(10).required()
     
    }
  
    const recordResult =Joi.validate(req.body, recordSchema)
    if(recordResult.error){
      res.status(400).send(recordResult.error.details[0].message)
    }
        const record ={
            id: records.length + 1,
            area: req.body.area,
            orgainsation : req.body.orgainsation,
            personInvolved: req.body.personInvolved,
            text:req.body.text
  
        }
        records.push(record)
        res.send(record)
    })
    // app.put('/api/v1/editRecord', (req,res) => {
    
    // })  
//  function getUser(id) {
//   const user = users.find( c => c.id === parseInt(req.params.id));
//   if(!user)res.status(404).send('user with that ID not found')
//   res.send(user);
   
//  }
const port =process.env.PORT || 3000
app.listen(port, ()=> console.log(`listenint to port ${port}.....`))
