const Tarea = require("./tarea");

class Tareas {
    _listado = {};//objeto vacio mejor que un arreglo porque es mas facil de buscar
    get listadoArr() {//se crea un getter para obtener el listado de tareas
        const listado = [];//se crea un arreglo vacio
        Object.keys(this._listado).forEach((key) => {//se recorre el objeto
            const tarea = this._listado[key];//se crea una constante para guardar el valor de la llave
            listado.push(tarea);//se agrega la tarea al arreglo
        });
        return listado;//se regresa el arreglo
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {//si existe la tarea
            delete this._listado[id];//se borra la tarea
        }
    }



    cargarTareasFromArray(tareas=[]){
        tareas.forEach(tarea => {//se recorre el arreglo de tareas
            this._listado[tarea.id] = tarea;//se agrega la tarea al listado
        });

    }
    
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);//se crea una nueva tarea
        this._listado[tarea.id] = tarea;//se crea una nueva tarea y se agrega al listado
        

    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, i) => {//se recorre el arreglo de tareas el segundo parametro es el indice
            const idx = `${i + 1}`.green;//se crea una constante para guardar el indice
            const { desc, completadoEn } = tarea;//se desestructura la tarea
            const estado = (completadoEn) ? "Completada".green : "Pendiente".red;//se crea una constante para guardar el estado
            //se usa ternario para saber si la tarea esta completada o no
            console.log(`${idx} ${desc} :: ${estado}`);//se imprime el indice, la descripcion y el estado
        });
    }
    listarPendientesCompletadas(completadas = true) {
    
        console.log();
        let contador = 0;//se crea un contador
        this.listadoArr.forEach((tarea) => {//se recorre el arreglo de tareas
            const { desc, completadoEn } = tarea;//se desestructura la tarea
            const estado = (completadoEn) ? "Completada".green : "Pendiente".red;//se crea una constante para guardar el estado
            //se usa ternario para saber si la tarea esta completada o no
            if (completadas) {//si completadas es true
                if (completadoEn) {//si la tarea esta completada
                    contador += 1;//se aumenta el contador
                    console.log(`${(contador + ".").green} ${desc} :: ${completadoEn.green}`);//se imprime el contador, la descripcion y la fecha de completado
                }
            }
            else {//si completadas es false
                if (!completadoEn) {//si la tarea no esta completada
                    contador += 1;//se aumenta el contador
                    console.log(`${(contador + ".").green} ${desc} :: ${estado}`);//se imprime el contador, la descripcion y el estado
                }
            }
        });
    }

    toggleCompletadas(ids = []) {

        ids.forEach((id) => {//se recorre el arreglo de ids
            const tarea = this._listado[id];//se crea una constante para guardar la tarea
            if (!tarea.completadoEn) {//si la tarea no esta completada
                tarea.completadoEn = new Date().toISOString();//se guarda la fecha de hoy
            }
        });

        this.listadoArr.forEach((tarea) => {//se recorre el arreglo de tareas
            if (!ids.includes(tarea.id)) {//si el arreglo de ids no incluye la tarea
                this._listado[tarea.id].completadoEn = null;//se borra la fecha de completado
            }
        });
    }

}

module.exports = Tareas;