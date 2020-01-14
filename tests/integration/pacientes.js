const { apiClient } = require("./config");
const { assert } = require("chai");
const apiClientBaseUrl = "/v1/pacientes";

describe("Paciente API", () => {
    it("No debe guardar pacientes (1)", async () => {
        try {
            const obj = {
                nombres : "Mauricio",
                apellidos : "Concha",
                edad : 21
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(obj)
                .expect(400);

            const { body:errors } = response;
            assert.isArray(errors.nombres, "nombres no es arrray");
            assert.isNotEmpty(errors.nombres, "nombres no reporta errores");

            assert.isArray(errors.apellidos, "apellidos no es arrray");
            assert.isNotEmpty(errors.apellidos, "apellidos no reporta errores");

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it("No debe guardar pacientes (2)", async () => {
        try {
            const obj = {
                nombres : "Mauri6cio Camilo",
                apellidos : "Concha Bel8lo",
                edad : 21
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(obj)
                .expect(400);

            const { body:errors } = response;

            assert.isArray(errors.nombres, "nombres no es arrray");
            assert.isNotEmpty(errors.nombres, "nombres no reporta errores");

            assert.isArray(errors.apellidos, "apellidos no es arrray");
            assert.isNotEmpty(errors.apellidos, "apellidos no reporta errores");

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it("No debe guardar pacientes (3)", async () => {
        try {
            const obj = {
                nombres : "Mauricio Camilo",
                apellidos : "Concha Bello",
                edad : "g"
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(obj)
                .expect(400);

            const { body:errors } = response;

            assert.isArray(errors.edad, "edad no es arrray");
            assert.isNotEmpty(errors.edad, "edad no reporta errores");

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it("Debe guardar pacientes", async () => {
        try {
            const obj = {
                nombres : "Mauricio Camilo",
                apellidos : "Concha Bello",
                edad : 21
            }

            const response = await apiClient
                .post(apiClientBaseUrl)
                .send(obj)
                .expect(201);

            const { body } = response;
            assert.isObject(body, "No es array");
            const props = ["id", "nombres", "apellidos", "edad"];
            assert.hasAllKeys(body, props);

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it("Debe obtener pacientes", async () => {
        try {
            const response = await apiClient
                .get(apiClientBaseUrl)
                .expect(200);

            const { body } = response;
            assert.isArray(body, "No es array");
            assert.isNotEmpty(body, "Esta vacio");
            const obj = body[0];
            const props = ["id", "nombres", "apellidos", "edad"];
            assert.hasAllKeys(obj, props);

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it("Debe obtener paciente por ID", async () => {
        const pacienteId = 1;
        try {
            const response = await apiClient
                .get(`${apiClientBaseUrl}/${pacienteId}`)
                .expect(200);

            const { body } = response;
            assert.isObject(body, "No es object");
            const props = ["id", "nombres", "apellidos", "edad"];
            assert.hasAllKeys(body, props);

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })

    it("No debe encontrar paciente por ID", async () => {
        const pacienteId = 10000;
        try {
            const response = await apiClient
                .get(`${apiClientBaseUrl}/${pacienteId}`)
                .expect(404);

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    })
});