"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const faker_1 = __importDefault(require("faker"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default('http://localhost:4000');
const username = faker_1.default.internet.userName();
const email = faker_1.default.internet.email();
const password = faker_1.default.internet.password();
describe('Login mutation tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield exports.registerUser(username, email, password);
    }));
    test('Should be able to login with registered user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/graphql').send({
            query: `mutation {
        login(email: "${email}", password: "${password}") {
          id
          username
          email
          token
        }
      }
      `,
        });
        const { data: { login: { id, token }, }, } = res.body;
        expect(id).toBeDefined();
        expect(token.length).toBeGreaterThan(5);
    }));
    test('Should not be able to login with unregistered user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/graphql').send({
            query: `mutation {
        login(email: "myrandom@gmail.com", password: "${password}") {
          id
          username
          email
          token
        }
      }
      `,
        });
        const { errors } = res.body;
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toEqual('Error: Invalid credentials');
    }));
});
const registerUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    yield request.post('/graphql').send({
        query: `mutation {
            register(
              input: {
                email: "${email}"
                password: "${password}"
                username:" ${username}"
              }
            ) {
              id
              username
              email
            }
          }
          `,
    });
});
exports.registerUser = registerUser;
//# sourceMappingURL=login.js.map