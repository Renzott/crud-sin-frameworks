class Person {

  /**
   * @param {Number} id
   * @param {String} nombre
   * @param {String} apellido
   * @param {Number} edad
   * @param {String} cargo
   * @param {String} foto
   */
  constructor(id,nombre, apellido, edad, cargo, foto) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.cargo = cargo;
    this.foto = foto;
  }
}

export { Person };