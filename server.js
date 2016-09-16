'use strict'
const express = require('express')
const http = require('http')
const port = process.env.PORT || 3000;
const bodyParser=require('body-parser')
const Firebase= require('firebase')
let items=[]
let contador=0

/*----------------------------Asignatura--------------------------------*/
let miAsignatura= new Firebase('https://gestion-de-calificaciones.firebaseio.com/Asignatura')
let rutaAsignatura=express.Router()
rutaAsignatura.use(bodyParser())
rutaAsignatura.route('/')
.get(function(request,response){
    items=[]
    miAsignatura.once("value",function(snap){
        let nuevoAsignatura=snap.val()
        items.push(nuevoAsignatura)
        console.log(contador++)
        return response.send(items)
     })
})

.post(function(req,res,next){
    miAsignatura.child(req.body.Id).set(req.body)
    res.status(200)
})
.put(function(req,res,next){

    miAsignatura.child(req.body.Id).set(req.body)
    res.status(200).send("La asignatura "+req.body.Id+" fue modificada")
})
.delete(function(req,res,next){
    miAsignatura.child(req.body.Id).remove(function(error){
        if (error)
        {
            return res.status(404).send('error ')
        }
    })
    return res.status(200).send('Se elimino correctamente')
});

/*----------------------------Estudiante--------------------------------*/
let miEstudiante= new Firebase('https://gestion-de-calificaciones.firebaseio.com/Estudiante')
let rutaEstudiante=express.Router()
rutaEstudiante.use(bodyParser())
rutaEstudiante.route('/')
.get(function(request,response){
    items=[]
    miEstudiante.once("value",function(snap){
        let nuevoEstudiante=snap.val()
        items.push(nuevoEstudiante)
        console.log(contador++)
        return response.send(items)
     })
})

.post(function(req,res,next){
    miEstudiante.child(req.body.Cedula).set(req.body)
    res.status(200)
})
.put(function(req,res,next){

    miEstudiante.child(req.body.Cedula).set(req.body)
    res.status(200).send(req.body.Cedula)
})
.delete(function(req,res,next){
    miEstudiante.child(req.body.cedula).remove(function(error){
        if (error)
        {
            return res.status(404).send('error ')
        }
    })
    return res.status(200).send('Se elimino correctamente')
});

/*----------------------------Calificacion--------------------------------*/
let miCalificacion= new Firebase('https://gestion-de-calificaciones.firebaseio.com/')
let rutaCalificacion=express.Router()
rutaCalificacion.use(bodyParser())
rutaCalificacion.route('/')
.get(function(request,response){
    items=[]
    miCalificacion.once("value",function(snap){
        let nuevoCalificacion=snap.val()
        items.push(nuevoCalificacion)
        console.log(contador++)
        return response.send(items)
     })
})

.post(function(req,res,next){
    miCalificacion.child(req.body.Calificacion).set(req.body)
    res.status(200)
})
.put(function(req,res,next){

    miCalificacion.child(req.body.Calificacion).set(req.body)
    res.status(200).send(req.body.Calificacion)
})
.delete(function(req,res,next){
    miCalificacion.child(req.body.Calificacion).remove(function(error){
        if (error)
        {
            return res.status(404).send('error ')
        }
    })
    return res.status(200).send('Se elimino correctamente')
});


let app = express()
.use('/Asignatura',rutaAsignatura)
.use('/Estudiante',rutaEstudiante)
.use(express.static(__dirname+'/public'))
.listen(port)