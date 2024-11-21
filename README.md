# 🏠 Home Tax Somalia

A modern property tax management system built for Somalia, streamlining the process of property registration and tax payments.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

## 🎯 Overview

Home Tax Somalia is a comprehensive digital solution designed to modernize property tax management in Somalia. Our platform bridges the gap between property owners and tax authorities, providing a seamless, transparent, and efficient tax management experience.

## ✨ Features

### 🏢 Property Management
- Property registration and management
- Digital document storage
- Property value assessment
- Tax history tracking
- Automated property verification

### 💰 Tax Management
- Digital tax payments
- Multiple payment methods (Stripe integration)
- Automated tax calculations
- Payment history and receipts
- Real-time payment verification

### 👥 User Management
- Role-based access control (Admin/Homeowner)
- Secure authentication
- Profile management
- Email notifications
- Activity tracking

### 📊 Dashboard & Analytics
- Revenue trends
- Property statistics
- Recent activities
- System status monitoring
- Custom reporting tools

## 🛠️ Tech Stack

### Frontend
- React.js 18.3 with Vite
- TailwindCSS for styling
- Framer Motion for animations
- React Router v6 for navigation
- Axios for API requests
- React Hot Toast for notifications
- Recharts for data visualization
- DaisyUI for UI components

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments
- Nodemailer for emails
- CORS enabled
- Express Async Handler

## 🚀 Getting Started

### System Requirements
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v7 or higher) or yarn
- Minimum 2GB RAM
- 4GB free disk space

### Installation

1. Clone the repository
```bash
git clone https://github.com/hefow/home-tax-somalia.git
cd home-tax-somalia
```

2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

3. Install Backend Dependencies
```bash
cd backend
npm install
```

### Environment Configuration

Create `.env` files in both frontend and backend directories:

Frontend `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Backend `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
FRONTEND_URL=http://localhost:5173
```

### Development Servers

Start Frontend:
```bash
cd frontend
npm run dev
```

Start Backend:
```bash
cd backend
npm run dev
```

## 🌐 Internationalization

Supported languages with full RTL support:
- English (en)
- Somali (so)
- Arabic (ar)

## 📱 Responsive Design

Optimized viewing experience across:
- Desktop (1920px and above)
- Laptop (1024px to 1919px)
- Tablet (768px to 1023px)
- Mobile (320px to 767px)

## 🔒 Security Implementation

- JWT-based authentication
- Bcrypt password hashing
- Protected API routes
- Input sanitization and validation
- XSS protection
- CORS configuration
- Rate limiting
- Request validation middleware

## 📊 Performance Optimization

- Lazy loading of components
- Image optimization
- Code splitting
- Caching strategies
- Minimized bundle size
- Optimized database queries
- Efficient state management

## 📄 API Documentation

### Core Endpoints

#### Authentication
- POST /api/users/register
- POST /api/users/login
- POST /api/users/logout

#### Property Management
- GET /api/properties
- POST /api/properties
- PUT /api/properties/:id
- DELETE /api/properties/:id

#### Tax Management
- GET /api/tax/history
- POST /api/tax/payment
- GET /api/tax/records

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. You can also contribute by visiting our [GitHub repository](https://github.com/alidiamond1/home-tax-somalia.git).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For more information about contributing, please check our [Contributing Guidelines](https://github.com/alidiamond1/home-tax-somalia/tree/contribution/alidiamond1).

## 🐛 Bug Reporting

Report bugs by opening a new issue with:
- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)
- Environment details

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

### Technical Support
- Email: calinur9090@gmail.com
- Phone: +252 61 9899733
- Hours: 24/7

### Business Inquiries
- Email: calinur9090@gmail.com
- Phone: +252 61 9899733
- Location: Mogadishu, Somalia

## 🙏 Acknowledgments

- Somalia Ministry of Finance
- Property Management Association of Somalia
- Our dedicated development team
- Open source community

---
Made with ❤️ in Somalia by [Ali Diamond](https://github.com/alidiamond1)
