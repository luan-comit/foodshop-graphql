import merge from 'lodash.merge';

import { sideDishResolver } from './sideDish.resolver';

import { brokenRiceResolver } from './brokenRice.resolver';

const resolvers = merge(sideDishResolver, brokenRiceResolver);

export { resolvers };
