import * as fs from 'fs';
import { Attribute, Token } from '../../utils/types';
import { getTokens } from '../../helpers/tokens';

const contract = '0x2c88aa0956bc9813505d73575f653f69ada60923';

/**
 * Find a token attribute value
 * @param type
 * @param attributes
 * @returns
 */
const findAttr = (type: string, attributes: Attribute[]): string | null => {
  return attributes.find((a) => a.key == type)?.value || null;
};

/**
 * Assign an attribute value to a group
 * @param value
 * @returns
 */
const findGroup = (value: number): string | null => {
  if (value && value !== 0) {
    if (value < 101) return '0-100';
    if (value < 201) return '101-200';
    if (value < 301) return '201-300';
    if (value < 351) return '301-350';
    return '351-400';
  }
  return null;
};

/**
 * Assign a community to a group
 * @param value
 * @returns
 */
const findCommunity = (value: string): string | null => {
  if (value === '0') return '0';
  if (parseInt(value) < 11) return '1-10';
  if (parseInt(value) < 21) return '11-20';
  if (parseInt(value) < 31) return '21-30';
  if (parseInt(value) < 41) return '31-40';
  if (parseInt(value) < 51) return '41-50';
  if (parseInt(value) < 61) return '51-60';
  if (parseInt(value) < 71) return '61-70';
  if (parseInt(value) < 81) return '71-80';
  if (parseInt(value) < 91) return '81-90';
  return '91-100';
};

/**
 * Fetch land tokens and save in a JSON file
 */
const lands = async (): Promise<void> => {
  const data = await getTokens(contract, []);
  const tokens = data?.tokens.map((t: Token) => {
    const td = t.token;
    const tokenImage = td.image;
    const tokenId = td.tokenId;
    const tokenType = 'UNK';
    const aWood = findAttr('Wood', td.attributes);
    const aStone = findAttr('Stone', td.attributes);
    const aStructures = findAttr('Structures', td.attributes);
    const aWater = findAttr('Water', td.attributes);
    const aGrass = findAttr('Grass', td.attributes);
    const aCommunity = findAttr('Community', td.attributes);
    const aWoodGroup = aWood && findGroup(parseInt(aWood));
    const aStoneGroup = aStone && findGroup(parseInt(aStone));
    const aStructuresGroup = aStructures && findGroup(parseInt(aStructures));
    const aWaterGroup = aWater && findGroup(parseInt(aWater));
    const aGrassGroup = aGrass && findGroup(parseInt(aGrass));
    const aCommunityGroup = findCommunity(aCommunity as string);
    const tokenAttr = {
      aWood,
      aStone,
      aStructures,
      aWater,
      aGrass,
      aCommunity,
    };
    const tokenAttrGroup = {
      aWoodGroup,
      aStoneGroup,
      aStructuresGroup,
      aWaterGroup,
      aGrassGroup,
      aCommunityGroup,
    };
    return { tokenId, tokenImage, tokenType, tokenAttr, tokenAttrGroup };
  });
  fs.writeFileSync('./lands.json', JSON.stringify(tokens, null, 2));
};

export { lands };
