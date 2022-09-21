/* eslint-disable no-console */
import { floors } from './modules/floors';
import { tokens } from './modules/tokens';
import minimist from 'minimist';

(async () => {
  try {
    const args = minimist(process.argv.slice(2));
    console.time('runTime');
    if (args.tokens) {
      if (args.tokens == 'animals') {
        console.info('fetching latest animal tokens');
        await tokens.animals();
        console.info('tokens data saved in animals.json');
      }
      if (args.tokens == 'farmers') {
        console.info('fetching latest farmer tokens');
        await tokens.farmers();
        console.info('tokens data saved in farmers.json');
      }
      if (args.tokens == 'lands') {
        console.info('fetching latest land tokens');
        await tokens.lands();
        console.info('tokens data saved in lands.json');
      }
    } else {
      console.log('fetching floor prices');
      const floorData = await floors.fromOrders();
      console.table(floorData);
    }
    console.timeEnd('runTime');
  } catch (error) {
    console.error('unknown error', error);
  }
})();
