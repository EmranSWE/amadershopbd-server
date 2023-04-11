const http = require("http")
const port=5000;

const server = http.createServer((req,res)=>{

    if(req.url=="/abc"){
        res.end(`"You typed abc" ${req.url}`)
    }
    console.log(req.url)
})

server.listen(port,(req,res)=>{
    console.log("Server running")
})