import { InputService } from './input.service';
import {
  ResolveCurrencyMaskConfig,
  ResolveCurrencyMaskInputMode,
} from './resolve-currencymask.config';

describe('ResolveCurrencyMaskConfig', () => {
  let globalOptions: ResolveCurrencyMaskConfig;
  let inputService: InputService;

  beforeEach(() => {
    globalOptions = {
      align: 'right',
      allowNegative: false,
      allowZero: true,
      decimal: ',',
      precision: 2,
      prefix: 'R$ ',
      suffix: '',
      thousands: '.',
      nullable: false,
      inputMode: ResolveCurrencyMaskInputMode.Financial,
    };

    inputService = new InputService(null!, globalOptions);
  });

  it('should return null because the nullable parameterization is true', () => {
    const option = {
      ...globalOptions,
      nullable: true,
    };
    inputService.updateOptions(option);
    inputService.value = null;
    expect(inputService.clearMask('')).toEqual(null);
  });

  it('should return zero because the nullable parameterization is false', () => {
    const option = {
      ...globalOptions,
      nullable: false,
    };
    inputService.updateOptions(option);
    inputService.value = null;
    expect(inputService.clearMask('')).toEqual(0);
  });
});
