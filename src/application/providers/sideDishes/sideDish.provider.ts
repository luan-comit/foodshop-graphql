import { ObjectId, Collection } from 'mongodb';
import { SideDishDocument, toSideDishObject } from '../../../entities/sideDish';
import { CreateSideDishInput, SideDish, UpdateSideDishInput } from './sideDish.provider.types';
import validateStringInputs from '../../../lib/string-validator';
class SideDishProvider {
  constructor(private collection: Collection<SideDishDocument>) {}

  public async getSideDishes(): Promise<SideDish[]> {
    const sideDishes = await this.collection.find().sort({ name: 1 }).toArray();
    return sideDishes.map(toSideDishObject);
  }

  public async createSideDish(input: CreateSideDishInput): Promise<SideDish> {
    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} sideDish`);
    }
    const sideDish = data.value;

    return toSideDishObject(sideDish);
  }

  public async deleteSideDish(id: string): Promise<string> {
    const sideDishId = new ObjectId(id);

    const sideDishData = await this.collection.findOneAndDelete({
      _id: sideDishId,
    });

    const sideDish = sideDishData.value;

    if (!sideDish) {
      throw new Error(`Could not delete the sideDish`);
    }

    return id;
  }

  public async updateSideDish(input: UpdateSideDishInput): Promise<SideDish> {
    const { id, name, priceCents } = input;

    if (name) validateStringInputs(name);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...(name && { name: name }), ...(priceCents && { priceCents: priceCents }) } },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the sideDish`);
    }
    const sideDish = data.value;

    return toSideDishObject(sideDish);
  }

  public async getSideDishesByIds(ids: ObjectId[]): Promise<SideDish[]> {
    const sideDishes = await this.collection
      .find({ _id: { $in: ids } })
      .sort({ name: 1 })
      .toArray();
    if (!sideDishes) console.log('No SideDishes found !');
    return sideDishes.map(toSideDishObject);
  }

  public async getPriceCents(ids: ObjectId[]): Promise<number> {
    const sideDishes = await this.collection.find({ _id: { $in: ids } }).toArray();
    if (sideDishes.length == 0) return 0;
    const prices = sideDishes.map((sideDish) => {
      return sideDish.priceCents;
    });
    const total = prices.reduce((sum, price) => {
      return sum + price;
    });
    return total;
  }
}

export { SideDishProvider };
