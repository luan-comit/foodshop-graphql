import { ObjectId } from 'bson';
import { BrokenRice, SideDish } from '../../src/application/schema/types/schema';
import { BrokenRiceDocument } from 'src/entities/brokenRice';
import { createMockSideDish } from './sideDish.helper';

const mockSideDish = createMockSideDish();
interface BrokenRiceTemp extends BrokenRice, Omit<BrokenRice & { sideDishIds: ObjectId[] }, 'sideDishes' | 'priceCents'> {}
const createMockBrokenRice = (data?: Partial<BrokenRiceTemp>): BrokenRiceTemp => {
  return {
    __typename: 'BrokenRice',
    id: new ObjectId().toHexString(),
    name: 'Cheese',
    description: 'Simple',
    sideDishIds: [mockSideDish.id],
    sideDishes: [mockSideDish],
    priceCents: mockSideDish.priceCents,
    imgSrc:
      'https://www.dropbox.com/scl/fi/o5ax6d699eo3hq95bh6z2/br_regular.jpeg?rlkey=q67dbgbdu46rabm52mdl2j0cv&raw=1',
    ...data,
  };
};

const createMockBrokenRiceDocument = (data?: Partial<BrokenRiceDocument>): BrokenRiceDocument => {
  return {
    _id: new ObjectId(),
    name: 'Cheese',
    description: 'Simple',
    sideDishes: [mockSideDish],
    priceCents: mockSideDish.priceCents,
    imgSrc:
      'https://www.dropbox.com/scl/fi/wk9pypsw69rhx3a54ojxi/br_regular_plus.jpeg?rlkey=zbejs2d9s324l9ypctg2suz0n&raw=1',
    ...data,
  };
};

const createMockSideDishWithoutPrice = (data?: Partial<Omit<SideDish, 'priceCents'>>): Omit<SideDish, 'priceCents'> => {
  return {
    __typename: 'SideDish',
    id: mockSideDish.id,
    name: 'Tomato Sauce',
    ...data,
  };
};

const mockSideDishWithoutPrice = createMockSideDishWithoutPrice();

export { createMockBrokenRice, createMockBrokenRiceDocument, mockSideDishWithoutPrice };
