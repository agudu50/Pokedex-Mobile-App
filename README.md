# Pokédex Mobile App ⚡

A modern, responsive Pokédex mobile application built with **React Native**, **Expo SDK 54**, and **React Navigation**, powered by live data from the [PokéAPI](https://pokeapi.co/).

---

## 📱 Features

- **Live PokéAPI Integration**: Fetches real-time Pokémon data dynamically using `fetch` and React hooks (`useEffect`, `useState`).
- **Reusable Pokémon Card Component**: Clean, customizable card component accepting `name`, `image`, `number`, `types`, and `isFavorite` as props.
- **Interactive Favorites System**: Toggle favorite status on any card or details screen with synchronized global state via React Context (`FavoritesContext`).
- **Detailed Pokémon View**: Tapping a card opens the Details screen displaying:
  - Pokémon name, formatted national dex number (`N°001`), and element-themed backdrop.
  - Primary and secondary type badges with distinct icons and colors.
  - Physical characteristics (**Height** in meters, **Weight** in kilograms).
  - Base experience, abilities, and visual stat bars (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed).
- **Search & Filter Bar**:
  - Live search by Pokémon name or number.
  - Element type filtering pills (Grass, Fire, Water, Electric, Bug, etc.).
  - Sort ordering (Ascending number, Descending number, Alphabetical).
- **Multi-tiered Navigation**:
  - **Native Stack Navigator**: Smooth screen transitions between the list and Pokémon details.
  - **Bottom Tab Navigator**: Custom tabs for **Pokédex**, **Regiões** (Regions), **Favoritos** (Favorites), and **Perfil** (Profile) utilizing custom icon assets (`pokeball-icon.png`, `pokepin-icon.png`, `pokeheart-icon.png`, `profile-icon.png`).
  - **Drawer Navigator**: Side drawer menu providing access to **Configurações** (Settings), **Ajuda e Suporte** (Help & Support), and **Sair** (Logout).

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (React 19)
- **Tooling**: [Expo SDK 54](https://expo.dev/)
- **Navigation**: [React Navigation v7](https://reactnavigation.org/)
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
  - `@react-navigation/drawer`
- **Gestures & Animations**:
  - `react-native-gesture-handler`
  - `react-native-reanimated`
  - `react-native-screens`
  - `react-native-safe-area-context`
- **Icons**: Custom project PNG assets + `@expo/vector-icons`
- **API Source**: [PokéAPI v2](https://pokeapi.co/)

---

## 📂 Project Structure

```
dcit-324-assign4/
├── assets/                       # Custom images and tab icons
│   ├── image-1.png ... image-17.png
│   ├── pokeball-icon.png
│   ├── pokepin-icon.png
│   ├── pokeheart-icon.png
│   └── profile-icon.png
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── PokemonCard.js        # Reusable card component
│   │   ├── PokemonFilterHeader.js# Search, sort & filter bar
│   │   └── TypeBadge.js          # Element type pill badge
│   ├── constants/
│   │   └── pokemonAssets.js      # Type mappings, colors & asset helpers
│   ├── context/
│   │   └── FavoritesContext.js   # Global favorites state provider
│   ├── navigation/
│   │   ├── AppNavigator.js       # Stack, Bottom Tab & Drawer navigators
│   │   └── CustomDrawerContent.js# Styled drawer header & logout action
│   └── screens/
│       ├── HomeScreen.js         # Main Pokédex list screen
│       ├── PokemonDetailsScreen.js # Full details & stats screen
│       ├── RegionsScreen.js      # Pokémon regions exploration
│       ├── FavoritesScreen.js    # Saved favorite Pokémon
│       ├── ProfileScreen.js      # Trainer profile screen
│       ├── AboutScreen.js        # About app screen
│       ├── SettingsScreen.js     # App preferences & settings
│       └── HelpSupportScreen.js  # FAQs & support documentation
├── App.js                        # App entry point with Context & Navigation
├── index.js                      # Root component registration & gesture handler
├── babel.config.js               # Babel preset configuration
├── metro.config.js               # Metro bundler resolver configuration
├── app.json                      # Expo application manifest
└── package.json                  # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/go) app installed on your physical device (iOS or Android), or an active iOS Simulator / Android Emulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/agudu50/Pokedex-Mobile-App.git
   cd Pokedex-Mobile-App
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - **iOS Simulator**: Press `i` in the terminal.
   - **Android Emulator**: Press `a` in the terminal.
   - **Physical Device**: Scan the QR code using the **Expo Go** app (Android) or the default **Camera** app (iOS).

---

## 📡 API Endpoints Used

- **List Pokémon**: `GET https://pokeapi.co/api/v2/pokemon?limit=151`
- **Pokémon Details**: `GET https://pokeapi.co/api/v2/pokemon/{id or name}`

---

## 📄 License

This project is created for educational purposes as part of the **DCIT 324** Mobile App Development course.
