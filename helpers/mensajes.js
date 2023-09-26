const { read } = require("fs");

require("colors");

const mostrarMenu = () => {
    console.clear();

  return new Promise((resolve) => {
    
    console.log("===========================".green);
    console.log("   Seleccione una opción   ".rainbow);
    console.log("===========================\n".green);

    console.log(`${"1.".green} Crear tarea`);
    console.log(`${"2.".green} Listar tareas`);
    console.log(`${"3.".green} Listar tareas completadas`);
    console.log(`${"4.".green} Listar tareas pendientes`);
    console.log(`${"5.".green} Completar tarea(s)`);
    console.log(`${"6.".green} Borrar tarea`);
    console.log(`${"0.".green} Salir\n`);

    const readline = require("readline").createInterface({
      //crea una interfaz para leer datos
      input: process.stdin, //entrada de datos
      output: process.stdout, //salida de datos
    });

    readline.question("Seleccione una opción: ", (opt) => {
      //pregunta al usuario
      readline.close(); //cierra la interfaz
      //console.log({opt});
      resolve(opt);
    });
  });
};

const pausa = () => {
  
    return new Promise((resolve) => {
        const readline = require("readline").createInterface({
            //crea una interfaz para leer datos
            input: process.stdin, //entrada de datos
            output: process.stdout, //salida de datos
            });

            readline.question(`\nPresione ${"ENTER".green} para continuar\n`, (opt) => {
            //pregunta al usuario
            readline.close(); //cierra la interfaz
            resolve();
            });
    });

};

module.exports = {
  mostrarMenu,
  pausa,
};
