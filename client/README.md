# WSB Trading Analytics Platform

## Overview

WSB Trading is an advanced, extensible analytics platform for stocks and cryptocurrencies. It offers deep analytics, real-time alerts, and multi-channel notifications, empowering users to make data-driven decisions based on technical indicators, projections, and sentiment data.

---

## Repository Migration Notice

This project was migrated to this new repository ([WSB-Trading-project](https://github.com/elithaxxor/WSB-Trading-project.git)) on 2025-04-29. For full commit history prior to this date, see the previous repository.

---

## Purpose

The platform aims to provide:

- Real-time and historical price monitoring for stocks and crypto assets
- Automated alerts for price, technical indicator events, and sentiment shifts
- Advanced analytics (Sharpe Ratio, Max Drawdown, Volatility, Correlation Matrix)
- Comparison of projection models (Prophet, ARIMA, LSTM)
- Management and export of alert history and notes
- Integration with popular notification channels (Email, Discord, Slack, Push, Telegram, SMS)

## Architecture

- **Frontend:** React + TypeScript dashboard for charts, alerts, and analytics configuration.
- **Backend:** Node.js/Express server for alert scheduling, price polling, and notifications.
- **Alert System:** Supports price, indicator (MA, RSI, MACD, Bollinger Bands, etc.), and sentiment alerts.
- **Notification Channels:** Multi-channel support for user alerts.
- **Modularity:** Architecture is designed for easy addition of new indicators and integrations.

## Key Features

- Interactive dashboard for stocks and crypto
- Advanced analytics: Sharpe Ratio, Max Drawdown, Volatility, Correlation Matrix
- Multiple projection models (Prophet, ARIMA, LSTM)
- Visual technical indicators and overlays
- Custom notes, export, and PDF/chart download
- Automated alerts (Price, MA Cross, RSI, Volume Spike, Bollinger Bands, MACD)
- Alert history and export
- Multi-channel notification support
- Accessibility, dark mode, and mobile support
- Help overlay and onboarding

## Build & Deployment

To build the app for production:

```sh
npm run build
```

The output will be in the `build` folder. To serve the production build locally:

```sh
npm install -g serve
serve -s build
```

The app will be available at [http://localhost:5000](http://localhost:5000) by default.

## Roadmap & Next Steps

- **Expand Indicator Coverage:**
  - Implement ADX, Parabolic SAR, VWAP, Volume Profile, A/D Line, CMF, Fibonacci Retracements, Ichimoku Cloud, Pivot Points, VIX, and more.
- **Enhance Alert Logic:**
  - Enable multi-condition alerts, indicator combinations, and divergence detection.
  - Add backtesting for indicator-based strategies.
- **Improve Visualization:**
  - Add overlays for new indicators, tooltips, and in-app documentation.
  - Show volume profile and VWAP on charts.
- **Risk Management:**
  - Use ATR and VIX for dynamic position sizing and alert sensitivity.
- **Customization & Automation:**
  - Allow scripting of custom indicator formulas and logic.
  - Enable strategy builder and optional automated trade execution.
- **Pattern Recognition:**
  - Add pattern recognition (double top, head and shoulders, etc.) and highlight divergences.
- **Documentation:**
  - Integrate summarized guide and provide external links for each indicator.

## Microservice Integration: Meme-Coin Analyzer (2025-04-29)

- The project will integrate the meme-coin-resilience-analyzer as a separate microservice.
- The analyzer service will communicate with the main backend via REST API endpoints.
- This approach was chosen for its modularity, scalability, and future-proofing.
- See the Changelog for decision rationale and progress updates.

## Recent Updates (2025-04-29)

- Repository migrated to new GitHub location.
- Expanded README with migration notice, roadmap, and updated architecture overview.

See `CHANGELOG.md` for full update history.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
