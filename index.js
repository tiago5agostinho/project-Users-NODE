
const express = require("express")
const uuid = require('uuid')
const cors = require('cors')


const port = 3001
const app= express()
app.use(express.json())
app.use(cors())

/*
     -query params => meusite.com/users?nome=rodolfo&age=28  //FILTROS
     -Route params => /users/2          //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO
     - request body => { "name":"Rodolfo", "age":}
     
     - GET       => buscar informações no back-end
     - POST      => Criar informações no back-end
     - PUT/PATCH => alterar/atualizar informações no back-end
     - DELETE    => delte informações no back-end 

     - middleware => intercepitador => tem o poder de para ou alterar dados da requisição
*/ 





/*  //-query params => meusite.com/users?nome=rodolfo&age=28  //FILTROS

app.get('/users',(request, response) =>{

    const {name,age} = request.query  //destructuring assignment
    
    return response.json({name, age})
})*/

/* //-Route params => /users/2          //BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO

app.get('/users/:id',(request, response) =>{

    const {id} = request.params 
   
    console.log(id)
    return response.json( {id})
})*/

/* //   - request body => { "name":"Rodolfo", "age":}

app.get('/users',(request, response) =>{

    const { name, age } = request.body

    console.log(request.body)
   
    return response.json( {name, age })
})*/

const users = []

const checkUserId = (request, response, next) =>{

    const { id } = request.params

    const index = users.findIndex(user => user.id ===id)

    if(index < 0){
        return response.status(404).json({error: "user not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

 


// GET
app.get('/users',(request, response) =>{

   
    return response.json(users)
})

// POST
app.post('/users',(request, response) =>{
const {name, age } = request.body

const user = { id: uuid.v4(), name, age }

users.push(user)
   
    return response.status(201).json(user)
})

// PUT
app.put('/users/:id', checkUserId, (request, response) =>{ 
      
      const{  name, age } = request.body

      const index = request.userIndex

      const id = request.userId

      const updateUser = { id, name, age }
  
      

     users[index] = updateUser


    return response.json(updateUser)
})

//DELETE
app.delete('/users/:id', checkUserId, (request, response) =>{
 
  const index = request.userIndex


users.splice(index,1)

  return response.status(204).json()

})




app.listen(port, () =>{
    console.log(`server started on port ${port}`)
})

