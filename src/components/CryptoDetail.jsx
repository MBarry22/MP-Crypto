import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "../styles/CryptoDetail.css";
import Chart from 'chart.js/auto';

export default function CryptoDetail() {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.coinlore.net/api/ticker/?id=${id}`
        );
        const data = await response.json();
        setCrypto(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (crypto) {
      const ctx = chartRef.current.getContext("2d");
      const labels = ["1h", "24h", "7d"];
      const data = [parseFloat(crypto.percent_change_1h), parseFloat(crypto.percent_change_24h), parseFloat(crypto.percent_change_7d)];
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Price Change",
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          animation: {
            duration: 2000,
            easing: 'easeOutBounce'
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [crypto]);

  return (
    <div className="crypto-detail-card">
      {crypto && (
        <>
          <div className="crypto-headers">
            <h2 className="crypto-name">
              {crypto.name} ({crypto.symbol})
            </h2>
            <h3 className="crypto-price">
              {`$${parseFloat(crypto.price_usd).toFixed(2)}`}
            </h3>
          </div>
          <div className="crypto-details-container">
            <div className="crypto-details">
              <div className="crypto-detail-item">
                <h4 className="crypto-detail-label">Rank:</h4>
                <p className="crypto-detail-value">{crypto.rank}</p>
              </div>
              <div className="crypto-detail-item">
                <h4 className="crypto-detail-label">Market Cap:</h4>
                <p className="crypto-detail-value">
                  {`$${parseFloat(crypto.market_cap_usd).toFixed(2)}`}
                </p>
              </div>
              <div className="crypto-detail-item">
                <h4 className="crypto-detail-label">24h Volume:</h4>
                <p className="crypto-detail-value">
                  {`$${parseFloat(crypto.volume24).toFixed(2)}`}
                </p>
              </div>
              <div className="crypto-detail-item">
                <h4 className="crypto-detail-label">Circulating Supply:</h4>
                <p className="crypto-detail-value">{`${parseFloat(
                  crypto.csupply
                ).toFixed(2)} ${crypto.symbol}`}</p>
              </div>
              <div className="crypto-detail-item">
                <h4 className="crypto-detail-label">Total Supply:</h4>
                <p className="crypto-detail-value">{`${parseFloat(
                  crypto.tsupply
                ).toFixed(2)} ${crypto.symbol}`}</p>
              </div>
              <div className="crypto-detail-item">
                <h4 className="crypto-detail-label">Change (1h):</h4>
                <p
                    className={`crypto-detail-value ${
                        parseFloat(crypto.percent_change_1h) > 0
                            ? "positive"
                            : "negative"
                    }`}
                >
                    {`${parseFloat(crypto.percent_change_1h).toFixed(2)}%`}
                </p>
                </div>
                <div className="crypto-detail-item">
                    <h4 className="crypto-detail-label">Change (24h):</h4>
                    <p
                        className={`crypto-detail-value ${
                            parseFloat(crypto.percent_change_24h) > 0
                                ? "positive"
                                : "negative"
                        }`}
                    >
                        {`${parseFloat(crypto.percent_change_24h).toFixed(2)}%`}
                    </p>
                </div>
                <div className="crypto-detail-item">
                    <h4 className="crypto-detail-label">Change (7d):</h4>
                    <p
                        className={`crypto-detail-value ${
                            parseFloat(crypto.percent_change_7d) > 0
                                ? "positive"
                                : "negative"
                        }`}
                    >
                        {`${parseFloat(crypto.percent_change_7d).toFixed(2)}%`}
                    </p>
                </div>
            </div>
            <div className="crypto-chart">
                <canvas ref={chartRef} />
            </div>
            </div>
        </>
        )}
    </div>
    );
}
