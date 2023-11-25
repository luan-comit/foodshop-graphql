import { Collection, ObjectId } from 'mongodb';
import { BrokenRiceDocument } from 'src/entities/brokenRice';
import { BrokenRiceResponse } from './cursor.provider.types';

class CursorProvider {
  constructor(private collection: Collection<BrokenRiceDocument>) {}

  public async getCursorIndex(cursor: string): Promise<number> {
    const id = new ObjectId(cursor);
    return await this.collection.find({ _id: { $gt: id } }).count();
  }

  public async getCursorResult(limit: number, cursor: string | null, totalCount: number): Promise<BrokenRiceResponse> {
    const index = cursor ? (await this.getCursorIndex(cursor)) + 1 : 0;
    const brokenRices = await this.collection.find().skip(index).limit(limit).toArray();
    var lastCursor = '';
    lastCursor = brokenRices.length > 0 ? (lastCursor = brokenRices[brokenRices.length - 1]._id.toString()) : '';
    const newTotalCount = totalCount === 0 ? brokenRices.length : totalCount + brokenRices.length;
    var hasNextPage = brokenRices.length === limit;
    return {
      brokenRices: brokenRices,
      connection: {
        cursor: lastCursor,
        totalCount: newTotalCount,
        hasNextPage: hasNextPage,
      },
    };
  }
}

export { CursorProvider };
