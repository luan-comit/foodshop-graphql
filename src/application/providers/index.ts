import { setupDb } from '../database';

import { SideDishProvider } from './sideDishes/sideDish.provider';

import { BrokenRiceProvider } from './brokenRices/brokenRice.provider';

const db = setupDb();

const brokenRiceProvider = new BrokenRiceProvider(db.collection('brokenRices'));

const sideDishProvider = new SideDishProvider(db.collection('sideDishes'));

export { brokenRiceProvider, sideDishProvider };
