export interface Order {
  id: string;
  kind: string;
  side: string;
  status: string;
  tokenSetId: string;
  tokenSetSchemaHash: string;
  contract: string;
  maker: string;
  taker: string;
  price: Price;
  validFrom: number;
  validUntil: number;
  metadata: {
    kind: string;
    data: {
      collectionName: string;
      tokenName: string;
      image: string;
    };
  };
  source: DataSource;
  feeBps: number;
  feeBreakdown: [
    {
      bps: number;
      kind: string;
      recipient: string;
    },
    {
      bps: number;
      kind: string;
      recipient: string;
    },
  ];
  expiration: number;
  isReservoir: null;
  createdAt: string;
  updatedAt: string;
}

export interface Price {
  currency: {
    contract: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  amount: {
    raw: string;
    decimal: number;
    usd: number;
    native: number;
  };
  netAmount: {
    raw: string;
    decimal: number;
    usd: number;
    native: number;
  };
}

export interface DataSource {
  id: string;
  name: string;
  icon: string;
  url: string;
}

export interface Attribute {
  key: string;
  value: string;
  tokenCount: number;
  onSaleCount: number;
  floorAskPrice: number;
  topBidValue: number;
}

export interface Token {
  token: {
    contract: string;
    tokenId: string;
    name: string;
    description: string;
    image: string;
    attributes: Attribute[];
  };
  market: {
    floorAsk: {
      id: string;
      price: Price;
      maker: string;
      validFrom: number;
      validUntil: number;
      source: DataSource;
    };
  };
}

export interface TokenResponse {
  tokens: Token[];
  continuation?: string;
}

export interface TokenData {
  tokenId: string;
  tokenType: string;
  tokenGen?: string;
  tokenAlpha?: string;
}

export interface ListingData extends TokenData {
  tokenId: string;
  price: number;
  market?: string;
}

export interface AssetData {
  floor: number | null;
  supply: number;
  listed: number;
}

export type FloorsData = {
  [key in TokenType]: AssetData;
};

export type TokenType =
  | 'genZeroSheep'
  | 'genOneSheep'
  | 'genZeroA5'
  | 'genZeroA6'
  | 'genZeroA7'
  | 'genZeroA8'
  | 'genOneA5'
  | 'genOneA6'
  | 'genOneA7'
  | 'genOneA8'
  | 'farmerAvgJoe'
  | 'farmerDiesel'
  | 'farmerKid'
  | 'farmerJane'
  | 'farmerHundred'
  | 'farmerMama'
  | 'farmerDaddy'
  | 'lands'
  | 'pouches'
  | 'merchSheepSocks'
  | 'merchWolfSocks'
  | 'merchBeanie'
  | 'merchHoodie';
