import { dinero, convert } from "dinero.js"
import { USD, MXN, EUR, CAD, AUD, SEK, DKK, NOK, JPY, IDR, GBP  } from "@dinero.js/currencies";
import type { Currency, Dinero } from "dinero.js";

const currencyConversionMap: { [currency in AvailableCurrencies]: { [currency in AvailableCurrencies]: number } } = {
  "USD": { "MXN": 18, "EUR": 0.85, "CAD": 1.25, "AUD": 1.35, "SEK": 9, "DKK": 6.5, "USD": 1, "NOK": 8, "JPY": 110, "GBP": 0.75, "IDR": 14000 },
  "MXN": { "USD": 0.05, "EUR": 0.04, "CAD": 0.06, "AUD": 0.07, "SEK": 0.50, "DKK": 0.77, "NOK": 0.63, "JPY": 5.0, "GBP": 0.04, "IDR": 700, "MXN": 1 },
  "CAD": { "USD": 0.80, "EUR": 0.68, "MXN": 16.67, "AUD": 0.90, "SEK": 6.67, "DKK": 4.86, "NOK": 7.50, "JPY": 82.35, "GBP": 0.60, "IDR": 12000, "CAD": 1 },
  "EUR": { "USD": 1.18, "CAD": 1.47, "MXN": 25.00, "AUD": 1.61, "SEK": 11.76, "DKK": 8.57, "NOK": 10.00, "JPY": 117.65, "GBP": 0.88, "IDR": 15000, "EUR": 1},
  "SEK": { "USD": 0.11, "CAD": 0.15, "MXN": 2.00, "EUR": 9.09, "AUD": 0.19, "DKK": 0.73, "NOK": 0.87, "JPY": 9.09, "GBP": 0.07, "IDR": 1500 , "SEK": 1},
  "DKK": { "USD": 0.15, "CAD": 0.21, "MXN": 2.00, "EUR": 11.76, "AUD": 0.25, "SEK": 1.37, "NOK": 1.18, "JPY": 13.33, "GBP": 0.10, "IDR": 2000, "DKK": 1},
  "JPY": { "USD": 0.0091, "CAD": 0.0121, "MXN": 0.20, "EUR": 0.0085, "AUD": 0.013, "SEK": 0.11, "DKK": 0.075, "NOK": 0.090, "GBP": 0.0073, "IDR": 150, "JPY": 1 },
  "IDR": { "USD": 0.0000714, "CAD": 0.0000833, "MXN": 0.0000143, "EUR": 0.0000667, "AUD": 0.0000714, "SEK": 0.0006667, "DKK": 0.0005, "NOK": 0.0005882, "JPY": 0.0067, "GBP": 0.0000667, "IDR": 1 },
  "NOK": { "USD": 0.13, "CAD": 0.20, "MXN": 1.25, "EUR": 10.00, "AUD": 0.21, "SEK": 1.09, "DKK": 0.85, "JPY": 11.11, "GBP": 0.08, "IDR": 1700, "NOK": 1 },
  "GBP": {"USD": 1.31, "CAD": 1.73, "MXN": 25.63, "EUR": 1.16, "AUD": 1.84, "SEK": 11.47, "DKK": 8.51, "JPY": 148.20, "GBP": 1, "IDR": 18249.30, "NOK": 13.5 },
  "AUD": { "USD": 0.60, "CAD": 0.34, "MXN": 1.19, "EUR": 4.76, "AUD": 1, "SEK": 4.76, "DKK": 4.76, "JPY": 52.86, "GBP": 0.54, "IDR": 8095.24, "NOK": 4.76 }
}

class Currencies {
  private currencies: Currency<number>[]
  constructor () {
    this.currencies = [USD, MXN, EUR, CAD, AUD, SEK, DKK, NOK, JPY, IDR, GBP]
  }
  
  setDineroObject (amount: number, currency: AvailableCurrencies) {
    for (const x of this.currencies) {
      if (x.code === currency) {
        return dinero({ amount, currency: x })
      }
    }
  }

  private setRate (currency: AvailableCurrencies, amount: number) {
    return { [`${currency}`]: { amount, scale: 2 } }
  }

  conversion (from: Dinero<number>, to: AvailableCurrencies): number {
    // had to any
    let convertedAmount: any
    const currentCurrency = from.toJSON().currency.code
    const converted = currencyConversionMap[currentCurrency as AvailableCurrencies]
    // O(n^2) solution you guys can improve it if you want
    
    for (const x in converted) {
      if (to === x) {
        const rate = this.setRate(x, converted[x])
        for (const k of this.currencies) {
          if (k.code === to) {
            convertedAmount = convert(from, k, rate)
          }
        }
      }
    }
    // when you do the conversion you will get something as 
    // {
    //   amount: 90000,
    //   currency: { code: 'MXN', base: 10, exponent: 2 },
    //   scale: 4
    // } 
    // it seems like it adds an extra 0 which is supposed to be a decimal for whatever reason but, other than that it is accurate.
    // 9k mexican pesos / 500 dollars = 18 pesos and 18 * 500 = 9k
    if (!convertedAmount) throw new Error("Could not convert!")
    return convertedAmount.toJSON().amount as number
  }
}

export default new Currencies()
