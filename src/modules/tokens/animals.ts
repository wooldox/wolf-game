import * as fs from 'fs';
import { Token } from '../../utils/types';
import { getTokens } from '../../helpers/tokens';

const contract = '0x7f36182dee28c45de6072a34d29855bae76dbe2f';

/**
 * Fetch animal tokens and save in a JSON file
 */
const animals = async (): Promise<void> => {
  const data = await getTokens(contract, []);
  const tokens = data?.tokens.map((t: Token) => {
    const td = t.token;
    const tokenId = td.tokenId;
    const tokenImage = td.image;
    const tokenType =
      td.attributes.find((a) => a.key == 'Type')?.value || 'UNK';
    const tokenGen =
      td.attributes.find((a) => a.key == 'Generation')?.value || 'UNK';
    const tokenAlpha =
      td.attributes.find((a) => a.key == 'Alpha Score')?.value || 'UNK';
    return { tokenId, tokenImage, tokenType, tokenGen, tokenAlpha };
  });
  fs.writeFileSync('./animals.json', JSON.stringify(tokens, null, 2));
};

export { animals };
