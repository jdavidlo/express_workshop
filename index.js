const bodyPaser = require('body-parser');
const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true}));

// verbos HTTP
// GET - obtener 
// POST - almacenar / crear 
// PATCH - modificar una parte 
// PUT - modificar 
// DELETE - borrar

app.get("/", (req, res, next) =>{

    return res.status(200).send("Bienvenido a mi server")
})

app.post("/pokemon", (req, res, next) =>{
    return res.status(200).send(req.body.name)
})
// / : especificando que es una variable y no un valor estatico 
// importante el orden 
app.get("/pokemon", (req, res, next) =>{
// req obtemer la variable de la url
    // req.params.name;
    return res.status(200).send(pokemon);
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>{
    const id = req.params.id - 1;
    if(id >= 0 && id <= 150){
        return res.status(200).send(pokemon[req.params.id - 1]);
    } else{
        return res.status(200).send("Pokemon no encontrado")
    }
    
})

app.get('/pokemon/:name([A-Za-z]+)',(req, res, next) =>{
    const name = req.params.name
    // for(i = 0; i < pokemon.length; i++){
    //     if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
    //         return res.status(200).send(pokemon[i])
    //     }
    // }


    // const pk = pokemon.filter((p) =>{
    //     if(p.name.toUpperCase() == name.toUpperCase()){
    //         return p
    //     }
        
    // });

    // if(pk.length > 0){
    //     return res.status(200).send(pk)
    // }

    // return res.status(400).send("Pokemon no encontrado")

     // condicion ? valor si verdadero : valor si falso 

    const pk = pokemon.filter((p) =>{
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    (pk.length > 0) ? res.status(200).send(pk) : res.status(400).send("Pokemon no encontrado")


    // return res.status(200).send(req.params.name + " no econtrado")
} )

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
})