import { gql } from 'apollo-server-core';

import { sideDishResolver } from '../../src/application/resolvers/sideDish.resolver';
import { sideDishProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreateSideDishArgs,
  MutationDeleteSideDishArgs,
  MutationUpdateSideDishArgs,
} from '../../src/application/schema/types/schema';

import { createMockSideDish } from '../helpers/sideDish.helper';
import { TestClient } from '../helpers/client.helper';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockSideDish = createMockSideDish();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, sideDishResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('sideDishResolver', (): void => {
  describe('Query', () => {
    describe('sideDishes', () => {
      const query = gql`
        query getSideDishes {
          sideDishes {
            id
            name
            priceCents
          }
        }
      `;

      test('should get all sideDishes', async () => {
        jest.spyOn(sideDishProvider, 'getSideDishes').mockResolvedValue([mockSideDish]);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          sideDishes: [
            {
              __typename: 'SideDish',
              id: mockSideDish.id,
              name: mockSideDish.name,
              priceCents: mockSideDish.priceCents,
            },
          ],
        });

        expect(sideDishProvider.getSideDishes).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Mutation', () => {
    describe('createSideDish', () => {
      const mutation = gql`
        mutation ($input: CreateSideDishInput!) {
          createSideDish(input: $input) {
            name
            priceCents
          }
        }
      `;

      const validSideDish = createMockSideDish({ name: 'test sideDish', priceCents: 12345 });

      beforeEach(() => {
        jest.spyOn(sideDishProvider, 'createSideDish').mockResolvedValue(validSideDish);
      });

      test('should call create sideDish when passed a valid input', async () => {
        const variables: MutationCreateSideDishArgs = {
          input: { name: validSideDish.name, priceCents: validSideDish.priceCents },
        };

        await client.mutate({ mutation, variables });

        expect(sideDishProvider.createSideDish).toHaveBeenCalledWith(variables.input);
      });
      test('should return created sideDish when passed a valid input', async () => {
        const variables: MutationCreateSideDishArgs = {
          input: { name: validSideDish.name, priceCents: validSideDish.priceCents },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createSideDish: {
            __typename: 'SideDish',
            name: validSideDish.name,
            priceCents: validSideDish.priceCents,
          },
        });
      });
    });

    describe('deleteSideDish', () => {
      const mutation = gql`
        mutation ($input: DeleteSideDishInput!) {
          deleteSideDish(input: $input)
        }
      `;

      const variables: MutationDeleteSideDishArgs = { input: { id: mockSideDish.id } };

      beforeEach(() => {
        jest.spyOn(sideDishProvider, 'deleteSideDish').mockResolvedValue(mockSideDish.id);
      });

      test('should call deleteSideDish with id', async () => {
        await client.mutate({ mutation, variables });

        expect(sideDishProvider.deleteSideDish).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted sideDish id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deleteSideDish: mockSideDish.id,
        });
      });
    });

    describe('updateSideDish', () => {
      const mutation = gql`
        mutation ($input: UpdateSideDishInput!) {
          updateSideDish(input: $input) {
            id
            name
            priceCents
          }
        }
      `;
      const updatedSideDish = createMockSideDish({ name: 'updated sideDish', priceCents: 2_00 });

      const variables: MutationUpdateSideDishArgs = { input: { id: mockSideDish.id, name: updatedSideDish.name } };

      beforeEach(() => {
        jest.spyOn(sideDishProvider, 'updateSideDish').mockResolvedValue(updatedSideDish);
      });

      test('should call updateSideDish with input', async () => {
        await client.mutate({ mutation, variables });

        expect(sideDishProvider.updateSideDish).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated sideDish', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updateSideDish: {
            ...updatedSideDish,
          },
        });
      });
    });
  });
});
