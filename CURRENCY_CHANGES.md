# Currency Changes: Indian Rupee (₹) to Sri Lankan Rupee (LKR)

## Overview
This document outlines the changes made to convert the currency display from Indian Rupee (₹) to Sri Lankan Rupee (LKR) throughout the Angular application.

## Files Modified

### HTML Templates
1. **Dealer Dashboard - New Order Component**
   - `/src/app/dealer-dashboard/manage-orders/new-order/new-order.component.html`
   - Changed: `₹{{ amount }}` → `LKR {{ amount }}`

2. **Dealer Dashboard - Track Orders Component**
   - `/src/app/dealer-dashboard/manage-orders/track-orders/track-orders.component.html`
   - Changed: `₹{{ amount }}` → `LKR {{ amount }}`

3. **Dealer Dashboard - View Orders Component**
   - `/src/app/dealer-dashboard/manage-orders/view-orders/view-orders.component.html`
   - Changed: `₹{{ amount }}` → `LKR {{ amount }}`

4. **Distributor Dashboard - Inventory Component**
   - `/src/app/distributor-dashboard/inventory/inventory.component.html`
   - Changed: `${{ amount }}` → `LKR {{ amount }}`

5. **Distributor Dashboard - Approve/Reject Orders Component**
   - `/src/app/distributor-dashboard/manage-orders/approve-reject-orders/approve-reject-orders.component.html`
   - Changed: `${{ amount }}` → `LKR {{ amount }}`

6. **Distributor Dashboard - Assign Delivery Component**
   - `/src/app/distributor-dashboard/manage-orders/assign-delivery/assign-delivery.component.html`
   - Changed: `${{ amount }}` → `LKR {{ amount }}`

7. **Distributor Dashboard - View Orders Component**
   - `/src/app/distributor-dashboard/manage-orders/view-orders/view-orders.component.html`
   - Changed: `${{ amount }}` → `LKR {{ amount }}`

8. **Distributor Dashboard - Create Purchase Order Component**
   - `/src/app/distributor-dashboard/purchase-orders/create-purchase-order/create-purchase-order.component.html`
   - Changed: `${{ amount }}` → `LKR {{ amount }}`

9. **Distributor Dashboard - Track Orders Component**
   - `/src/app/distributor-dashboard/track-orders/track-orders.component.html`
   - Changed: `₹{{ amount }}` → `LKR {{ amount }}`

10. **Master Dashboard - Search Product Component**
    - `/src/app/dashboard/products/search-product/search-product.component.html`
    - Changed: `${{ amount }}` → `LKR {{ amount }}`

### New Services and Pipes Created

1. **Currency Service**
   - `/src/app/shared/services/currency.service.ts`
   - Provides centralized currency formatting methods
   - Methods: `formatAmount()`, `getCurrencyCode()`, `getCurrencySymbol()`

2. **LKR Currency Pipe**
   - `/src/app/shared/pipes/lkr-currency.pipe.ts`
   - Custom pipe for consistent LKR formatting
   - Usage: `{{ amount | lkrCurrency }}`

3. **App Module Updates**
   - `/src/app/app.module.ts`
   - Added CurrencyService to providers
   - Added LkrCurrencyPipe to declarations

## Usage Examples

### Before (Indian Rupee)
```html
<span>₹{{ item.unitPrice }}</span>
<span>${{ order.totalAmount }}</span>
```

### After (Sri Lankan Rupee)
```html
<span>LKR {{ item.unitPrice }}</span>
<span>LKR {{ order.totalAmount }}</span>
```

### Using the New Pipe (Recommended)
```html
<span>{{ item.unitPrice | lkrCurrency }}</span>
<span>{{ order.totalAmount | lkrCurrency }}</span>
```

### Using the Currency Service
```typescript
import { CurrencyService } from '../shared/services/currency.service';

constructor(private currencyService: CurrencyService) {}

formatPrice(amount: number): string {
  return this.currencyService.formatAmount(amount);
}
```

## Benefits of the New Approach

1. **Consistency**: All currency displays now use LKR format
2. **Maintainability**: Centralized currency service makes future changes easier
3. **Formatting**: Proper number formatting with thousands separators and decimal places
4. **Reusability**: Custom pipe can be used throughout the application

## Future Enhancements

1. **Internationalization**: The currency service can be extended to support multiple currencies
2. **Configuration**: Currency settings can be moved to a configuration file
3. **Localization**: Number formatting can be adjusted based on Sri Lankan locale preferences

## Testing

After implementing these changes, verify:
1. All price displays show "LKR" instead of "₹" or "$"
2. Number formatting is consistent across all components
3. No broken currency displays in any dashboard
4. The application builds and runs without errors

## Notes

- The changes maintain the existing data structure and only affect the display layer
- Backend API responses remain unchanged
- All mathematical calculations continue to work as before
- The currency symbol change is purely cosmetic and doesn't affect business logic
