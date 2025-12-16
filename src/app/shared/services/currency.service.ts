import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly currencyCode = 'LKR';
  private readonly currencySymbol = 'LKR';

  constructor() { }

  /**
   * Format amount with currency symbol
   * @param amount - The amount to format
   * @returns Formatted currency string
   */
  formatAmount(amount: number): string {
    return `${this.currencySymbol} ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  /**
   * Get currency code
   * @returns Currency code (LKR)
   */
  getCurrencyCode(): string {
    return this.currencyCode;
  }

  /**
   * Get currency symbol
   * @returns Currency symbol (LKR)
   */
  getCurrencySymbol(): string {
    return this.currencySymbol;
  }
}
