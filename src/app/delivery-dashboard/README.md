# Delivery Dashboard

## Overview
The Delivery Dashboard is designed for delivery team members to manage their assigned orders and update delivery status.

## Features

### 🚚 **Manage Orders**
- **View Assigned Orders**: Display all orders assigned to the delivery team
- **Order Details**: Show dealer information, delivery address, and order summary
- **Status Updates**: Mark orders as "Out for Delivery" or "Delivered"

### 🔐 **Authentication**
- **Change Password**: Update account password with validation
- **Role-based Access**: DELIVERY role authentication
- **Secure Logout**: Clear session and redirect to login

## User Interface

### **Dashboard Layout**
- **Sidebar Navigation**: Quick access to manage orders
- **User Menu**: Profile actions and logout
- **Responsive Design**: Mobile-friendly interface

### **Order Management**
- **Order Cards**: Visual display of assigned orders
- **Status Badges**: Color-coded order status indicators
- **Action Buttons**: Context-sensitive delivery actions

## API Integration

### **Endpoints**
- `GET /delivery-team/{deliveryTeamId}/assigned-orders` - Fetch assigned orders
- `PUT /orders/{orderId}/delivery-status` - Update delivery status

### **Authentication**
- Uses JWT token to extract delivery team ID (`entityId`)
- Automatic token attachment via HTTP interceptor

## Order Status Flow

1. **ASSIGNED** → Can mark "Out for Delivery"
2. **OUT_FOR_DELIVERY** → Can mark "Delivered"
3. **DELIVERED** → Final status (no further actions)

## Components

### **Main Components**
- `DeliveryDashboardComponent` - Main layout and navigation
- `ManageOrdersComponent` - Order management hub
- `ViewAssignedOrdersComponent` - Order list and status updates
- `DeliveryChangePasswordComponent` - Password management

### **Routing**
- `/delivery-dashboard/manage-orders` - Main orders view
- `/delivery-dashboard/manage-orders/view-assigned` - Assigned orders list
- `/delivery-dashboard/change-password` - Password change form

## Usage

### **For Delivery Team Members**
1. **Login** with DELIVERY role credentials
2. **View Orders** - Navigate to Manage Orders → View Assigned Orders
3. **Update Status** - Use action buttons to update delivery status
4. **Track Progress** - Monitor order status changes

### **Order Actions**
- **Mark Out for Delivery**: Update status when starting delivery
- **Mark as Delivered**: Confirm successful delivery completion

## Security Features
- Role-based access control (DELIVERY only)
- JWT token validation
- Secure API communication
- Protected routes with auth guards

## Responsive Design
- **Desktop**: Full sidebar with detailed order cards
- **Tablet**: Collapsible navigation
- **Mobile**: Stacked layout with touch-friendly buttons
