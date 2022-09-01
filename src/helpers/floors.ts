import { ListingData, TokenData, FloorsData } from 'utils/types';
import { default as animalsData } from '../animals.json';
import { default as farmersData } from '../farmers.json';

/**
 * Find token metadata
 * @param tokenId id
 * @param tokensData fetched token data or token type
 * @returns token metadata or correct token type
 */
export const findTokenData = (
  tokenId: string,
  tokensData: TokenData[] | string,
): TokenData => {
  if (typeof tokensData == 'string') return { tokenId, tokenType: tokensData };
  const tData = tokensData.find((td) => td.tokenId == tokenId);
  if (tData && tData.tokenType) return tData;
  else return { tokenId, tokenType: 'UNK', tokenGen: 'UNK', tokenAlpha: 'UNK' };
};

/**
 * Filter animal only orders
 * @param floors orders array
 * @param tGen animal gen to search for
 * @param tType animal type to search for
 * @returns matching orders
 */
const filterAnimals = (
  floors: ListingData[],
  tGen: string,
  tType: 'Sheep' | 'Wolf',
): ListingData[] => {
  return floors?.filter(
    (f) => f.tokenType == tType && f.tokenGen == `Gen ${tGen}`,
  );
};

/**
 * Filter farmers only orders
 * @param floors orders array
 * @param tType farmer type to search for
 * @returns matching orders
 */
const filterFarmers = (floors: ListingData[], tType: string): ListingData[] => {
  return floors?.filter((f) => f.tokenType == tType);
};

/**
 * Find total supply of collection
 * @param tokens fetched animal and farmer tokens data
 * @param type token type
 * @param gen if animal, the generation
 * @param alpha if wolf, the alpha score
 */
export const findSupply = (
  tokens: TokenData[],
  type: string,
  gen?: '0' | '1',
  alpha?: string,
): number => {
  let filtered = tokens.filter((td) => td.tokenType == type);
  if (gen) filtered = filtered.filter((td) => td.tokenGen == `Gen ${gen}`);
  if (alpha) filtered = filtered.filter((td) => td.tokenAlpha == alpha);
  return filtered.length;
};

/**
 * Process orders to find floors and listed-couns
 * @param floorsOS OpenSea-only filtered orders
 * @param floors all orders, needed to find merch listed counts
 * @param pouchCount total count of minted pouches (dynamic)
 * @returns all relevant floors, supplies and listed-counts
 */
