import express from "express"
// 1 import de la librairie
import swaggerUI from "swagger-ui-express"
import YAML from "yamljs"

const app = express();
const PORT = 1234 ;
const users = [{id : 1} , {id : 2}]

// 2 importer le document
const documentationSwagger = YAML.load("swagger.yaml")
// 3 ajouter une nouvelle route qui va afficher directement dans notre api sa documentation

// http://localhost:1234/doc-api
app.use("/doc-api", swaggerUI.serve , swaggerUI.setup(documentationSwagger ))

app.get("/", function(req, rep){
    rep.json(users)
})


app.get("/:id", function(req, rep){
    const id = req.params.id 
    const userRecherche = users.find(function(user){
        console.log(id, user)
        return user.id == id
    })
    if(!userRecherche){
        rep.status(404).json({ msg : "user introuvable" , code : 404 })
        return ;
    }
    rep.json(userRecherche)
})
app.post("/" , function(req, rep){
    const {body} = req ;
    users.push(body);
    rep.json({ msg : "user ajouté en base" , code : 200 })
})
app.listen(PORT , function(){ console.log("express start on port "+ PORT) })