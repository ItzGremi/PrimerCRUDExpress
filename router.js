const express = require('express');
const router = express.Router();
const conexion = require('./database/db');

//MOSTRAR todos los registros
router.get('/', (req, res)=>{
    conexion.query('SELECT * FROM usuarios', (error, results)=>{
        if(error){
            throw error;
        } else {
            res.render('index', { results: results });
        }
    }); 
});

//CREAR registros
router.get('/create', (req, res)=>{
    res.render('create');
})

//EDITAR REGISTROS
router.get('/edit/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM usuarios WHERE id=?', [id], (error, results)=>{
        if(error){
            throw error;
        } else {
            res.render('edit', {user:results[0]});
        }
    })
})

//ELIMINAR REGISTROS
router.get('/delete/:id', (req, res)=>{
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id = ?', [id],(error,results)=>{
        if(error){
            throw error;
        } else{
            res.redirect('/');
        }
    } )
})


const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;
