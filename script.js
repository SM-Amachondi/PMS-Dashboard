// Sample JS to load CSV data and plot charts
async function loadData() {
  const pmsResp = await fetch('data/pms_prices.csv');
  const pmsText = await pmsResp.text();
  const fxResp = await fetch('data/fx_rates.csv');
  const fxText = await fxResp.text();
  
  // Parse CSV
  const pmsData = Papa.parse(pmsText, {header:true, dynamicTyping:true}).data;
  const fxData = Papa.parse(fxText, {header:true, dynamicTyping:true}).data;
  
  // KPI cards (latest values)
  const latest = pmsData[pmsData.length-1];
  const kpiContainer = document.getElementById('kpi-cards');
  kpiContainer.innerHTML = `<div>PMS Price: ₦${latest.price_ngn}</div>
                            <div>Subsidy: ₦${latest.subsidy_ngn}</div>`;
  
  // Plot price chart
  const dates = pmsData.map(d=>d.date);
  const prices = pmsData.map(d=>d.price_ngn);
  Plotly.newPlot('price-chart',[{x:dates,y:prices,type:'scatter',mode:'lines+markers',line:{color:'#0077b6'}}],
                 {title:'PMS Price over Time (₦)'});
}

loadData();
