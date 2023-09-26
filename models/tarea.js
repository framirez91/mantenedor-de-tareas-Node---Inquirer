const { v4: uuidv4 } = require("uuid");

class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = uuidv4(); // 1234
    this.desc = desc; // Hacer tarea
    this.completadoEn = null;
  }
}

module.exports = Tarea;
