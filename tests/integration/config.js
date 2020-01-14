const supertest = require("supertest");
const apiClient = supertest.agent("http://localhost:3000");
exports.apiClient = apiClient;