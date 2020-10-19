const express = require('express');
const pokemon = express.Router();
// const pk = require('../pokedex.json').pokemon;

const db = require('../config/database')

pokemon.post("/", (req, res, next) =>{
    return res.status(200).json(req.body)
})
// / : especificando que es una variable y no un valor estatico 
// importante el orden 
pokemon.get("/", async (req, res, next) =>{
// req obtemer la variable de la url
    // req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon")

    return res.status(200).json({code: 1, message: pkmn});
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) =>{
    const id = req.params.id;
    if(id >= 1 && id <= 722){
        const pkmn = await db.query("SELECT * FROM pokemon where pok_id =" + id)
        return res.status(200).json({code: 1, message: pkmn});
    } else{
        return res.status(200).send({code: 404, message: "Pokemon no encontrado"})
    }
    
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) =>{
    const name = req.params.name
    const pkmname = await db.query("SELECT * FROM pokemon where pok_name = '"+ name +"' ")

    if(pkmname.length > 0){
        return res.status(200).json({code: 1, message: pkmname});
    } else{
        return res.status(200).send({code: 404, message: "Pokemon no encontrado"})
    }

     // condicion ? valor si verdadero : valor si falso 

    // (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(400).send("Pokemon no encontrado")

} )

// exportas cosas solo una opcion 
module.exports = pokemon;