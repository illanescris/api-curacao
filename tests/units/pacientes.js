const { assert } = require("chai");
const pacienteValidador = require("../../validadores/pacientes");

describe("Paciente Validador", () => {
    describe("Al guardar", () => {
        it("Debe rechazar solo un nombre y un apellidos", () => {
            try {
                const obj = {
                    nombres : "Mauricio",
                    apellidos : "Concha",
                    edad : 21
                }
    
                const errors = pacienteValidador.save(obj);
                assert.isDefined(errors, "Es undefined");
                assert.isArray(errors.nombres, "nombres no es array");
                assert.isArray(errors.apellidos, "apellidos no es array");
    
                assert.isTrue(errors.nombres.length > 0, "nombres no reporta errores");
                assert.isTrue(errors.apellidos.length > 0, "apellidos no reporta errores");
    
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
        it("Debe rechazar digitos", () => {
            try {
                const obj = {
                    nombres : "Mauricio Camilo9",
                    apellidos : "Concha Bello7",
                    edad : 21
                }
    
                const errors = pacienteValidador.save(obj);
                assert.isDefined(errors, "Es undefined");
                assert.isArray(errors.nombres, "nombres no es array");
                assert.isArray(errors.apellidos, "apellidos no es array");
    
                assert.isTrue(errors.nombres.length > 0, "nombres no reporta errores");
                assert.isTrue(errors.apellidos.length > 0, "apellidos no reporta errores");
    
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
        it("Debe rechazar letras en edad", () => {
            try {
                const obj = {
                    nombres : "Mauricio Camilo",
                    apellidos : "Concha Bello",
                    edad : "k"
                }
    
                const errors = pacienteValidador.save(obj);
                assert.isDefined(errors, "Es undefined");
                assert.isArray(errors.nombres, "nombres no es array");
                assert.isArray(errors.apellidos, "apellidos no es array");
                assert.isArray(errors.edad, "edad no es array");
    
                assert.isTrue(errors.nombres.length == 0, "nombres reporta errores");
                assert.isTrue(errors.apellidos.length == 0, "apellidos reporta errores");
                assert.isTrue(errors.edad.length > 0, "edad no reporta errores");
    
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
        it("Debe rechazar negativos en edad", () => {
            try {
                const obj = {
                    nombres : "Mauricio Camilo",
                    apellidos : "Concha Bello",
                    edad : -3
                }
    
                const errors = pacienteValidador.save(obj);
                assert.isDefined(errors, "Es undefined");
                assert.isArray(errors.nombres, "nombres no es array");
                assert.isArray(errors.apellidos, "apellidos no es array");
                assert.isArray(errors.edad, "edad no es array");
    
                assert.isTrue(errors.nombres.length == 0, "nombres reporta errores");
                assert.isTrue(errors.apellidos.length == 0, "apellidos reporta errores");
                assert.isTrue(errors.edad.length > 0, "edad no reporta errores");
    
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
        it("Debe aceptar datos", () => {
            try {
                const obj = {
                    nombres : "Mauricio Camilo",
                    apellidos : "Concha Bello",
                    edad : 3
                }
    
                const errors = pacienteValidador.save(obj);
                assert.isUndefined(errors, "Reporta errores");
    
                return Promise.resolve()
            } catch (error) {
                return Promise.reject(error)
            }
        })
    })
});