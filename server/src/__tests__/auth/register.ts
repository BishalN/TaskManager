import faker from 'faker';
import supertest from 'supertest';

const request = supertest('http://localhost:4000');

const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Register mutation tests', () => {
  test('I can register with valid email,username and password', async () => {
    const res = await request.post('/graphql').send({
      query: `mutation {
        register(
          input: {
            email: ${email}
            password: ${password}
            username: ${username}
          }
        ) {
          id
          username
          email
        }
      }
      `,
    });

    console.log(res);
  });
});
