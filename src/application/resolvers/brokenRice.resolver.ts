import { CreateBrokenRiceInput, DeleteBrokenRiceInput, BrokenRice, BrokenRiceResponse, UpdateBrokenRiceInput } from '../schema/types/schema';
import { brokenRiceProvider } from '../providers';
import { Root } from '../schema/types/types';
import { ObjectId } from 'bson';
interface BrokenRiceTemp extends Omit<BrokenRice & { sideDishIds: ObjectId[] }, 'sideDishes' | 'priceCents'> {}

const brokenRiceResolver = {
  Query: {
    brokenRices: async (): Promise<BrokenRiceTemp[]> => {
      return brokenRiceProvider.getBrokenRices();
    },
    brokenRicePage: async (_: Root, args: { limit: number; cursor: string; totalCount: number }): Promise<BrokenRiceResponse> => {
      return brokenRiceProvider.getBrokenRicesByPage(args.limit, args.cursor, args.totalCount);
    },
  },

  Mutation: {
    createBrokenRice: async (_: Root, args: { input: CreateBrokenRiceInput }): Promise<BrokenRice> => {
      return brokenRiceProvider.createBrokenRice(args.input);
    },
    deleteBrokenRice: async (_: Root, args: { input: DeleteBrokenRiceInput }): Promise<string> => {
      return brokenRiceProvider.deleteBrokenRice(args.input.id);
    },
    updateBrokenRice: async (_: Root, args: { input: UpdateBrokenRiceInput }): Promise<BrokenRice> => {
      return brokenRiceProvider.updateBrokenRice(args.input);
    },
  },
};

export { brokenRiceResolver };
