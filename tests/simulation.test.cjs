const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const html = fs.readFileSync(require("node:path").join(__dirname, "../index.html"), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const scope = vm.createContext({});
vm.runInContext(script.split('$("run").onclick')[0], scope);
const params = {fast:2,slow:4,balance:1000,fee:10,seed:17,strategy:"Moving-average crossover"};
function simulate(prices, changes={}) {
  scope.prices=prices; scope.params={...params,...changes};
  return vm.runInContext("simulate(prices, params)", scope);
}
function close(actual, expected) { assert(Math.abs(actual-expected)<1e-8, actual+" != "+expected); }
// Rising price can still lose after fees: reserve $10, buy $980 / $110.
const loss=simulate([100,100,100,110,111]);
close(loss.cash,980/110*111); close(loss.trades[0].netProfit,loss.cash-1000);
assert.equal(loss.winRate,0); close(loss.equity.at(-1),loss.cash);
// Flat exit includes final fee and initial-balance reference in drawdown.
const flat=simulate([100,100,100,110,110]);
close(flat.cash,980); close(flat.drawdown,-2); close(flat.netReturn,-2);
assert.equal(flat.equity[0],1000); assert.equal(flat.equity.length,6);
const gain=simulate([100,100,100,110,220]); close(gain.cash,1960); assert.equal(gain.winRate,100);
const idle=simulate([100,100,100,100,100]); assert.equal(idle.cash,1000); assert.equal(idle.trades.length,0); assert.equal(idle.winRate,null); assert.equal(idle.drawdown,0);
const prices=[100,100,100,120,100,110];
const crossover=simulate(prices),trend=simulate(prices,{strategy:"Trend filter"});
assert.equal(crossover.trades[0].exitPeriod,5); assert.equal(trend.trades[0].exitPeriod,4); assert.notEqual(crossover.cash,trend.cash);
const noFees=simulate([100,100,100,110,111],{fee:0}); close(noFees.cash,1000/110*111); assert.equal(noFees.winRate,100);
for(const changes of [{fast:2.5},{slow:130},{slow:2},{balance:Infinity},{balance:0},{fee:-1},{fee:500},{seed:0},{seed:NaN},{seed:1.5},{strategy:"Unknown"}]) assert.throws(()=>simulate(prices,changes));
assert.throws(()=>simulate([100,0,100,100])); assert.throws(()=>simulate([]));
scope.params={...params,fast:8,slow:24,balance:10000,fee:4};
const repeat=vm.runInContext("simulate(generatePrices(17),params)",scope);
assert.equal(JSON.stringify(repeat),JSON.stringify(vm.runInContext("simulate(generatePrices(17),params)",scope)));
for(const strategy of ["Moving-average crossover","Trend filter"])for(let seed=1;seed<=99;seed++){
 scope.params={...params,fast:8,slow:24,balance:10000,fee:4,strategy,seed};
 const result=vm.runInContext("simulate(generatePrices(params.seed),params)",scope);
 assert(result.equity.every(Number.isFinite)); assert(result.cash>=0); close(result.cash,result.equity.at(-1)); assert(result.drawdown<=0);
}
console.log("PASS: hand-calculated accounting, strategy divergence, no trades, invalid inputs, and 198 seeded scenarios.");
