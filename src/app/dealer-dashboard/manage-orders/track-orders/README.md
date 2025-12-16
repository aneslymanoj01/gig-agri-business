# Dealer Track Orders Component

## Overview
This component allows dealers to track their order status and delivery progress using the order ID.

## Features
- **Order Search**: Search by order ID
- **Order Status**: Display current order status (PENDING, APPROVED, DELIVERED, etc.)
- **Workflow Progress**: Visual timeline showing order progress through different stages
- **Order Details**: Show total amount, item count, and delivery address
- **Delivery Information**: Display driver details and estimated delivery (when available)

## API Integration
- **Endpoint**: `GET /pohoro-operations-service/operations/orders/{orderid}/track/{dealerid}`
- **Authentication**: Uses JWT token to extract dealer ID (entityId)
- **Response**: Returns order tracking data with workflow progress

## Workflow Stages
1. **Order Placed**: Order has been submitted
2. **Order Approved**: Distributor has approved the order
3. **Assigned to Delivery**: Order assigned to delivery team
4. **Out for Delivery**: Order is being delivered
5. **Delivered**: Order has been delivered
6. **Confirmed**: Order delivery confirmed

## Usage
1. Navigate to Dealer Dashboard → Manage Orders → Track My Order
2. Enter the order ID in the search field
3. Click "Search" or press Enter
4. View the order status and progress timeline

## Components
- `track-orders.component.ts`: Main component logic
- `track-orders.component.html`: Template with search and results display
- `track-orders.component.scss`: Styling with responsive design

## Error Handling
- Invalid order ID validation
- API error handling with user-friendly messages
- Loading states during API calls
