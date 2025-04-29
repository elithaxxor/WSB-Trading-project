# Meme-Coin Resilience Analyzer Microservice

This microservice wraps the meme-coin-resilience-analyzer and exposes REST API endpoints for the WSB-Trading Analytics Platform.

## Features
- Run meme-coin scans on demand or on a schedule
- Query historical scan results
- Expose resilience, scam, and risk metrics via REST API

## Quickstart (Dev)

```sh
# Build and run with Docker
cd services/meme-coin-analyzer
docker build -t meme-coin-analyzer .
docker run -p 8001:8001 meme-coin-analyzer
```

## API Endpoints

- `GET /scan` - Run a new meme-coin scan and return results
- `GET /history?symbol=...` - Get historical scan results for a coin

## Integration
- Communicates with the main WSB-Trading backend via REST API
- Designed for modular, scalable deployment

---

> For implementation details, see main.py and Dockerfile
