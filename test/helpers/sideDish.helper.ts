import { ObjectId } from 'bson';
import { SideDish } from '../../src/application/schema/types/schema';
import { SideDishDocument } from '../../src/entities/sideDish';

const createMockSideDish = (data?: Partial<SideDish>): SideDish => {
  return {
    __typename: 'SideDish',
    id: new ObjectId().toHexString(),
    name: 'Tomato Sauce',
    priceCents: 250,
    ...data,
  };
};

const createMockSideDishDocument = (data?: Partial<SideDishDocument>): SideDishDocument => {
  return {
    _id: new ObjectId(),
    name: 'Tomato Sauce',
    priceCents: 250,
    ...data,
  };
};

export { createMockSideDish, createMockSideDishDocument };
