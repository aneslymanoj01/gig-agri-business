# CIC Inventory UI - Angular Frontend

Agricultural inventory and distribution management system frontend built with Angular 17 and Angular Material.

## 🌾 Features (Phase 1)

- **Authentication System**
  - Login with JWT token management
  - Change password with strength validation
  - Role-based access control (MASTER only in Phase 1)
  - Auto-redirect based on password change requirements

- **Master Dashboard**
  - Responsive sidebar navigation
  - Agricultural-themed UI design
  - Lazy-loaded feature modules
  - Placeholder components for future development

- **Security**
  - JWT interceptor for API calls
  - Auth guard for protected routes
  - Token validation and expiry handling
  - Role enforcement (MASTER only)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Angular CLI 17+

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   ng serve
   ```

3. **Access application**
   - URL: http://localhost:4200
   - Login with MASTER role credentials

### API Configuration

The app connects to backend services at:
- Auth Service: `http://localhost:8180/pohoro-auth-service/auth`

Update API endpoints in `src/app/shared/services/auth.service.ts` if needed.

## 📁 Project Structure

```
src/app/
├── auth/                    # Authentication module
│   ├── login/              # Login component
│   └── change-password/    # Password change component
├── dashboard/              # Main dashboard
│   ├── distributors/       # Distributor management (lazy-loaded)
│   ├── products/          # Product management (lazy-loaded)
│   ├── delivery-team/     # Delivery team management (lazy-loaded)
│   └── stock-requests/    # Stock request management (lazy-loaded)
└── shared/                # Shared utilities
    ├── services/          # Auth, notification services
    ├── guards/           # Route guards
    ├── interceptors/     # HTTP interceptors
    └── models/          # TypeScript interfaces
```

## 🎨 UI/UX Design

- **Theme**: Agricultural green color scheme
- **Components**: Angular Material Design
- **Responsive**: Mobile-first approach
- **Accessibility**: WCAG compliant components
- **Branding**: Uses `logo.jpeg` for company branding

## 🔐 Authentication Flow

1. **Login**: POST to `/auth/login`
2. **Token Storage**: Access & refresh tokens in localStorage
3. **Role Validation**: Only MASTER role allowed in Phase 1
4. **Password Change**: Redirect if `isPasswordChangeRequired: true`
5. **Auto-logout**: On token expiry or manual logout

## 🛡️ Security Features

- JWT token validation
- Role-based route protection
- HTTP interceptor for authenticated requests
- Secure token storage
- Password strength validation

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation
- **Tablet**: Collapsible sidebar
- **Mobile**: Overlay navigation menu
- **Breakpoints**: 768px, 480px

## 🔧 Development

### Adding New Features

1. Create feature module in `dashboard/`
2. Add route to `app-routing.module.ts`
3. Update sidebar menu in `dashboard.component.ts`
4. Implement lazy loading

### API Integration

1. Define interfaces in `shared/models/`
2. Create service in `shared/services/`
3. Use HTTP interceptor for authentication
4. Handle errors with notification service

## 🚀 Build & Deploy

```bash
# Production build
ng build --prod

# Output directory
dist/cic-inventory-ui/
```

## 📋 Phase 2 Roadmap

- Distributor management implementation
- Product catalog functionality
- Delivery team operations
- Stock request processing
- Real-time notifications
- Advanced filtering and search
- Data visualization dashboards

## 🎯 Key Components

- **LoginComponent**: Authentication with loading states
- **ChangePasswordComponent**: Password update with validation
- **DashboardComponent**: Main layout with navigation
- **AuthGuard**: Route protection
- **JwtInterceptor**: Automatic token attachment
- **NotificationService**: User feedback system

## 🌟 Best Practices

- Reactive forms with validation
- Error handling with user feedback
- Loading states for better UX
- Consistent Material Design usage
- Clean component architecture
- Type-safe API interfaces
