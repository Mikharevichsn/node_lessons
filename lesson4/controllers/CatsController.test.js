import { jest } from '@jest/globals';
import { HttpCodes } from '../constants';
import CatsController from './CatsController';
import Cat from '../database/schemas/catSchema';

const cats = [
  {
    id: '1',
    name: 'Кот 1',
    age: 10,
  },
  {
    id: '2',
    name: 'Кот 2',
    age: 5,
  },
  {
    id: '3',
    name: 'Кот 3',
    age: 3,
  },
];

jest.spyOn(Cat, 'findById').mockImplementation((id) => {
  const cat = cats.find((el) => el.id === id);
  if (!cat) throw new Error('error text');
  return cat;
});

jest.spyOn(Cat, 'findOne').mockImplementation(({ name }) => {
  const cat = cats.find((el) => el.name === name);
  if (!cat) throw new Error('error text');
  return cat;
});

const mRes = {
  send: jest.fn((data) => {
    return data;
  }),
};

describe('CatsController', () => {
  it('getById', async () => {
    const mReq = {
      params: {
        id: '1',
      },
    };

    const result = await CatsController.getById(mReq, mRes);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('code', HttpCodes.OK);
    expect(result.data).toMatchObject({
      cat: { id: '1', name: 'Кот 1', age: 10 },
    });
  });

  it('getById - cat not found', async () => {
    const mReq = {
      params: {
        id: '555',
      },
    };
    const result = await CatsController.getById(mReq, mRes);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('success', false);
    expect(result).toHaveProperty('code', HttpCodes.NOT_FOUND);
    expect(result.data).toEqual('Not found');
    expect(result.message).toEqual('Кот не найден. error text');
  });

  it('getByName', async () => {
    const mReq = {
      params: {
        name: 'Кот 2',
      },
    };

    const result = await CatsController.getByName(mReq, mRes);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('success', true);
    expect(result).toHaveProperty('code', HttpCodes.OK);
    expect(result.data).toMatchObject({
      cat: { id: '2', name: 'Кот 2', age: 5 },
    });
  });

  it('getByName - cat not found', async () => {
    const mReq = {
      params: {
        name: 'zzzzzzzz',
      },
    };
    const result = await CatsController.getByName(mReq, mRes);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty('success', false);
    expect(result).toHaveProperty('code', HttpCodes.NOT_FOUND);
    expect(result.data).toEqual('Not found');
    expect(result.message).toEqual('Кот не найден. error text');
  });
});
