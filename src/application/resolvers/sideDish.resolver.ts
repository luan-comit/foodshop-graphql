import { CreateSideDishInput, DeleteSideDishInput, SideDish, UpdateSideDishInput } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { sideDishProvider } from '../providers';
import { BrokenRiceWithSideDishIds } from '../../entities/brokenRice';
const sideDishResolver = {
  Query: {
    sideDishes: async (): Promise<SideDish[]> => {
      return sideDishProvider.getSideDishes();
    },
  },

  Mutation: {
    createSideDish: async (_: Root, args: { input: CreateSideDishInput }): Promise<SideDish> => {
      return sideDishProvider.createSideDish(args.input);
    },

    deleteSideDish: async (_: Root, args: { input: DeleteSideDishInput }): Promise<string> => {
      return sideDishProvider.deleteSideDish(args.input.id);
    },

    updateSideDish: async (_: Root, args: { input: UpdateSideDishInput }): Promise<SideDish> => {
      return sideDishProvider.updateSideDish(args.input);
    },
  },

  BrokenRice: {
    sideDishes: async (parent: BrokenRiceWithSideDishIds): Promise<SideDish[]> => {
      return sideDishProvider.getSideDishesByIds(parent.sideDishIds);
    },
    priceCents: async (parent: BrokenRiceWithSideDishIds): Promise<Number> => {
      return sideDishProvider.getPriceCents(parent.sideDishIds);
    },
  },

  BrokenRiceDocument: {
    sideDishes: async (parent: BrokenRiceWithSideDishIds): Promise<SideDish[]> => {
      return sideDishProvider.getSideDishesByIds(parent.sideDishIds);
    },
    priceCents: async (parent: BrokenRiceWithSideDishIds): Promise<Number> => {
      return sideDishProvider.getPriceCents(parent.sideDishIds);
    },
  },
};

export { sideDishResolver };
