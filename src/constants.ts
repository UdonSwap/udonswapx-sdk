import { ChainId } from "udonswap-sdk-core";

type AddressMap = { readonly [key: number]: string };

const NETWORKS_WITH_SAME_ADDRESS: ChainId[] = [
  ChainId.MAINNET,
  ChainId.GOERLI,
  ChainId.POLYGON,
];

export function constructSameAddressMap<T>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return NETWORKS_WITH_SAME_ADDRESS.concat(additionalNetworks).reduce<{
    [chainId: number]: T;
  }>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}

export const PERMIT2_MAPPING: AddressMap = {
  ...constructSameAddressMap("0x000000000022d473030f116ddee9f6b43ac78ba3"),
  11155111: "0x000000000022d473030f116ddee9f6b43ac78ba3",
  12341234: "0x000000000022d473030f116ddee9f6b43ac78ba3",
  919:"0xb36E4b925745E07D53F22a6F7e281fefEB40bCd6",
};

export const UNISWAPX_ORDER_QUOTER_MAPPING: AddressMap = {
  ...constructSameAddressMap("0x54539967a06Fc0E3C3ED0ee320Eb67362D13C5fF"),
  11155111: "0xAA6187C48096e093c37d2cF178B1e8534A6934f7",
  12341234: "0xbea0901A41177811b099F787D753436b2c47690E",
  919: "0x93D9A2733Aa41b8cB986173b1a4Ba89F7E4E01b6",
};

export const EXCLUSIVE_FILLER_VALIDATION_MAPPING: AddressMap = {
  ...constructSameAddressMap("0x8A66A74e15544db9688B68B06E116f5d19e5dF90"),
  5: "0x0000000000000000000000000000000000000000",
  11155111: "0x0000000000000000000000000000000000000000",
  919: "0x0000000000000000000000000000000000000000",
  12341234: "0x8A66A74e15544db9688B68B06E116f5d19e5dF90",
};

export enum KNOWN_EVENT_SIGNATURES {
  ERC20_TRANSFER = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
}

export enum OrderType {
  Dutch = "Dutch",
  Relay = "Relay",
  Dutch_V2 = "Dutch_V2",
  Limit = "Limit",
}

type Reactors = Partial<{
  [key in OrderType]: string;
}>;

type ReactorMapping = { readonly [key: number]: Reactors };
type ReverseReactorMapping = {
  [key: string]: { orderType: OrderType };
};

export const REACTOR_ADDRESS_MAPPING: ReactorMapping = {
  ...constructSameAddressMap({
    [OrderType.Dutch]: "0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4",
    [OrderType.Dutch_V2]: "0x0000000000000000000000000000000000000000",
    [OrderType.Relay]: "0x0000000000A4e21E2597DCac987455c48b12edBF",
  }),
  //test contract is only on mainnet
  1: {
    [OrderType.Dutch]: "0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4",
    [OrderType.Dutch_V2]: "0x3867393cC6EA7b0414C2c3e1D9fe7cEa987Fd066",
    [OrderType.Relay]: "0x0000000000A4e21E2597DCac987455c48b12edBF",
  },
  12341234: {
    [OrderType.Dutch]: "0xbD7F9D0239f81C94b728d827a87b9864972661eC",
    [OrderType.Dutch_V2]: "0x0000000000000000000000000000000000000000",
    [OrderType.Relay]: "0x0000000000A4e21E2597DCac987455c48b12edBF",
  },
  11155111: {
    [OrderType.Dutch_V2]: "0x0e22B6638161A89533940Db590E67A52474bEBcd",
    [OrderType.Dutch]: "0xD6c073F2A3b676B8f9002b276B618e0d8bA84Fad",
    [OrderType.Relay]: "0x0000000000A4e21E2597DCac987455c48b12edBF",
  },
  919: {
    [OrderType.Dutch_V2]: "0x39c179294452ECa0a8E4A93bD18891Aa7185C412",
    [OrderType.Dutch]: "0x239E57B90494Ee6b050293887BAab0BF6Da75879",
    [OrderType.Relay]: "0xa7b87159B62C05C1541f0Fd67209736794018Bb6",
  },
};

// aliasing for backwards compatibility
export const REACTOR_CONTRACT_MAPPING: ReactorMapping = REACTOR_ADDRESS_MAPPING;

// https://github.com/mds1/multicall
export const MULTICALL_ADDRESS = "0x936b963D782216249AEb160bCCBebB7d1610B121";

export const RELAY_SENTINEL_RECIPIENT =
  "0x0000000000000000000000000000000000000000";

export const REVERSE_REACTOR_MAPPING: ReverseReactorMapping = Object.entries(
  REACTOR_ADDRESS_MAPPING
).reduce((acc: ReverseReactorMapping, [_, orderTypes]) => {
  for (const [orderType, reactorAddress] of Object.entries(orderTypes)) {
    // lowercase for consistency when parsing orders
    acc[reactorAddress.toLowerCase()] = {
      orderType: OrderType[orderType as keyof typeof OrderType],
    };
  }

  return acc;
}, {});

export const BPS = 10000;
