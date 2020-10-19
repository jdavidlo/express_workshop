const bodyPaser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
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

app.use("/pokemon", pokemon)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
})