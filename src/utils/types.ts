export type Order = {
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
};

export type Price = {
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
};

export type DataSource = {
  id: string;
  name: string;
  icon: string;
  url: string;
};

export type Attribute = {
  key: string;
  value: string;
  tokenCount: number;
  onSaleCount: number;
  floorAskPrice: number;
  topBidValue: number;
};

export type Token = {
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
};

export type TokenResponse = {
  tokens: Token[];
  continuation?: string;
};

export type TokenData = {
  tokenId: string;
  tokenType: string;
  tokenGen?: string;
  tokenAlpha?: string;
};

export interface ListingData extends TokenData {
  tokenId: string;
  price: number;
  market?: string;
}

export type AssetData = {
  floor: number | null;
  supply: number;
  listed: number;
};

export type FloorsData = {
  genZeroSheep: AssetData;
  genOneSheep: AssetData;
  genZeroA5: AssetData;
  genZeroA6: AssetData;
  genZeroA7: AssetData;
  genZeroA8: AssetData;
  genOneA5: AssetData;
  genOneA6: AssetData;
  genOneA7: AssetData;
  genOneA8: AssetData;
  farmerAvgJoe: AssetData;
  farmerDiesel: AssetData;
  farmerKid: AssetData;
  farmerJane: AssetData;
  farmerHundred: AssetData;
  farmerMama: AssetData;
  farmerDaddy: AssetData;
  lands: AssetData;
  pouches: AssetData;
  merchSheepSocks: AssetData;
  merchWolfSocks: AssetData;
  merchBeanie: AssetData;
  merchHoodie: AssetData;
};
