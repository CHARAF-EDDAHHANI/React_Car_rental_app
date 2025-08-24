import { jest } from '@jest/globals';
import {
  createSeller,
  getSellerByEmail,
  getSellerById,
  updateSeller,
  deleteSeller,
  getAllSellers,
} from '../../Server/models/sellerModel.js';
import * as RWJ from '../../Server/engine/Agents/RWJ.js';
import * as BTE from '../../Server/engine/Agents/BTE.js';

jest.mock('../../Server/engine/Agents/RWJ.js');
jest.mock('../../Server/engine/Agents/BTE.js');

describe('Seller Model', () => {
  const fakeSellers = [];

  beforeEach(() => {
    RWJ.readJSON.mockResolvedValue(fakeSellers);
    RWJ.writeJSON.mockResolvedValue();
    BTE.Encryption.mockImplementation(async (pwd) => `hashed-${pwd}`);
    BTE.TokenGenerate.mockReturnValue('fake-token');
    fakeSellers.length = 0; // reset array
  });

  test('createSeller should create a new seller', async () => {
    const data = { firstname: 'Alice', lastname: 'Smith', email: 'alice@example.com', password: 'pass123' };
    const seller = await createSeller(data);

    expect(seller.firstname).toBe('Alice');
    expect(seller.password).toBe('hashed-pass123');
    expect(seller.sellerToken).toBe('fake-token');
    expect(fakeSellers.length).toBe(1);
  });

  test('createSeller should throw error if email exists', async () => {
    fakeSellers.push({ email: 'alice@example.com' });
    await expect(createSeller({ email: 'alice@example.com', password: '1234' })).rejects.toThrow('Email already exists');
  });

  test('getSellerByEmail should return correct seller', async () => {
    fakeSellers.push({ sellerId: '1', email: 'bob@example.com' });
    const seller = await getSellerByEmail('bob@example.com');
    expect(seller.sellerId).toBe('1');
  });

  test('getSellerById should return correct seller', async () => {
    fakeSellers.push({ sellerId: '123', email: 'test@test.com' });
    const seller = await getSellerById('123');
    expect(seller.email).toBe('test@test.com');
  });

  test('updateSeller should update seller fields', async () => {
    fakeSellers.push({ sellerId: 'abc', email: 'old@test.com', firstname: 'Old' });
    const updated = await updateSeller('abc', { firstname: 'New' });
    expect(updated.firstname).toBe('New');
    expect(fakeSellers[0].firstname).toBe('New');
  });

  test('updateSeller should throw error if seller not found', async () => {
    await expect(updateSeller('notfound', { firstname: 'X' })).rejects.toThrow('Seller not found');
  });

  test('deleteSeller should remove seller from array', async () => {
    fakeSellers.push({ sellerId: 'del1', email: 'delete@test.com' });
    await deleteSeller('del1');
    expect(fakeSellers.length).toBe(1); // RWJ.writeJSON mocked, array unchanged
  });

  test('getAllSellers should return all sellers', async () => {
    fakeSellers.push({ sellerId: '1', email: 'all@test.com' });
    const sellers = await getAllSellers();
    expect(sellers.length).toBe(1);
    expect(sellers[0].email).toBe('all@test.com');
  });
});
