import { LogoRegloLettering } from './logo-reglo-lettering'
import { LogoRegloLong } from './logo-reglo-long'
import { LogoRegloSymbol } from './logo-reglo-symbol'

export * from './logo-reglo-lettering'
export * from './logo-reglo-long'
export * from './logo-reglo-symbol'

export const Logo = {
  long: LogoRegloLong,
  symbol: LogoRegloSymbol,
  lettering: LogoRegloLettering,
}
