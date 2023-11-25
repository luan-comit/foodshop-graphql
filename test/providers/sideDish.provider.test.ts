import { Collection, ObjectId } from 'mongodb';

import { reveal, stub } from 'jest-auto-stub';
import { SideDishProvider } from '../../src/application/providers/sideDishes/sideDish.provider';
import { mockSortToArray } from '../helpers/mongo.helper';
import { createMockSideDishDocument } from '../helpers/sideDish.helper';
import { SideDishDocument, toSideDishObject } from '../../src/entities/sideDish';

const stubSideDishCollection = stub<Collection<SideDishDocument>>();

const sideDishProvider = new SideDishProvider(stubSideDishCollection);

beforeEach(jest.clearAllMocks);

describe('sideDishProvider', (): void => {
  const mockSideDishDocument = createMockSideDishDocument(); // arrange for input
  const mockSideDish = toSideDishObject(mockSideDishDocument); // arrange for expectation

  describe('getSideDishes', (): void => {
    beforeEach(() => {
      reveal(stubSideDishCollection).find.mockImplementation(mockSortToArray([mockSideDishDocument]));
    });
    test('should call find once', async () => {
      await sideDishProvider.getSideDishes();

      expect(stubSideDishCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should get all sideDishes', async () => {
      const result = await sideDishProvider.getSideDishes(); //get result

      expect(result).toEqual([mockSideDish]); // compare result and expectation
    });
  });
  describe('createSideDish', (): void => {
    const validSideDish = createMockSideDishDocument({ name: 'test sideDish', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubSideDishCollection).findOneAndUpdate.mockImplementation(() => ({ value: validSideDish }));
    });
    test('should call findOneAndUpdate once', async () => {
      await sideDishProvider.createSideDish({ name: validSideDish.name, priceCents: validSideDish.priceCents });

      expect(stubSideDishCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a sideDish when passed valid input', async () => {
      const result = await sideDishProvider.createSideDish({
        name: validSideDish.name,
        priceCents: validSideDish.priceCents,
      });

      expect(result).toEqual(toSideDishObject(validSideDish));
    });
  });
  describe('deleteSideDish', (): void => {
    beforeEach(() => {
      reveal(stubSideDishCollection).findOneAndDelete.mockImplementation(() => ({ value: mockSideDishDocument }));
    });
    test('should call findOneAndDelete once', async () => {
      await sideDishProvider.deleteSideDish(mockSideDish.id);

      expect(stubSideDishCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });

    test('should throw an error if findOneAndDelete returns null for value', async () => {
      reveal(stubSideDishCollection).findOneAndDelete.mockImplementation(() => ({ value: null }));

      await expect(sideDishProvider.deleteSideDish(mockSideDish.id)).rejects.toThrow(
        new Error('Could not delete the sideDish')
      );
    });

    test('should return an id', async () => {
      const result = await sideDishProvider.deleteSideDish(mockSideDish.id);

      expect(result).toEqual(mockSideDish.id);
    });
  });
  describe('updateSideDish', (): void => {
    const validSideDish = createMockSideDishDocument({ name: 'test sideDish', priceCents: 12345 });

    beforeEach(() => {
      reveal(stubSideDishCollection).findOneAndUpdate.mockImplementation(() => ({ value: validSideDish }));
    });

    test('should call findOneAndUpdate once', async () => {
      await sideDishProvider.updateSideDish({
        id: validSideDish.id,
        name: validSideDish.name,
        priceCents: validSideDish.priceCents,
      });

      expect(stubSideDishCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });

    test('should return a sideDish', async () => {
      const result = await sideDishProvider.updateSideDish({
        id: validSideDish.id,
        name: validSideDish.name,
        priceCents: validSideDish.priceCents,
      });

      expect(result).toEqual(toSideDishObject(validSideDish));
    });
  });

  describe('getSideDishesByIds', (): void => {
    beforeEach(() => {
      reveal(stubSideDishCollection).find.mockImplementation(mockSortToArray([mockSideDishDocument]));
    });

    test('should call find once', async () => {
      await sideDishProvider.getSideDishesByIds([new ObjectId(mockSideDish.id)]);

      expect(stubSideDishCollection.find).toHaveBeenCalledTimes(1);
    });

    test('should return a sideDish', async () => {
      const result = await sideDishProvider.getSideDishesByIds([new ObjectId(mockSideDish.id)]);
      expect(result).toEqual([mockSideDish]);
    });
  });
});
