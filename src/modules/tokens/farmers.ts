import * as fs from 'fs';
import * as _ from 'lodash';
import { Token } from '../../utils/types';
import { getTokens } from '../../helpers/tokens';

const contract = '0xbda2481db91fc0f942ed3f53de378ba45ba9d17e';

/**
 * Fetch farmer tokens and save in a JSON file
 */
const farmers = async (): Promise<void> => {
  const data = await getTokens(contract, []);
  const tokens = data?.tokens.map((t: Token) => {
    const td = t.token;
    const tokenId = td.tokenId;
    const tokenType =
      td.attributes.find((a) => a.key == 'Type')?.value || 'UNK';
    return { tokenId, tokenType };
  });
  fs.writeFileSync('./farmers.json', JSON.stringify(tokens, null, 2));
};

export { farmers };
