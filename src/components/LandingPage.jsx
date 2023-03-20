import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../styles/LandingPage.css';
import { formatCurrency } from '../helpers/helpers';

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  const fetchData = useCallback(() => {
    axios
      .get('https://api.coinlore.net/api/tickers/')
      .then((res) => {
        setData(res.data.data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: [],
          datasets: [
            {
              label: 'BTC Price (USD)',
              data: [],
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
            {
              label: 'ETH Price (USD)',
              data: [],
              borderColor: 'rgba(153, 102, 255, 1)',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        },
      });

      const updateChart = () => {
        Promise.all([
          axios.get('https://api.coinlore.net/api/ticker/?id=90'),
          axios.get('https://api.coinlore.net/api/ticker/?id=80'),
        ])
          .then((responses) => {
            const btcData = responses[0].data[0];
            const ethData = responses[1].data[0];
            const time = new Date().toLocaleTimeString();
            const btcPrice = parseFloat(btcData.price_usd).toFixed(2);
            const ethPrice = parseFloat(ethData.price_usd).toFixed(2);
            myChart.data.labels.push(time);
            myChart.data.datasets[0].data.push(btcPrice);
            myChart.data.datasets[1].data.push(ethPrice);
            myChart.update();
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const intervalId = setInterval(updateChart, 5000);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Crypto Tracker</h1>
      </header>
      <div className="chart-container">
        <canvas ref={chartRef} className="chart" />
        <div className="legend">
          <span className="btc-color"></span>
          <p>BTC</p>
          <span className="eth-color"></span>
          <p>ETH</p>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="card-container">
          {data.map((coin) => (
            <div className="card" key={coin.id}>
              <div className="card-header">
                <img src={`https://www.cryptocompare.com/${coin.image_url}`} alt="coin" />
                <h2>{coin.name}</h2>
              </div>
              <div className="card-body">
                <p>Price: {formatCurrency(coin.price_usd)}</p>
                <p>Market Cap: {formatCurrency(coin.market_cap_usd)}</p>
                <p>24h Volume: {formatCurrency(coin.volume24)}</p>
                <p>Change (24h): {coin.percent_change_24h}%</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

