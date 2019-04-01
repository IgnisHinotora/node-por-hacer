const fs = require('fs');
const colors = require('colors');


let listadoPorHacer = [];

const guardarDB = () => {
    return new Promise((resolve, reject) => {
        let data = JSON.stringify(listadoPorHacer);

        fs.writeFile('db/data.json', `${data}`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('Datos insertados correctamente');
            }
        });
    })

}
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}
const crear = (descripcion) => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false

    };

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}
const getListado = () => {

    cargarDB();

    listadoPorHacer.forEach(element => {
        console.log('=====Por Hacer====='.green);
        console.log(`Actividad: ${element.descripcion}`);
        console.log(`Completado: ${element.completado}`);
        console.log('==================='.green);
    });
}
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let i = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (i >= 0) {
        listadoPorHacer[i].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let listadoNuevo = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });
    if (listadoPorHacer.length === listadoNuevo.length) {
        return false;

    } else {
        listadoPorHacer = listadoNuevo;
        guardarDB();
        return true;

    }
}

module.exports = {

    crear,
    guardarDB,
    getListado,
    actualizar,
    borrar

}