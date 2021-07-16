import faker from 'faker';
import supertest from 'supertest';

const request = supertest('http://localhost:4000');
const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Login mutation tests', () => {
  beforeAll(async () => {
    await registerUser(username, email, password);
  });

  test('Should be able to login with registered user', async () => {
    const res = await request.post('/graphql').send({
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

    const {
      data: {
        login: { id, token },
      },
    } = res.body;

    expect(id).toBeDefined();
    expect(token.length).toBeGreaterThan(5);
  });

  test('Should not be able to login with unregistered user', async () => {
    const res = await request.post('/graphql').send({
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
  });
});

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  await request.post('/graphql').send({
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
};
