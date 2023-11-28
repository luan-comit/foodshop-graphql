import { Document, ObjectId } from 'mongodb';
import { BrokenRice } from '../application/providers/brokenRices/brokenRice.provider.types';

interface BrokenRiceDocument extends Document, Omit<BrokenRice, 'id'> {};

interface BrokenRiceWithSideDishIds extends BrokenRice, Omit<BrokenRice & { sideDishIds: ObjectId[] }, 'sideDishes' | 'priceCents'> {}

const toBrokenRiceObject = (brokenRice: BrokenRiceDocument): BrokenRiceWithSideDishIds => {
  return {
    id: brokenRice._id.toHexString(),
    name: brokenRice.name,
    description: brokenRice.description,
    sideDishIds: brokenRice.sideDishIds,
    sideDishes: brokenRice.sideDishes,
    imgSrc: brokenRice.imgSrc,
    priceCents: brokenRice.priceCents,
  };
};

export { BrokenRiceDocument, toBrokenRiceObject, BrokenRiceWithSideDishIds };
