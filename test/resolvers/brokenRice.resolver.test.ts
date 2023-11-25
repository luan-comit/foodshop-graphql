import { gql } from 'apollo-server-core';

import { brokenRiceResolver } from '../../src/application/resolvers/brokenRice.resolver';
import { brokenRiceProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';

import { createMockBrokenRice, mockSideDishWithoutPrice } from '../helpers/brokenRice.helper';
import { TestClient } from '../helpers/client.helper';
import {
  MutationCreateBrokenRiceArgs,
  MutationDeleteBrokenRiceArgs,
  MutationUpdateBrokenRiceArgs,
} from 'src/application/schema/types/schema';
import { createMockSideDish } from '../helpers/sideDish.helper';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockBrokenRice = createMockBrokenRice({});
const mockSideDish = createMockSideDish();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, brokenRiceResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('brokenRiceResolver', (): void => {
  describe('Query', () => {
    describe('brokenRices', () => {
      const query = gql`
        query getBrokenRices {
          brokenRices {
            id
            name
            description
            sideDishes {
              id
              name
            }
            imgSrc
            priceCents
          }
        }
      `;

      test('should get all brokenRices', async () => {
        jest.spyOn(brokenRiceProvider, 'getBrokenRices').mockResolvedValue([mockBrokenRice]);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          brokenRices: [
            {
              __typename: 'BrokenRice',
              id: mockBrokenRice.id,
              name: mockBrokenRice.name,
              description: mockBrokenRice.description,
              sideDishes: [mockSideDishWithoutPrice],
              imgSrc: mockBrokenRice.imgSrc,
              priceCents: mockBrokenRice.priceCents,
            },
          ],
        });
        expect(brokenRiceProvider.getBrokenRices).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Mutation', () => {
    describe('createBrokenRice', () => {
      const mutation = gql`
        mutation ($input: CreateBrokenRiceInput!) {
          createBrokenRice(input: $input) {
            name
            description
            imgSrc
            sideDishIds
          }
        }
      `;

      const validBrokenRice = createMockBrokenRice();

      beforeEach(() => {
        jest.spyOn(brokenRiceProvider, 'createBrokenRice').mockResolvedValue(validBrokenRice);
      });

      test('should call create brokenRice when passed a valid input', async () => {
        const variables: MutationCreateBrokenRiceArgs = {
          input: {
            name: validBrokenRice.name,
            description: validBrokenRice.description,
            sideDishIds: validBrokenRice.sideDishIds,
            imgSrc: validBrokenRice.imgSrc,
          },
        };

        await client.mutate({ mutation, variables });

        expect(brokenRiceProvider.createBrokenRice).toHaveBeenCalledWith(variables.input);
      });
      test('should return created brokenRice when passed a valid input', async () => {
        const variables: MutationCreateBrokenRiceArgs = {
          input: {
            name: validBrokenRice.name,
            description: validBrokenRice.description,
            sideDishIds: validBrokenRice.sideDishIds,
            imgSrc: validBrokenRice.imgSrc,
          },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createBrokenRice: {
            __typename: validBrokenRice.__typename,
            name: validBrokenRice.name,
            description: validBrokenRice.description,
            imgSrc: validBrokenRice.imgSrc,
          },
        });
      });
    });

    describe('deleteBrokenRice', () => {
      const mutation = gql`
        mutation ($input: DeleteBrokenRiceInput!) {
          deleteBrokenRice(input: $input)
        }
      `;

      const variables: MutationDeleteBrokenRiceArgs = { input: { id: mockBrokenRice.id } };

      beforeEach(() => {
        jest.spyOn(brokenRiceProvider, 'deleteBrokenRice').mockResolvedValue(mockBrokenRice.id);
      });

      test('should call deleteBrokenRice with id', async () => {
        await client.mutate({ mutation, variables });

        expect(brokenRiceProvider.deleteBrokenRice).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted brokenRice id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deleteBrokenRice: mockBrokenRice.id,
        });
      });
    });

    describe('updateBrokenRice', () => {
      const mutation = gql`
        mutation ($input: UpdateBrokenRiceInput!) {
          updateBrokenRice(input: $input) {
            id
            name
            description
            imgSrc
            sideDishIds
          }
        }
      `;
      const updatedBrokenRice = createMockBrokenRice({
        name: 'test brokenRice',
        description: 'test brokenRice',
        imgSrc: 'https://img-url',
        sideDishIds: [mockSideDish.id],
      });

      const variables: MutationUpdateBrokenRiceArgs = {
        input: {
          id: mockBrokenRice.id,
          name: updatedBrokenRice.name,
          description: updatedBrokenRice.description,
          imgSrc: updatedBrokenRice.imgSrc,
          sideDishIds: updatedBrokenRice.sideDishIds,
        },
      };

      beforeEach(() => {
        jest.spyOn(brokenRiceProvider, 'updateBrokenRice').mockResolvedValue(updatedBrokenRice);
      });

      test('should call updateBrokenRice with input', async () => {
        await client.mutate({ mutation, variables });

        expect(brokenRiceProvider.updateBrokenRice).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated brokenRice', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updateBrokenRice: {
            __typename: updatedBrokenRice.__typename,
            id: updatedBrokenRice.id,
            name: updatedBrokenRice.name,
            description: updatedBrokenRice.description,
            imgSrc: updatedBrokenRice.imgSrc,
          },
        });
      });
    });
  });
});