export const assignFloors = (
  floorsOS: ListingData[],
  floors: ListingData[],
  pouchCount: number,
): FloorsData => {
  const tokens = [...animalsData, ...farmersData];
  const genZeroSheep = filterAnimals(floorsOS, '0', 'Sheep');
  const genOneSheep = filterAnimals(floorsOS, '1', 'Sheep');
  const genZeroWolf = filterAnimals(floorsOS, '0', 'Wolf');
  const genOneWolf = filterAnimals(floorsOS, '1', 'Wolf');
  const genZeroA5 = genZeroWolf.filter((f) => f.tokenAlpha == '5');
  const genZeroA6 = genZeroWolf.filter((f) => f.tokenAlpha == '6');
  const genZeroA7 = genZeroWolf.filter((f) => f.tokenAlpha == '7');
  const genZeroA8 = genZeroWolf.filter((f) => f.tokenAlpha == '8');
  const genOneA5 = genOneWolf.filter((f) => f.tokenAlpha == '5');
  const genOneA6 = genOneWolf.filter((f) => f.tokenAlpha == '6');
  const genOneA7 = genOneWolf.filter((f) => f.tokenAlpha == '7');
  const genOneA8 = genOneWolf.filter((f) => f.tokenAlpha == '8');
  const farmerAvgJoe = filterFarmers(floorsOS, 'Average Joe');
  const farmerDiesel = filterFarmers(floorsOS, 'Diesel');
  const farmerKid = filterFarmers(floorsOS, 'The Kid');
  const farmerJane = filterFarmers(floorsOS, 'Above Average Jane');
  const farmerHundred = filterFarmers(floorsOS, 'Hundred Years');
  const farmerMama = filterFarmers(floorsOS, 'Big Mama');
  const farmerDaddy = filterFarmers(floorsOS, 'Big Daddy');
  const lands = floorsOS.filter((f) => f.tokenType == 'Land');
  const pouches = floorsOS.filter((f) => f.tokenType == 'Pouch');
  const merchSheepSocks = floors.filter((f) => f.tokenType == 'Sheep Socks');
  const merchWolfSocks = floors.filter((f) => f.tokenType == 'Wolf Socks');
  const merchBeanie = floors.filter((f) => f.tokenType == 'Beanie');
  const merchHoodie = floors.filter((f) => f.tokenType == 'Hoodie');
  return {
    genZeroSheep: {
      floor: genZeroSheep[0]?.price || null,
      supply: findSupply(tokens, 'Sheep', '0'),
      listed: genZeroSheep.length,
    },
    genOneSheep: {
      floor: genOneSheep[0]?.price || null,
      supply: findSupply(tokens, 'Sheep', '1'),
      listed: genOneSheep.length,
    },
    genZeroA5: {
      floor: genZeroA5[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '0', '5'),
      listed: genZeroA5.length,
    },
    genZeroA6: {
      floor: genZeroA6[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '0', '6'),
      listed: genZeroA6.length,
    },
    genZeroA7: {
      floor: genZeroA7[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '0', '7'),
      listed: genZeroA7.length,
    },
    genZeroA8: {
      floor: genZeroA8[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '0', '8'),
      listed: genZeroA8.length,
    },
    genOneA5: {
      floor: genOneA5[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '1', '5'),
      listed: genOneA5.length,
    },
    genOneA6: {
      floor: genOneA6[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '1', '6'),
      listed: genOneA6.length,
    },
    genOneA7: {
      floor: genOneA7[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '1', '7'),
      listed: genOneA7.length,
    },
    genOneA8: {
      floor: genOneA8[0]?.price || null,
      supply: findSupply(tokens, 'Wolf', '1', '8'),
      listed: genOneA8.length,
    },
    farmerAvgJoe: {
      floor: farmerAvgJoe[0]?.price || null,
      supply: findSupply(tokens, 'Average Joe'),
      listed: farmerAvgJoe.length,
    },
    farmerDiesel: {
      floor: farmerDiesel[0]?.price || null,
      supply: findSupply(tokens, 'Diesel'),
      listed: farmerDiesel.length,
    },
    farmerKid: {
      floor: farmerKid[0]?.price || null,
      supply: findSupply(tokens, 'The Kid'),
      listed: farmerKid.length,
    },
    farmerJane: {
      floor: farmerJane[0]?.price || null,
      supply: findSupply(tokens, 'Above Average Jane'),
      listed: farmerJane.length,
    },
    farmerHundred: {
      floor: farmerHundred[0]?.price || null,
      supply: findSupply(tokens, 'Hundred Years'),
      listed: farmerHundred.length,
    },
    farmerMama: {
      floor: farmerMama[0]?.price || null,
      supply: findSupply(tokens, 'Big Mama'),
      listed: farmerMama.length,
    },
    farmerDaddy: {
      floor: farmerDaddy[0]?.price || null,
      supply: findSupply(tokens, 'Big Daddy'),
      listed: farmerDaddy.length,
    },
    lands: {
      floor: lands[0]?.price || null,
      supply: 20000,
      listed: lands.length,
    },
    pouches: {
      floor: pouches[0]?.price || null,
      supply: pouchCount,
      listed: pouches.length,
    },
    merchSheepSocks: {
      floor: merchSheepSocks[0]?.price || null,
      supply: 1852,
      listed: merchSheepSocks.length,
    },
    merchWolfSocks: {
      floor: merchWolfSocks[0]?.price || null,
      supply: 1386,
      listed: merchWolfSocks.length,
    },
    merchBeanie: {
      floor: merchBeanie[0]?.price || null,
      supply: 948,
      listed: merchBeanie.length,
    },
    merchHoodie: {
      floor: merchHoodie[0]?.price || null,
      supply: 486,
      listed: merchHoodie.length,
    },
  };
};
