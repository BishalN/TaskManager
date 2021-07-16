import faker from 'faker';
import supertest from 'supertest';

const request = supertest('http://localhost:4000');
const username = faker.internet.userName();
const email = faker.internet.email();
const password = faker.internet.password();

describe('Tasks mutation test', () => {
  let token: string;
  beforeAll(async () => {
    await registerUser(username, email, password);
    token = await loginUser(email, password);
  });

  test('Should be able to create a task', async () => {
    const res = await request
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `mutation {
        createTask(title: "Go crazy") {
          id
          title
          status
        }
      }
      `,
      });

    const {
      data: { createTask },
    } = res.body;

    expect(createTask).toBeDefined();
  });

  test('Should not be able to create a task when not logged in', async () => {
    const res = await request.post('/graphql').send({
      query: `mutation {
        createTask(title: "Do homework") {
          id
          title
          status
        }
      }
      `,
    });

    const { errors } = res.body;

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].message).toEqual(
      'Access denied! You need to be authorized to perform this action!'
    );
  });

  test('Should be able to fetch all my tasks', async () => {
    const res = await request
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({
        query: `query {
            getAllMyTasks {
              id
              title
              status
            }
          }
    `,
      });

    const {
      data: { getAllMyTasks },
    } = res.body;

    expect(getAllMyTasks).toBeDefined();
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
