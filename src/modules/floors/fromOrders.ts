/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import * as _ from 'lodash';
import { findTokenData, assignFloors } from '../../helpers/floors';
import { FloorsData, ListingData, Order } from 'utils/types';
import { handleError } from '../../helpers/error';
import { default as animalsData } from '../../animals.json';
import { default as farmersData } from '../../farmers.json';

const api = 'https://api.reservoir.tools';
const endpoint = 'orders/asks/v3';
const params = '&includePrivate=false&includeMetadata=true&limit=1000';
const contracts = {
  animals: '0x7f36182dee28c45de6072a34d29855bae76dbe2f',
  farmers: '0xbda2481db91fc0f942ed3f53de378ba45ba9d17e',
  lands: '0x2c88aa0956bc9813505d73575f653f69ada60923',
  pouches: '0xb76fbbb30e31f2c3bdaa2466cfb1cfe39b220d06',
  merch: '0x598c038b10e22bb8fa4d1900435712e6dbe4c1d1',
};

/**
 * Find the right merch token name
 * @param tokenName full token name str
 * @returns short token type
 */
const findMerchName = (tokenName: string): string => {
  switch (tokenName) {
    case 'First Edition WOOLISH Hoodie - 100% Wool':
      return 'Hoodie';
    case 'First Edition WOOLISH Sheep Socks - 100% Wool':
      return 'Sheep Socks';
    case 'First Edition WOOLISH Wolf Socks - 100% Wool':
      return 'Wolf Socks';
    case 'First Edition WOOLISH Hat - 100% Wool':
      return 'Beanie';
    default:
      return '';
  }
};

/**
 * Find the right dataset to use for filtering
 * @param contract token contract address
 * @param tokenName full token name str
 * @returns the dataset to use for filtering, or tokenType
 */
const selectData = (contract: string, tokenName: string) => {
  switch (contract) {
    case contracts.animals:
      return animalsData;
    case contracts.farmers:
      return farmersData;
    case contracts.lands:
      return 'Land';
    case contracts.pouches:
      return 'Pouch';
    case contracts.merch:
      return findMerchName(tokenName);
    default:
      return '';
  }
};

/**
 * Get all token prices from fetched orders
 * @param orders array of orders
 * @returns sanitized tokens array with metadata
 */
const assign = (orders: Order[]): ListingData[] => {
  return orders.map((o) => {
    const tokenId = o.tokenSetId.split(`token:`)[1].split(':')[1];
    const tokenTypeData = selectData(o.contract, o.metadata.data.tokenName);
    const tData = findTokenData(tokenId, tokenTypeData);
    return {
      price: o.price?.amount?.native,
      market: o.source.name,
      ...tData,
    };
  });
};

/**
 * Find the latest minted-pouches count
 */
export const findPouchCount = async (): Promise<string> => {
  const url = `${api}/collections/v5?contract=${contracts.pouches}`;
  try {
    const { data } = await axios.get<{ collections: any[] }>(url);
    return data.collections[0]?.tokenCount || '0';
  } catch (error) {
    handleError(error as any);
    return '0';
  }
};

/**
 * Loop through orders
 * @returns orders array
 */
const getDataPage = async (
  cursor?: string | null,
): Promise<{ orders: Order[]; continuation?: string } | null> => {
  const contractAddys = Object.values(contracts).join('&contracts=');
  const base = `${api}/${endpoint}?contracts=${contractAddys}${params}`;
  const url = cursor ? `${base}&continuation=${cursor}` : base;
  try {
    const { data } = await axios.get<{
      orders: Order[];
      continuation?: string;
    }>(url);
    return data;
  } catch (error) {
    return handleError(error as any);
  }
};

/**
 * Get the orders for all defined contracts
 * @returns orders array
 */
const getData = async (
  listings: Order[] = [],
  cursor: string | null = null,
): Promise<ListingData[] | null> => {
  try {
    const pageData = await getDataPage(cursor);
    if (pageData?.orders) {
      const { orders, continuation } = pageData;
      listings.push(...orders);
      if (continuation) return await getData(listings, continuation);
    }
    return listings ? _.sortBy(assign(listings), (a) => a.price) : null;
  } catch (error) {
    return handleError(error as any);
  }
};

/**
 * Generate floors, supply and listed-counts for all collections
 */
const fromOrders = async (): Promise<FloorsData | null> => {
  const floors = await getData();
  const pouchCount = await findPouchCount();
  const opensea = floors ? floors.filter((f) => f.market == 'OpenSea') : null;
  const unique = _.uniqBy(opensea, (f) => [f.tokenId, f.tokenType].join());
  return opensea ? assignFloors(unique, opensea, parseInt(pouchCount)) : null;
};

export { fromOrders };
