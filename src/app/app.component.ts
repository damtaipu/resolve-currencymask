import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  ResolveCurrencyMaskDirective,
  ResolveCurrencyMaskInputMode,
} from '../../projects/resolve-currencymask/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ReactiveFormsModule, JsonPipe, ResolveCurrencyMaskDirective],
})
export class AppComponent {
  protected readonly resolveCurrencyMaskOptions = signal({
    prefix: 'R$ ',
    thousands: '.',
    decimal: ',',
    allowNegative: true,
    nullable: true,
    max: 250_000_000,
    inputMode: ResolveCurrencyMaskInputMode.Financial,
  });

  protected readonly resolveCurrencyMaskInputMode =
    ResolveCurrencyMaskInputMode;

  protected readonly form = this.formBuilder.nonNullable.group({
    value: 0,
    inputMode: this.resolveCurrencyMaskOptions().inputMode,
  });

  protected readonly installCommand = 'npm install resolve-currencymask --save';

  protected readonly importExample = `import { ResolveCurrencyMaskDirective } from 'resolve-currencymask';

@Component({
  selector: 'app-root',
  imports: [ResolveCurrencyMaskDirective],
  templateUrl: './app.component.html',
})
export class AppComponent {}`;

  protected readonly templateExample = `<input
  type="text"
  inputmode="decimal"
  resolveCurrencyMask
  formControlName="value"
/>`;

  protected readonly providerExample = `import {
  provideEnvironmentResolveCurrencyMask,
  ResolveCurrencyMaskInputMode,
} from 'resolve-currencymask';

bootstrapApplication(AppComponent, {
  providers: [
    provideEnvironmentResolveCurrencyMask({
      prefix: 'R$ ',
      thousands: '.',
      decimal: ',',
      nullable: true,
      inputMode: ResolveCurrencyMaskInputMode.Financial,
    }),
  ],
});`;

  protected readonly options = [
    {
      name: 'align',
      defaultValue: 'right',
      description: 'Alinhamento do texto dentro do input.',
    },
    {
      name: 'allowNegative',
      defaultValue: 'true',
      description: 'Permite informar valores negativos.',
    },
    {
      name: 'allowZero',
      defaultValue: 'true',
      description: 'Permite manter zero como valor válido.',
    },
    {
      name: 'decimal',
      defaultValue: '.',
      description: 'Separador decimal usado na máscara.',
    },
    {
      name: 'precision',
      defaultValue: '2',
      description: 'Quantidade de casas decimais.',
    },
    {
      name: 'prefix',
      defaultValue: '$ ',
      description: 'Texto exibido antes do valor.',
    },
    {
      name: 'suffix',
      defaultValue: '',
      description: 'Texto exibido depois do valor.',
    },
    {
      name: 'thousands',
      defaultValue: ',',
      description: 'Separador de milhar usado na máscara.',
    },
    {
      name: 'nullable',
      defaultValue: 'false',
      description: 'Retorna null quando o campo estiver vazio.',
    },
    {
      name: 'min / max',
      defaultValue: 'undefined',
      description: 'Define limites mínimo e máximo aceitos.',
    },
    {
      name: 'inputMode',
      defaultValue: 'Financial',
      description: 'Define o comportamento de digitação Financial ou Natural.',
    },
  ];

  constructor(private readonly formBuilder: FormBuilder) {
    this.form.controls.inputMode.valueChanges.subscribe(inputMode => {
      console.log(inputMode)
      this.resolveCurrencyMaskOptions.update(options => ({
        ...options,
        inputMode,
      }));

      // Clear the value input when the input mode is changed.
      this.form.patchValue({ value: 0 });
    });
  }
}
