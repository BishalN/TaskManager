import faker from 'faker';
import supertest from 'supertest';

const request = supertest('http://localhost:4000');
const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Register mutation tests', () => {
  test('Should be able to register with valid email,username and password', async () => {
    const res = await request.post('/graphql').send({
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

    const {
      data: {
        register: { id },
      },
    } = res.body;

    expect(id).toBeDefined();
  });

  test('Should be not be able to register with email already in use', async () => {
    const res = await request.post('/graphql').send({
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
  });
});
