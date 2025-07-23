class TradingViewTicker extends HTMLElement {
  constructor() {
    super();
    // Attach Shadow DOM for style encapsulation
    const shadow = this.attachShadow({ mode: 'open' });

    // Create container for the widget
    const container = document.createElement('div');
    container.className = 'tradingview-widget-container';
    container.innerHTML = `
      <div class="tradingview-widget-container__widget"></div>
    `;

    // Create style element to ensure proper rendering
    const style = document.createElement('style');
    style.textContent = `
      .tradingview-widget-container {
        height: 64px; /* Match header height constraint */
        overflow: hidden;
        font-size: 12px; /* Adjust for compact display */
      }
      .tradingview-widget-container__widget {
        height: 100%;
      }
      .tradingview-widget-copyright {
        font-size: 10px;
        text-align: center;
      }
    `;

    // Append style and container to Shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    // Dynamically load the TradingView script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { description: 'FTSE UK 100', proName: 'SPREADEX:FTSE' },
        { description: 'SPX 500', proName: 'SP:SPX' },
        { description: 'UK real GDP', proName: 'ECONOMICS:GBGDPCP' },
        { description: 'UK CPI', proName: 'ECONOMICS:GBCPI' },
        { description: 'UK Retail', proName: 'ECONOMICS:GBRPI' },
        { description: 'UK House MoM', proName: 'ECONOMICS:GBHPIMM' },
        { description: 'Uk Unemployment Rate', proName: 'ECONOMICS:GBUR' },
        { description: 'GBP to EUR', proName: 'FX_IDC:GBPEUR' },
        { description: 'GBP to USD', proName: 'CMCMARKETS:GBPUSD' },
        { description: 'BTC to GBP', proName: 'COINBASE:BTCGBP' }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'regular',
      colorTheme: 'light',
      locale: 'en'
    });

    // Append script to Shadow DOM
    shadow.appendChild(script);
  }
}

// Define the custom element
customElements.define('tradingview-ticker', TradingViewTicker);