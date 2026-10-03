# VectorTest — Quant Backtesting Engine

A compact, browser-based backtesting prototype built around reproducible synthetic data.

## Run it

Open `index.html` in a modern browser. There are no dependencies, accounts, or API keys.

## Features

- Deterministic generated-price scenarios controlled by a seed
- Distinct moving-average crossover and price-confirmed trend-filter strategies
- Adjustable windows, starting balance, and fixed fee assumption
- Net return, maximum drawdown, trade count, and win-rate metrics
- Simulated equity curve using SVG
- Parameter validation and an explicit scope disclaimer

## Calculation conventions

- Crossover enters when fast SMA > slow SMA and exits when fast SMA < slow SMA.
- Trend filter additionally requires price > slow SMA to enter, and exits when price < slow SMA or fast SMA < slow SMA. Equality holds the current state.
- Signals and fills use the current synthetic period price. This is a simplified execution assumption, not a realistic historical fill model.
- Fractional positions pay one fixed fee at entry and exit. Entry reserves the exit fee in cash, and is skipped if cash cannot cover both fees.
- The equity curve starts at initial cash and includes final liquidation. Return, drawdown, and trade profit use the same fee accounting.
- Win rate counts closed trades with strictly positive profit after both fees; break-even trades are not wins.
- Invalid or empty parameters clear prior output. Windows and seeds must be integers within the displayed scenario limits.

## Verification

Run `node tests/simulation.test.cjs`. Tests use hand-calculated prices to check fee-adjusted profit, terminal liquidation, starting-balance drawdown, no-trade output, different strategy decisions, and invalid inputs. They also verify deterministic scenarios.

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