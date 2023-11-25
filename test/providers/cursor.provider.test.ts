import { Collection, ObjectId } from 'mongodb';
import { BrokenRiceDocument } from '../../src/entities/brokenRice';
import { CursorProvider } from '../../src/application/providers/cursors/cursor.provider';
import { reveal, stub } from 'jest-auto-stub';
import { mockLimit, mockCount } from '../helpers/mongo.helper';
import { createMockBrokenRiceDocument } from '../helpers/brokenRice.helper';

const stubBrokenRiceCollection = stub<Collection<BrokenRiceDocument>>();
const cursorProvider = new CursorProvider(stubBrokenRiceCollection);

const mockBrokenRiceDocuments = [
  createMockBrokenRiceDocument(),
  createMockBrokenRiceDocument(),
  createMockBrokenRiceDocument(),
  createMockBrokenRiceDocument(),
];

const brokenRiceResponse1 = {
  brokenRices: [mockBrokenRiceDocuments[0], mockBrokenRiceDocuments[1], mockBrokenRiceDocuments[2]],
  connection: {
    cursor: mockBrokenRiceDocuments[2]._id.toString(),
    hasNextPage: true,
    totalCount: 3,
  },
};

const brokenRiceResponse2 = {
  brokenRices: [mockBrokenRiceDocuments[3]],
  connection: {
    cursor: mockBrokenRiceDocuments[3]._id.toString(),
    hasNextPage: false,
    totalCount: 4,
  },
};

describe('getCursorIndex', (): void => {
  beforeEach(() => {
    reveal(stubBrokenRiceCollection).find.mockImplementation(mockCount(2));
  });
  test('should call getCursorIndex once', async () => {
    await cursorProvider.getCursorIndex(new ObjectId(mockBrokenRiceDocuments[0].id).toHexString());
    expect(stubBrokenRiceCollection.find).toHaveBeenCalledTimes(1);
  });
  test('should return matched index value', async () => {
    const result = await cursorProvider.getCursorIndex(mockBrokenRiceDocuments[1].id);
    expect(result).toEqual(2);
  });
});

describe('getCursorResult1', (): void => {
  beforeEach(() => {
    reveal(stubBrokenRiceCollection).find.mockImplementation(mockCount(0));
    reveal(stubBrokenRiceCollection).find.mockImplementation(
      mockLimit([mockBrokenRiceDocuments[0], mockBrokenRiceDocuments[1], mockBrokenRiceDocuments[2]])
    );
  });
  test('getCursorResult => should return connection & hasNextPage = true', async () => {
    const result = await cursorProvider.getCursorResult(3, '', 0);
    expect(result.connection).toEqual(brokenRiceResponse1.connection);
  });
});

describe('getCursorResult2', (): void => {
  beforeEach(async () => {
    reveal(stubBrokenRiceCollection).find.mockImplementation(mockCount(2));
    reveal(stubBrokenRiceCollection).find.mockImplementation(mockLimit(mockBrokenRiceDocuments));
  });

  test('getCursorResult => should return connection & hasNextPage = false', async () => {
    const spy = jest.spyOn(cursorProvider, 'getCursorIndex');
    spy.mockReturnValue(Promise.resolve(2));
    const result = await cursorProvider.getCursorResult(3, mockBrokenRiceDocuments[2]._id.toString(), 0);

    expect(result.connection).toEqual(brokenRiceResponse2.connection);

    spy.mockRestore();
  });
});
