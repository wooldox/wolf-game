/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import axios from 'axios';
import { Token, TokenResponse } from '../utils/types';
import { delay } from '../utils/delay';
import { handleError } from './error';

const api = 'https://api.reservoir.tools/tokens/v5';
const params = 'sortBy=tokenId&limit=100&includeAttributes=true';

/**
 * Fetch all tokens for a collection
 * @param contract contract address
 * @param tokens existing tokens array
 * @param cursor continuation if exists
 * @returns array of fetched tokens
 */
export const getTokens = async (
  contract: string,
  tokens: Token[],
  cursor?: string,
): Promise<TokenResponse | null> => {
  await delay(1000);
  let url = `${api}?contract=${contract}&${params}`;
  if (cursor) url += `&continuation=${cursor}`;
  try {
    const { data } = await axios.get<TokenResponse>(url);
    console.log('Total fetched :>> ', tokens.length);
    if (data?.tokens?.length) tokens.push(...data.tokens);
    if (data.continuation)
      return await getTokens(contract, tokens, data.continuation);
    else return { tokens };
    return { tokens };
  } catch (error) {
    return handleError(error as any);
  }
};
