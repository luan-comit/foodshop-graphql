import { Collection, ObjectId } from 'mongodb';
import { reveal, stub } from 'jest-auto-stub';
import { BrokenRiceProvider } from '../../src/application/providers/brokenRices/brokenRice.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockBrokenRiceDocument } from '../helpers/brokenRice.helper';
import { BrokenRiceDocument, toBrokenRiceObject } from '../../src/entities/brokenRice';

const stubBrokenRiceCollection = stub<Collection<BrokenRiceDocument>>();

const brokenRiceProvider = new BrokenRiceProvider(stubBrokenRiceCollection);

beforeEach(jest.clearAllMocks);

describe('brokenRiceProvider', (): void => {
  const mockBrokenRiceDocument = createMockBrokenRiceDocument();
  const mockBrokenRice = toBrokenRiceObject(mockBrokenRiceDocument);

  describe('getBrokenRices', (): void => {
    beforeEach(() => {
      reveal(stubBrokenRiceCollection).find.mockImplementation(mockSortToArray([mockBrokenRiceDocument]));
    });
    test('should call find once', async () => {
      await brokenRiceProvider.getBrokenRices();

      expect(stubBrokenRiceCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all brokenRices', async () => {
      const result = await brokenRiceProvider.getBrokenRices();

      expect(result).toEqual([mockBrokenRice]);
    });
  });

  describe('createBrokenRice', (): void => {
    const validBrokenRice = createMockBrokenRiceDocument({
      name: 'test brokenRice',
      description: 'test brokenRice',
      imgSrc: 'https://img-url',
      sideDishIds: [new ObjectId()],
    });

    beforeEach(() => {
      reveal(stubBrokenRiceCollection).findOneAndUpdate.mockImplementation(() => ({ value: validBrokenRice }));
    });
    test('should call findOneAndUpdate once', async () => {
      await brokenRiceProvider.createBrokenRice({
        name: validBrokenRice.name,
        description: validBrokenRice.description,
        sideDishIds: validBrokenRice.sideDishIds,
        imgSrc: validBrokenRice.imgSrc,
      });

      expect(stubBrokenRiceCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a brokenRice when passed valid input', async () => {
      const result = await brokenRiceProvider.createBrokenRice({
        name: validBrokenRice.name,
        description: validBrokenRice.description,
        sideDishIds: validBrokenRice.sideDishIds,
        imgSrc: validBrokenRice.imgSrc,
      });

      expect(result).toEqual(toBrokenRiceObject(validBrokenRice));
    });
  });

  describe('deleteBrokenRice', (): void => {
    beforeEach(() => {
      reveal(stubBrokenRiceCollection).findOneAndDelete.mockImplementation(() => ({ value: mockBrokenRiceDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await brokenRiceProvider.deleteBrokenRice(mockBrokenRice.id);

      expect(stubBrokenRiceCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubBrokenRiceCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(brokenRiceProvider.deleteBrokenRice(mockBrokenRice.id)).rejects.toThrow(new Error('Could not delete the brokenRice'));
    });

    test('should return an id', async () => {
      const result = await brokenRiceProvider.deleteBrokenRice(mockBrokenRice.id);

      expect(result).toEqual(mockBrokenRice.id);
    });
  });

  describe('updateBrokenRice', (): void => {
    const validBrokenRice = createMockBrokenRiceDocument(mockBrokenRiceDocument);

    beforeEach(() => {
      reveal(stubBrokenRiceCollection).findOneAndUpdate.mockImplementation(() => ({ value: validBrokenRice }));
    });

    test('should call findOneAndUpdate once', async () => {
      await brokenRiceProvider.updateBrokenRice({
        id: validBrokenRice.id,
        name: validBrokenRice.name,
        description: validBrokenRice.description,
        imgSrc: validBrokenRice.imgSrc,
      });

      expect(stubBrokenRiceCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a brokenRice', async () => {
      const result = await brokenRiceProvider.updateBrokenRice({
        id: validBrokenRice.id,
        name: validBrokenRice.name,
        description: validBrokenRice.description,
        imgSrc: validBrokenRice.imgSrc,
      });

      expect(result).toEqual(toBrokenRiceObject(validBrokenRice));
    });
  });
});
