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

  constructor(private readonly formBuilder: FormBuilder) {
    this.form.controls.inputMode.valueChanges.subscribe(inputMode => {
      this.resolveCurrencyMaskOptions.update(options => ({
        ...options,
        inputMode,
      }));

      // Clear the value input when the input mode is changed.
      this.form.patchValue({ value: 0 });
    });
  }
}
