require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} = require("./helpers/inquirer"); //se importan las funciones
const Tareas = require("./models/tareas"); //se importa la clase Tareas

console.clear();

const main = async () => {
  let opt = "";
  const tareas = new Tareas(); //se crea una nueva instancia de la clase Tareas

  const tareasDB = leerDB(); //se lee el archivo data.txt
  if (tareasDB) {
    //si existe el archivo
    tareas.cargarTareasFromArray(tareasDB); //se cargan las tareas del archivo
  }

  do {
    opt = await inquirerMenu(); //await espera a que se resuelva la promesa
    switch (opt) {
      case "1":
        //crear opcion
        const desc = await leerInput("Descripcion: "); //se espera a que se resuelva la promesa
        tareas.crearTarea(desc); //se crea la tarea
        break; //se sale del switch
      case "2":
        tareas.listadoCompleto(); //se llama a la funcion
        break;
      case "3":
        tareas.listarPendientesCompletadas(true); //se llama a la funcion
        break;
      case "4":
        tareas.listarPendientesCompletadas(false); //se llama a la funcion
        break;
      case "5"://completar tareas
        const ids = await mostrarListadoChecklist(tareas.listadoArr); //se espera a que se resuelva la promesa
        tareas.toggleCompletadas(ids); //se llama a la funcion
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr); //se espera a que se resuelva la promesa
        if (id !== "0") {
          //si id es diferente de 0
          const ok = await confirmar("¿Estas seguro?"); //se espera a que se resuelva la promesa
          if (ok) {
            //si ok es true
            tareas.borrarTarea(id); //se borra la tarea
            console.log("Tarea borrada correctamente");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr); //se guarda el listado de tareas en el archivo data.txt

    await pausa();
  } while (opt !== "0"); //mientras opt sea diferente de 0

  //pausa();
};

main();
