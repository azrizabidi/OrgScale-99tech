document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="card">
      <h3>Swap</h3>

      <div class="field">
        <label>From</label>
        <div class="row">
          <select id="from-token"></select>
          <input id="input-amount" type="number" placeholder="0.00"/>
        </div>
      </div>

      <div class="field">
        <label>To</label>
        <div class="row">
          <select id="to-token"></select>
          <input id="output-amount" disabled />
        </div>
      </div>

      <p class="error" id="error"></p>

      <button id="swap-btn">CONFIRM SWAP</button>
    </div>
  `;

  // now do all the rest of your logic
  const PRICE_URL = "https://interview.switcheo.com/prices.json";

  let prices = {};

  const fromToken = document.getElementById("from-token");
  const toToken = document.getElementById("to-token");
  const inputAmount = document.getElementById("input-amount");
  const outputAmount = document.getElementById("output-amount");
  const errorEl = document.getElementById("error");
  const swapBtn = document.getElementById("swap-btn");

  async function loadPrices() {
    try {
      const res = await fetch(PRICE_URL);
      const data = await res.json();

      prices = data.reduce((map, item) => {
        if (item.price) map[item.currency] = item.price;
        return map;
      }, {});

      Object.keys(prices).forEach(symbol => {
        fromToken.add(new Option(symbol, symbol));
        toToken.add(new Option(symbol, symbol));
      });

      if (Object.keys(prices).length > 1) toToken.selectedIndex = 1;
    } catch (err) {
      errorEl.textContent = "Failed to load token prices.";
      console.error(err);
    }
  }

  function calculate() {
    errorEl.textContent = "";
    outputAmount.value = "";

    const amount = Number(inputAmount.value);
    if (!amount || amount <= 0) {
      errorEl.textContent = "Please enter a valid amount.";
      return;
    }

    const from = fromToken.value;
    const to = toToken.value;

    if (from === to) {
      errorEl.textContent = "Cannot swap the same token.";
      return;
    }

    const result = (amount * prices[from]) / prices[to];
    outputAmount.value = result.toFixed(6);
  }

  swapBtn.addEventListener("click", async () => {
    if (!outputAmount.value) return;

    swapBtn.disabled = true;
    swapBtn.textContent = "Processing...";

    await new Promise(r => setTimeout(r, 1200));

    alert(`Swap completed! 🎉\n${inputAmount.value} ${fromToken.value} → ${outputAmount.value} ${toToken.value}`);

    swapBtn.disabled = false;
    swapBtn.textContent = "CONFIRM SWAP";
  });

  inputAmount.addEventListener("input", calculate);
  fromToken.addEventListener("change", calculate);
  toToken.addEventListener("change", calculate);

  loadPrices();
});
