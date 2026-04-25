# HelloWorldApp — Expo + React Native + TestFlight

A lightweight React Native app built with Expo, tested with Jest, and distributed via TestFlight. Designed as a solid starting point you can keep building on.

---

## Quick Start

### Prerequisites

- **Node.js 20+** – [nodejs.org](https://nodejs.org)
- **Expo CLI** – `npm install -g expo-cli`
- **EAS CLI** – `npm install -g eas-cli`
- **Expo account** – [expo.dev](https://expo.dev) (free)
- **Apple Developer account** – required for TestFlight

---

### Install & Run Locally

```bash
cd HelloWorldApp
npm install
npm start          # Opens Expo Dev Tools in your browser
```

Scan the QR code with the **Expo Go** app on your phone, or press `i` to open the iOS simulator.

---

### Run Tests

```bash
cd HelloWorldApp
npm test           # Run all tests once
npm run test:watch # Watch mode
npm run test:coverage  # With coverage report
```

---

## Deploying to TestFlight

### 1. Fill in your credentials

**In `HelloWorldApp/app.json`:**

| Placeholder | What to replace it with |
|---|---|
| `com.YOURNAME.helloworldapp` | Your iOS bundle ID, e.g. `com.johndoe.helloworldapp` |
| `YOUR_EAS_PROJECT_ID` | Run `eas init` to generate this automatically |

**In `HelloWorldApp/eas.json`:**

| Placeholder | What to replace it with |
|---|---|
| `YOUR_APPLE_ID@example.com` | Your Apple ID email |
| `YOUR_APP_STORE_CONNECT_APP_ID` | Found in App Store Connect → My Apps → App Information → Apple ID |
| `YOUR_APPLE_TEAM_ID` | Found in [developer.apple.com](https://developer.apple.com) → Membership → Team ID |

### 2. Add GitHub Secrets

Go to **Settings → Secrets and variables → Actions** in your repo and add:

| Secret name | Value |
|---|---|
| `EXPO_TOKEN` | Create at [expo.dev/accounts/[you]/settings/access-tokens](https://expo.dev) |
| `APPLE_APP_SPECIFIC_PASSWORD` | Generate at [appleid.apple.com](https://appleid.apple.com) → App-Specific Passwords |

### 3. Create the app in App Store Connect

1. Log in to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click **+** → **New App**
3. Choose **iOS**, give it a name, set the Bundle ID to match what you set in `app.json`
4. Note the **Apple ID** number shown (it's a 10-digit number) — put it in `eas.json` as `ascAppId`

### 4. Link EAS to your Expo account

```bash
cd HelloWorldApp
eas login             # Log in to your Expo account
eas build:configure   # Creates/links the project to EAS (updates app.json with projectId)
```

### 5. Deploy

**Manually (one-off):**
```bash
cd HelloWorldApp
eas build --platform ios --profile production --auto-submit
```

**Automatically via CI:**  
Every push to `main` triggers `.github/workflows/eas-build.yml` which builds and submits to TestFlight automatically. Just merge your work and the build is on its way.

---

## GitHub Actions Workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `ci.yml` | Every push / PR to `main` | Runs Jest tests |
| `eas-build.yml` | Push to `main` | Runs tests, then builds iOS app and submits to TestFlight |

---

## Project Structure

```
HelloWorldApp/
├── App.tsx                    # Entry point
├── app.json                   # Expo config (fill in bundle ID + EAS project ID)
├── eas.json                   # EAS Build profiles (fill in Apple credentials)
├── babel.config.js
├── tsconfig.json
├── components/
│   └── HelloWorld.tsx         # Reusable Hello World component
└── __tests__/
    ├── App.test.tsx           # Tests for App
    └── HelloWorld.test.tsx    # Tests for HelloWorld component
```

---

## Development Workflow

1. **Capture ideas** → add to `backlog.md` as `raw`
2. **Refine** → update status to `refined`, then `agent-ready` when ready for implementation
3. **Develop** → create a branch, implement, run `npm test`
4. **Open a PR** → CI runs tests automatically
5. **Merge to main** → EAS Build triggers and publishes a new TestFlight build
6. **Testers notified** → friends and family receive the build in TestFlight

See `backlog.md` for the current list of ideas and upcoming features.

Tesing new build