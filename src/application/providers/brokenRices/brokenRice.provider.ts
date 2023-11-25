import { Collection, ObjectId } from 'mongodb';
import { BrokenRice, BrokenRiceResponse } from './brokenRice.provider.types';
import { BrokenRiceDocument, toBrokenRiceObject } from '../../../entities/brokenRice';
import { CreateBrokenRiceInput, UpdateBrokenRiceInput } from './brokenRice.provider.types';
import validateStringInputs from '../../../lib/string-validator';
import { CursorProvider } from '../cursors/cursor.provider';

export interface BrokenRiceTemp extends Omit<BrokenRice & { sideDishIds: ObjectId[] }, 'sideDishes' | 'priceCents'> {}
class BrokenRiceProvider {
  constructor(private collection: Collection<BrokenRiceDocument>) {}

  public async getBrokenRices(): Promise<BrokenRiceTemp[]> {
    const brokenRices = await this.collection.find().sort({ name: 1 }).toArray();
    return brokenRices.map(toBrokenRiceObject);
  }

  public async getBrokenRicesByPage(limit: number, cursor: string | null, totalCount: number): Promise<BrokenRiceResponse> {
    const cursorProvider = new CursorProvider(this.collection);
    return cursorProvider.getCursorResult(limit, cursor, totalCount);
  }

  public async createBrokenRice(input: CreateBrokenRiceInput): Promise<BrokenRice> {
    const { name, description, imgSrc, sideDishIds } = input;
    const sideDishNewIds = sideDishIds.map((sideDishId) => new ObjectId(sideDishId));

    if (name) validateStringInputs(name);
    if (description) validateStringInputs(description);
    if (imgSrc) validateStringInputs(imgSrc);

    const brokenRice = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...{ name, description, imgSrc, sideDishIds: sideDishNewIds },
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );
    if (!brokenRice.value) throw console.error(`Cannot create ${input.name}`);
    return toBrokenRiceObject(brokenRice.value);
  }

  public async deleteBrokenRice(id: string): Promise<string> {
    const brokenRiceId = new ObjectId(id);
    const brokenRiceData = await this.collection.findOneAndDelete({
      _id: brokenRiceId,
    });
    const brokenRice = brokenRiceData.value;
    if (!brokenRice) {
      throw new Error(`Could not delete the brokenRice`);
    }
    return id;
  }

  public async updateBrokenRice(input: UpdateBrokenRiceInput): Promise<BrokenRice> {
    const { id, name, description, imgSrc, sideDishIds } = input;

    if (name) validateStringInputs(name);
    if (description) validateStringInputs(description);
    if (imgSrc) validateStringInputs(imgSrc);

    const sideDishNewIds = sideDishIds?.map((sideDishId) => new ObjectId(sideDishId));
    const brokenRice = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(sideDishIds && { sideDishIds: sideDishNewIds }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!brokenRice.value) {
      throw new Error(`Could not update the brokenRice`);
    }
    return toBrokenRiceObject(brokenRice.value);
  }
}

export { BrokenRiceProvider };
