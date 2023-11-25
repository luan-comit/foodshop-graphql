import * as Lodash from 'lodash';

import { sideDishResolver } from './sideDish.resolver';

import { brokenRiceResolver } from './brokenRice.resolver';

const resolvers = Lodash.merge(sideDishResolver, brokenRiceResolver);

export { resolvers };
