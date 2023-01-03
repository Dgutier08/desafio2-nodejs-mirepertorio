const fs = require("fs");
const express = require('express')
const app = express()
const cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require("path");
const PORT = 3000;

app.use(express.json());
app.use(cors());

//get html -> json
app.get("/", (req, res) => {
    try {
      res.sendFile(__dirname + "/index.html");
    } catch (error) {
      res.json({ message: "El recurso no esta disponible " });
    }
  });
//get
  app.get("/canciones", (req, res) => {
    try {
      const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
      res.json(canciones);
    } catch (error) {
      res.json({ message: "El recurso no esta disponible " });
    }
  });
//post
  app.post ("/canciones", (req, res)=>{
  try{
    const tema = req.body;
    const canciones = json.parse(fs.readFileSync("repertorios.json", "utf8"))
  console.log(tema)
    if(Object.values(tema).some((value)!="")){
        fs.writeFileSync(
            "repertorios.json",
            JSON.stringify([...canciones,tema])
        )
        res.send("cancion incluida")
    }
}
    catch (error) {
        res.json({ message: "El recurso no esta disponible " });

}})

//put
app.put('/canciones/:id',(req,res)=>{
const { id } = req.params

if (!id){
    return res.status(400).json({
        message:"el ID se encuentra indefinido"
    })
}

const newTema = req.body
let data = JSON.parse(fs.readFileSync('repertorios.json','utf8'))
const dataFound = data.find((e) => e.id === parseInt(id))

if (!dataFound)
return res.status(404).json({
    message:"Cancion no encontrada"
})
data=data.map((e)=>e.id===parseInt(id)
?{...e,...newTema}
:e )
fs.writeFileSync('repertorios.json',JSON.stringify(data,null,4))
res.status(200).json({
    message: "cancion actualizada"
})


//delete
app.delete ("/canciones/:id",(req,res)=>{
    try{
        const {id}=req.params;
        const canciones = JSON.parse(fs.readFileSync("repertorios.json","utf8"))
        const index = canciones.findIndex((tema)=>tema.id===parseInt(id));

        console.log(index)
        if (index===-1){
            return res.status(404).json({
            message:"la cancion que desa eliminar no se encuentra"
            });
        }
            canciones.splice(index, 1);
            fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
            res.send("cancion eliminada");
            } catch (error) {
    res.json({ message: "El recurso no esta disponible " });
  }
})

app.listenerCount(PORT,(error)=>{
    if (err){
        console.error(err)
    }
})})