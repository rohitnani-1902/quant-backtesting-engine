# VectorTest — Quant Backtesting Engine

A compact, browser-based backtesting prototype built around reproducible synthetic data.

## Run it

Open `index.html` in a modern browser. There are no dependencies, accounts, or API keys.

## Features

- Deterministic generated-price scenarios controlled by a seed
- Moving-average crossover and trend-filter framing
- Adjustable windows, starting balance, and fixed fee assumption
- Net return, maximum drawdown, trade count, and win-rate metrics
- Simulated equity curve using SVG
- Parameter validation and an explicit scope disclaimer

## Important disclaimer

This is an educational simulation, not a live-data backtest or performance claim. Generated prices, simplified fills, and fixed fees do not represent real-market conditions. It is not investment advice or a trade signal.

## Tech

A single responsive HTML file using vanilla CSS and JavaScript.

## Extension ideas

- Import verified OHLCV data
- Add slippage, spread, and tax assumptions
- Use walk-forward testing and out-of-sample evaluation
- Export trades and parameter runs

---

Part of [Rohit's GitHub portfolio](https://github.com/rohitnani-1902).