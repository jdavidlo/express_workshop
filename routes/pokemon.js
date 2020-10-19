const express = require('express');
const pokemon = express.Router();
// const pk = require('../pokedex.json').pokemon;

const db = require('../config/database')

pokemon.post("/", (req, res, next) =>{
    return res.status(200).send(req.body.name)
})
// / : especificando que es una variable y no un valor estatico 
// importante el orden 
pokemon.get("/", async (req, res, next) =>{
// req obtemer la variable de la url
    // req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon")

    return res.status(200).json(pkmn);
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) =>{
    const id = req.params.id;
    const pkmn = await db.query("SELECT * FROM pokemon where pok_id =" + id)

    if(pkmn != ""){
        return res.status(200).json(pkmn);
    } else{
        return res.status(200).send("Pokemon no encontrado")
    }
    
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) =>{
    const name = req.params.name
    const pkmname = await db.query("SELECT * FROM pokemon where pok_name = '"+ name +"' ")

    if(pkmname != ""){
        return res.status(200).json(pkmname);
    } else{
        return res.status(200).send("Pokemon no encontrado")
    }

    
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

            // const pkmn = pk.filter((p) =>{
            //     return (p.pkmname.toUpperCase() == pkmname.toUpperCase()) && p;
            // });

            // if(pkmn. length > 0){
            //     return res.status(200).send(pkmn)
            // }
            // return res.status(400).send("Pokemon no encontrado")

    // (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(400).send("Pokemon no encontrado")


    // return res.status(200).send(req.params.name + " no econtrado")
} )

// exportas cosas solo una opcion 
module.exports = pokemon;