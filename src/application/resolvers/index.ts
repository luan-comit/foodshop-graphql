import { merge } from 'lodash';

import { sideDishResolver } from './sideDish.resolver';

import { brokenRiceResolver } from './brokenRice.resolver';

const resolvers = merge(sideDishResolver, brokenRiceResolver);

export { resolvers };
