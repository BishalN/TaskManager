import faker from 'faker';
import supertest from 'supertest';
import { Any } from 'typeorm';

const request = supertest('http://localhost:4000');
const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Me query test', () => {
  let token: string;
  beforeAll(async () => {
    await registerUser(username, email, password);
    token = await loginUser(email, password);
  });

  test('Should be able to get the currently logged in user details', async () => {
    const res = await request
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `query {
        me {
          id
          username
          email
        }
      }`,
      });

    const {
      data: {
        me: { id, username, email },
      },
    } = res.body;

    expect(id).toBeDefined();
    expect(username).toBeDefined();
    expect(email).toBeDefined();
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

export const loginUser = async (email: string, password: string) => {
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
      login: { token },
    },
  } = res.body;

  return token;
};
