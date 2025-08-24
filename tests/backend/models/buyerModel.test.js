import { jest } from '@jest/globals';
import { createBuyer, getBuyerByEmail, getBuyerById, updateBuyer } from '../../Server/models/buyerModel.js';
import * as RWJ from '../../Server/engine/Agents/RWJ.js';
import * as BTE from '../../Server/engine/Agents/BTE.js';

jest.mock('../../Server/engine/Agents/RWJ.js');
jest.mock('../../Server/engine/Agents/BTE.js');

describe('Buyer Model', () => {
  const fakeBuyers = [];
  
  beforeEach(() => {
    RWJ.readJSON.mockResolvedValue(fakeBuyers);
    RWJ.writeJSON.mockResolvedValue();
    BTE.Encryption.mockImplementation(async (pwd) => `hashed-${pwd}`);
    BTE.TokenGenerate.mockReturnValue('fake-token');
    fakeBuyers.length = 0; // reset array
  });

  test('createBuyer should create a new buyer', async () => {
    const data = { firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: '1234' };
    const buyer = await createBuyer(data);

    expect(buyer.firstname).toBe('John');
    expect(buyer.password).toBe('hashed-1234');
    expect(buyer.buyerToken).toBe('fake-token');
    expect(fakeBuyers.length).toBe(1);
  });

  test('createBuyer should throw error if email exists', async () => {
    fakeBuyers.push({ email: 'john@example.com' });
    await expect(createBuyer({ email: 'john@example.com', password: '1234' })).rejects.toThrow('Email already exists');
  });

  test('getBuyerByEmail should return correct buyer', async () => {
    fakeBuyers.push({ buyerId: '1', email: 'john@example.com' });
    const buyer = await getBuyerByEmail('john@example.com');
    expect(buyer.buyerId).toBe('1');
  });

  test('getBuyerById should return correct buyer', async () => {
    fakeBuyers.push({ buyerId: '123', email: 'test@test.com' });
    const buyer = await getBuyerById('123');
    expect(buyer.email).toBe('test@test.com');
  });

  test('updateBuyer should update buyer fields', async () => {
    fakeBuyers.push({ buyerId: 'abc', email: 'old@test.com', firstname: 'Old' });
    const updated = await updateBuyer('abc', { firstname: 'New' });
    expect(updated.firstname).toBe('New');
    expect(fakeBuyers[0].firstname).toBe('New');
  });

  test('updateBuyer should throw error if buyer not found', async () => {
    await expect(updateBuyer('notfound', { firstname: 'X' })).rejects.toThrow('Buyer not found');
  });
});
