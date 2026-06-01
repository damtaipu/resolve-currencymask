import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import {
  RESOLVE_CURRENCY_MASK_CONFIG,
  ResolveCurrencyMaskConfig,
} from './resolve-currencymask.config';

export function provideEnvironmentResolveCurrencyMask(
  config: Partial<ResolveCurrencyMaskConfig>,
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: RESOLVE_CURRENCY_MASK_CONFIG,
      useValue: config,
    },
  ]);
}
