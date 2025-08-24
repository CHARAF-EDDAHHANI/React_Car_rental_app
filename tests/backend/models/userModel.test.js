import { jest } from '@jest/globals';
import * as UserModel from '../../Server/models/userModel.js';
import * as RWJ from '../../Server/engine/Agents/RWJ.js';
import { v4 as uuidv4 } from 'uuid';
import * as BTE from '../../Server/helpers/BTE.js';

jest.mock('../../Server/engine/Agents/RWJ.js');
jest.mock('uuid');
jest.mock('../../Server/helpers/BTE.js');

describe('User Model', () => {
  const fakeBuyers = [];
  const fakeSellers = [];

  beforeEach(() => {
    RWJ.readJSON.mockImplementation(async (file) => {
      if (file === 'buyers') return fakeBuyers;
      if (file === 'sellers') return fakeSellers;
      return [];
    });
    RWJ.writeJSON.mockResolvedValue();
    uuidv4.mockReturnValue('fake-user-id');
    BTE.Encryption.mockImplementation(async (pass) => `hashed-${pass}`);
    fakeBuyers.length = 0;
    fakeSellers.length = 0;
  });

  test('createUser should create a new buyer', async () => {
    const userData = {
      userType: 'buyer',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: 'pass123',
    };

    const user = await UserModel.createUser(userData);

    expect(user.userId).toBe('fake-user-id');
    expect(user.password).toBe('hashed-pass123');
    expect(user.userType).toBe('buyer');
    expect(fakeBuyers).toContainEqual(user);
  });

  test('createUser should throw error if email exists', async () => {
    fakeBuyers.push({ email: 'john@example.com' });
    const userData = { userType: 'buyer', email: 'john@example.com', password: 'pass123' };
    await expect(UserModel.createUser(userData)).rejects.toThrow('Email already exists');
  });

  test('getUserByEmail should return the correct user', async () => {
    const buyer = { userId: 'id1', email: 'a@b.com' };
    fakeBuyers.push(buyer);
    const result = await UserModel.getUserByEmail('a@b.com', 'buyer');
    expect(result).toEqual(buyer);
  });

  test('getUserById should return the correct seller', async () => {
    const seller = { userId: 's1', email: 's@c.com' };
    fakeSellers.push(seller);
    const result = await UserModel.getUserById('s1', 'seller');
    expect(result).toEqual(seller);
  });

  test('updateUser should update user fields', async () => {
    const buyer = { userId: 'id1', email: 'a@b.com', firstname: 'Old' };
    fakeBuyers.push(buyer);
    const updated = await UserModel.updateUser('id1', 'buyer', { firstname: 'New' });
    expect(updated.firstname).toBe('New');
  });

  test('deleteUser should remove user', async () => {
    const buyer = { userId: 'id1' };
    fakeBuyers.push(buyer);
    await UserModel.deleteUser('id1', 'buyer');
    expect(fakeBuyers).not.toContain(buyer);
  });

  test('getAllUsers should return all sellers', async () => {
    const seller = { userId: 's1' };
    fakeSellers.push(seller);
    const result = await UserModel.getAllUsers('seller');
    expect(result).toContain(seller);
  });
});
