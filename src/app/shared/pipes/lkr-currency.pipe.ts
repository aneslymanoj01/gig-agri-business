import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lkrCurrency'
})
export class LkrCurrencyPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined || value === '') {
      return 'LKR 0.00';
    }

    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) {
      return 'LKR 0.00';
    }

    return `LKR ${numValue.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })}`;
  }
}
