
# Pi Albania Hub

**The Digital Infrastructure of Albania.pi**

A modern, production-ready Pi Network application serving as the national hub for Albania-related experiences in the Pi ecosystem.

## 🚀 Features

- **Pi Network Authentication**: Secure login with Pi Browser SDK
- **Multi-Section Navigation**: Home, Explore, Community, Map, and Profile
- **Dark Theme**: Luxurious anthracite background with gold and purple accents
- **Cross-Platform**: Works on iOS, Android, and Web
- **Production Ready**: Optimized for domain deployment

## 🎨 Design System

### Color Palette
- **Background**: Anthracite (#000000, #1A1A1A)
- **Primary**: Purple (#9333EA, #7E22CE)
- **Accent**: Gold (#D4AF37, #FFD700)
- **Text**: White (#FFFFFF) and Light Gray (#B8B8B8)

### Typography
- **Headings**: Bold, 24-36px
- **Body**: Regular, 14-16px
- **Labels**: Medium, 12-13px

## 📱 Screens

1. **Home**: Dashboard with category cards and quick stats
2. **Explore**: Discovery section (coming soon)
3. **Community**: Social features (coming soon)
4. **Map**: Location-based services (coming soon)
5. **Profile**: User account management and settings

## 🔐 Authentication

The app uses Pi Network authentication:
- Username scope for basic user info
- Secure session management
- Graceful fallback for non-Pi Browser environments

## 🛠️ Technical Stack

- **Framework**: Expo 54 + React Native
- **Navigation**: Expo Router (file-based routing)
- **Styling**: StyleSheet with centralized theme
- **State Management**: React Context API
- **Animations**: React Native Reanimated

## 📦 Project Structure

```
app/
├── (tabs)/           # Tab navigation screens
│   ├── (home)/       # Home screen with nested routing
│   ├── explore.tsx   # Explore screen
│   ├── community.tsx # Community screen
│   ├── map.tsx       # Map screen
│   └── profile.tsx   # Profile screen
├── _layout.tsx       # Root layout with theme
└── +not-found.tsx    # 404 error page

components/
├── FloatingTabBar.tsx # Custom tab bar component
└── IconSymbol.tsx     # Cross-platform icon component

contexts/
├── PiContext.tsx      # Pi Network authentication
└── WidgetContext.tsx  # Widget state management

styles/
└── commonStyles.ts    # Centralized color palette and styles
```

## 🚀 Deployment Checklist

### Pre-Deployment
- ✅ App name and slug configured (no spaces)
- ✅ Bundle identifiers set (com.pialbania.hub)
- ✅ Dark theme properly configured
- ✅ 404 page implemented
- ✅ Error handling in place
- ✅ Console logs for debugging
- ✅ Cross-platform compatibility verified

### Domain Migration
1. Update `backendUrl` in `app.json` if needed
2. Configure DNS settings for your domain
3. Build production assets: `expo export -p web`
4. Deploy static files to hosting provider
5. Test Pi SDK integration in production

### Post-Deployment
- Test all navigation flows
- Verify Pi authentication works
- Check responsive design on all devices
- Monitor console logs for errors
- Test deep linking with custom scheme

## 🔧 Configuration

### app.json
```json
{
  "expo": {
    "name": "Pi Albania Hub",
    "slug": "pi-albania-hub",
    "scheme": "pialbaniahub",
    "userInterfaceStyle": "dark",
    "extra": {
      "backendUrl": "https://your-backend-url.com"
    }
  }
}
```

### Environment Variables
- `backendUrl`: Backend API endpoint (configured in app.json)

## 📝 Development Notes

### Pi SDK Integration
- SDK loads dynamically on web platform
- Graceful fallback for native platforms
- Sandbox mode enabled for testing
- Production mode requires Pi Browser

### Styling Guidelines
- Use `colors` from `commonStyles.ts`
- Follow atomic JSX rules (one variable per Text)
- Platform-specific files for iOS (.ios.tsx)
- Consistent spacing and padding

### Best Practices
- Console logs for user actions
- Error boundaries for crash prevention
- Loading states for async operations
- Optimistic UI updates where possible

## 🐛 Troubleshooting

### Pi SDK Not Loading
- Ensure you're in Pi Browser for production
- Check console for SDK initialization logs
- Verify network connectivity

### Navigation Issues
- Check route paths in FloatingTabBar
- Verify file structure matches routes
- Look for 404 errors in console

### Styling Problems
- Confirm colors imported from commonStyles
- Check platform-specific overrides
- Verify theme configuration in _layout.tsx

## 📄 License

This project is part of the Pi Network ecosystem and follows Pi Network's terms of service.

## 🤝 Contributing

This is a production application for Pi Albania Hub. For feature requests or bug reports, please contact the development team.

## 📞 Support

For technical support or questions:
- Check the Help Center in the Profile section
- Contact Support via the app
- Review Pi Network documentation

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Status**: Production Ready ✅
