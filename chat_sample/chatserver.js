let express=require('express')
let ioserver=require('socket.io')
let path =require('path')
let body=require('body-parser')
let j=express()
j.use(body.json())
j.get('/',(req,res)=>{
    res.send('Welcome from server')
})
j.get('/chat',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

let k=j.listen(8000,'localhost',(req,res)=>{
    console.log(`Your chat is ready at localhost 8000. 
    waiting for you to chat.............`)
})

let io=ioserver(k)

var names=io.of('/chat')

names.on('connection', (socket)=>{
    console.log('someone is comming')
    socket.emit('ok',"You are new person on the server")
})
j.post('/chat',(req,res)=>{
    console.log(req.body)
    var con=req.body.data
    names.emit('broadcast',con)
})

