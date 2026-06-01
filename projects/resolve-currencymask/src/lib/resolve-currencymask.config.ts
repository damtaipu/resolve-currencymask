import { InjectionToken } from '@angular/core';

export interface ResolveCurrencyMaskConfig {
  align: string;
  allowNegative: boolean;
  allowZero: boolean;
  decimal: string;
  precision: number;
  prefix: string;
  suffix: string;
  thousands: string;
  nullable: boolean;
  min?: number | null;
  max?: number | null;
  inputMode?: ResolveCurrencyMaskInputMode;
}

export enum ResolveCurrencyMaskInputMode {
  Financial,
  Natural,
}

export const RESOLVE_CURRENCY_MASK_CONFIG = new InjectionToken<
  Partial<ResolveCurrencyMaskConfig>
>('resolve-currencymask.config');
