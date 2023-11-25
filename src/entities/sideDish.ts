import { Document } from 'mongodb';
import { SideDish } from '../application/providers/sideDishes/sideDish.provider.types';

interface SideDishDocument extends Document, Omit<SideDish, 'id'> {}

const toSideDishObject = (sideDish: SideDishDocument): SideDish => {
  return {
    id: sideDish._id.toHexString(),
    name: sideDish.name,
    priceCents: sideDish.priceCents,
  };
};

export { SideDishDocument, toSideDishObject };
