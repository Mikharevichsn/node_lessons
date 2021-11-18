import { jest } from '@jest/globals';
import request from 'supertest';
import { app } from '../app';
import Cat from '../database/schemas/catSchema';
import User from '../database/schemas/userSchema';

// jest.spyOn(Cat, 'paginate').mockImplementation(() => cats);
// jest.spyOn(User, 'findOne').mockImplementation(() => {
//   _id: 1;
// });

// jest.mock('../helpers/checkAuth', () => {
//   return (req, res, next) => {
//     req.user = { id: 1 };
//     next();
//   };
// });

jest.setTimeout(7000);

describe('cats get all', () => {
  it('should return 200', async (done) => {
    const loginResponse = await request(app)
      .post('/api/user/login')
      .send({
        login: 'serjo2',
        password: '123456',
      })
      .set('Accept', 'application/json');

    console.log(
      '🚀 ~ file: Cats.e2e.test.js ~ line 23 ~ it ~ loginResponse',
      loginResponse.body
    );

    const { token } = loginResponse.body.data;

    const result = await request(app)
      .get('/api/cat')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    console.log(
      '🚀 ~ file: Cats.e2e.test.js ~ line 7 ~ it ~ result',
      result.body
    );

    expect(result.body.code).toEqual(200);
    expect(result.body).toBeDefined();
    done();
  });
});
