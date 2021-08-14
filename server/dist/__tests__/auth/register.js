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
const faker_1 = __importDefault(require("faker"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default('http://localhost:4000');
const username = faker_1.default.internet.userName();
const email = faker_1.default.internet.email();
const password = faker_1.default.internet.password();
describe('Register mutation tests', () => {
    test('Should be able to register with valid email,username and password', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/graphql').send({
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
        const { data: { register: { id }, }, } = res.body;
        expect(id).toBeDefined();
    }));
    test('Should be not be able to register with email already in use', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/graphql').send({
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
        const { errors } = res.body;
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].message).toEqual('user with that email already exists');
    }));
});
//# sourceMappingURL=register.js.map