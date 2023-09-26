const fs = require("fs");
const archivo = "./db/data.json"; //se crea una constante para guardar la ruta del archivo de manera global


const guardarDB = (data) => {

  fs.writeFileSync(archivo,JSON.stringify(data));
};

const leerDB = () => {
    
    if(!fs.existsSync(archivo)){//si no existe el archivo
        return null;//regresa null
    }
    const info = fs.readFileSync(archivo,{encoding: "utf-8"});//se lee el archivo
    const data = JSON.parse(info);//se convierte a un objeto de javascript opuesto a JSON.stringify
    return data;//se regresa el objeto
}


module.exports = {
    guardarDB,
    leerDB
};