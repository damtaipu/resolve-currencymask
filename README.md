# resolve-currencymask

[![npm version](https://badge.fury.io/js/resolve-currencymask.png)](http://badge.fury.io/js/resolve-currencymask)
[![GitHub issues](https://img.shields.io/github/issues/nbfontana/resolve-currencymask.png)](https://github.com/nbfontana/resolve-currencymask/issues)
[![GitHub stars](https://img.shields.io/github/stars/nbfontana/resolve-currencymask.png)](https://github.com/nbfontana/resolve-currencymask/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.png)](https://raw.githubusercontent.com/nbfontana/resolve-currencymask/master/LICENSE)

`resolve-currencymask` é um fork do `ng2-currency-mask`/`ngx-currency-mask`. Como melhorias e atualizações sugeridas na lib original não avançaram, este pacote foi atualizado para manter compatibilidade com o Angular 21 e incluir ajustes práticos no comportamento da máscara monetária em campos `<input>`, mantendo o valor do formulário como número.

https://damtaipu.github.io/resolve-currencymask/

- campos de preço, valor, saldo ou limite;
- formulários reativos (`ReactiveFormsModule`);
- aplicações Angular que precisam de configuração local ou global de máscara;
- formatos monetários internacionais, como `R$ 1.234,56` ou `$ 1,234.56`.

- [Getting Started](#getting-started)
- [Documentation](https://damtaipu.github.io/resolve-currencymask/docs/)
- [Development](#development)
- [License](#license)

| Pacote     | Versão suportada |
| ---------- | ---------------- |
| Angular    | `^21.0.0`        |
| RxJS       | `~7.8.1`         |
| TypeScript | `~5.9.3`         |

## Instalação

Install the package by command:

```sh
npm install resolve-currencymask --save
```

## Uso rápido

Importe a diretiva no componente standalone em que o input será usado:

```ts
import { ResolveCurrencyMaskDirective } from "resolve-currencymask";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [ResolveCurrencyMaskDirective],
})
export class PaymentFormComponent {}
```

Use a diretiva `resolveCurrencyMask` no template:

```html
<input type="text" inputmode="decimal" resolveCurrencyMask formControlName="value" />
```

Se o usuário visualizar `$ 25.63`, o valor do controle será `25.63`.

## Configuração local

Passe as opções diretamente para a diretiva quando um campo precisar de uma máscara específica:

```html
<!-- example for pt-BR money -->
<input [resolveCurrencyMask]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }" formControlName="value" />
```

## Configuração global

Use `provideEnvironmentResolveCurrencyMask` para definir um padrão da aplicação:

```ts
import { provideEnvironmentResolveCurrencyMask, ResolveCurrencyMaskInputMode } from 'resolve-currencymask';

bootstrapApplication(AppComponent, {
  providers: [
    ...
    provideEnvironmentResolveCurrencyMask({
      align: "right",
      allowNegative: true,
      allowZero: true,
      decimal: ",",
      precision: 2,
      prefix: "R$ ",
      suffix: "",
      thousands: ".",
      nullable: true,
      min: null,
      max: null,
      inputMode: ResolveCurrencyMaskInputMode.Financial,
    }),
  ],
});
```

As opções locais passadas em `[resolveCurrencyMask]` sobrescrevem a configuração global apenas naquele input.

## Opções disponíveis

| Opção           | Tipo                           | Padrão      | Descrição                                                                 |
| --------------- | ------------------------------ | ----------- | ------------------------------------------------------------------------- |
| `align`         | `string`                       | `'right'`   | Alinhamento do texto no input.                                            |
| `allowNegative` | `boolean`                      | `true`      | Permite valores negativos.                                                |
| `allowZero`     | `boolean`                      | `true`      | Permite zero como valor válido.                                           |
| `decimal`       | `string`                       | `'.'`       | Separador decimal.                                                        |
| `precision`     | `number`                       | `2`         | Quantidade de casas decimais.                                             |
| `prefix`        | `string`                       | `'$ '`      | Texto exibido antes do valor.                                             |
| `suffix`        | `string`                       | `''`        | Texto exibido depois do valor.                                            |
| `thousands`     | `string`                       | `','`       | Separador de milhar.                                                      |
| `nullable`      | `boolean`                      | `false`     | Retorna `null` quando o campo estiver vazio; quando `false`, retorna `0`. |
| `min`           | `number \| null`               | `undefined` | Valor mínimo permitido.                                                   |
| `max`           | `number \| null`               | `undefined` | Valor máximo permitido.                                                   |
| `inputMode`     | `ResolveCurrencyMaskInputMode` | `Financial` | Define como os números digitados são interpretados.                       |

## Modos de entrada

### `ResolveCurrencyMaskInputMode.Financial`

Indicado para comportamento parecido com caixas registradoras. Os números digitados entram a partir das casas decimais e deslocam o valor para a esquerda.

Exemplos com `precision: 2`:

| Digitação | Resultado |
| --------- | --------- |
| `12`      | `0.12`    |
| `1234`    | `12.34`   |
| `1.234`   | `12.34`   |

### `ResolveCurrencyMaskInputMode.Natural`

Indicado para comportamento mais próximo de inputs comuns e planilhas. O usuário digita naturalmente antes e depois do separador decimal.

Exemplos com `precision: 2`:

| Digitação | Resultado |
| --------- | --------- |
| `1234`    | `1234`    |
| `1.234`   | `1.23`    |
| `12.34`   | `12.34`   |
| `123.4`   | `123.40`  |

## API pública

<!-- prettier-ignore -->
```ts
import {
  RESOLVE_CURRENCY_MASK_CONFIG,
  ResolveCurrencyMaskConfig,
  ResolveCurrencyMaskDirective,
  ResolveCurrencyMaskInputMode,
  provideEnvironmentResolveCurrencyMask,
} from "resolve-currencymask";
```

## Desenvolvimento

Instale as dependências locais:

```bash
npm install
```

Inicie a aplicação de desenvolvimento:

```bash
npm start
```

Gere o build da biblioteca:

```bash
npm run build:lib
```

Execute os testes unitários:

```bash
npm test
```

Execute o lint:

```bash
npm run lint
```

## Licença

MIT © Neri Bez Fontana


