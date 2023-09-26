const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      //arreglo de objetos
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".rainbow);
  console.log("   Seleccione una opción".white.bold);
  console.log("===========================\n".rainbow);

  const { opcion } = await inquirer.prompt(preguntas); //desestructuración de objetos

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question); //espera a que se resuelva la promesa
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message, //message: mensaje para no ser redundante
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question); //desestructuración de objetos
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {//el map regresa un nuevo arreglo
    //se recorre el arreglo de tareas
    const idx = `${i + 1}.`.green; //se crea una constante para guardar el indice
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas); //desestructuración de objetos
  return id;


};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message, //message: mensaje para no ser redundante
    },
  ];
  const { ok } = await inquirer.prompt(question); //desestructuración de objetos
  return ok;
};

const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {//el map regresa un nuevo arreglo
    //se recorre el arreglo de tareas
    const idx = `${i + 1}.`.green; //se crea una constante para guardar el indice
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false//se usa ternario para saber si la tarea esta completada o no
    };
  });
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta); //desestructuración de objetos
  return ids;
};



module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
  
};
