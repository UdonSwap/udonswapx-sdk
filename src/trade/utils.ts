import { constants } from "ethers";
import { ChainId, Currency } from "udonswap-sdk-core";

export enum NativeAssets {
  MATIC = "MATIC",
  BNB = "BNB",
  AVAX = "AVAX",
  ETH = "ETH",
}

function nativeCurrencyAddressString(chainId: number): string {
  switch (chainId) {
    case ChainId.POLYGON:
      return NativeAssets.MATIC;
    case ChainId.BNB:
      return NativeAssets.BNB;
    case ChainId.AVALANCHE:
      return NativeAssets.AVAX;
    default:
      return NativeAssets.ETH;
  }
}

export function areCurrenciesEqual(
  currency: Currency,
  address: string | null,
  chainId: number
) {
  if (currency.chainId !== chainId) return false;

  if (currency.isNative) {
    return (
      address === constants.AddressZero ||
      address === nativeCurrencyAddressString(chainId)
    );
  }

  return currency.address.toLowerCase() === address?.toLowerCase();
}
