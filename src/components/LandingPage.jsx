import axios from 'axios';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../styles/LandingPage.css';
import cryptomarket from '../assets/images/cryptomarket.mp4';
import cryptomarket2 from '../assets/images/cryptomarket2.mp4';
import { formatCurrency } from '../helpers/helpers';

export default function LandingPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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
    setFilteredData(
      data.filter((coin) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [data, searchText]);

  return (
    <><div className="landing-page">
      <header className="header">
        <h1 className="btn-shine">Stay Ahead of the Game </h1>
        <h1 className="btn-shine">with MP Crypto</h1>
      </header>

      <h2 className='top-cryptos'>TOP Cryptos</h2>
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : (
        <div className="crypto-list">
          {filteredData.map((coin) => (
            <div className="crypto" key={coin.id}>

              <div className="crypto-body">
                <h2>{coin.name}</h2>
                <p> {formatCurrency(coin.price_usd)}</p>
                <p> {formatCurrency(coin.market_cap_usd)}</p>
                <p> {formatCurrency(coin.volume24)}</p>
                <p> {coin.percent_change_24h}%</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
    <div className="crypto-information">
        <h2 className="crypto-information-title">Crypto Information</h2>
        <div className='crypto-information-left'>
          <video className='video' autoPlay loop muted>
            <source src={cryptomarket} type='video/mp4' />
          </video>
          <div className='crypto-information-left-text'>
          <h2>An Introduction to Cryptocurrencies</h2>
          <p>Cryptocurrencies are a digital form of currency that operate independently of central banks. They use encryption techniques to secure transactions and control the creation of new units. Bitcoin is the most well-known cryptocurrency, but there are many others such as Ethereum, Litecoin, and Ripple. Some people invest in cryptocurrencies as a form of alternative investment, while others use them for online transactions or to avoid traditional banking systems. However, there are also concerns about the volatility and lack of regulation in the cryptocurrency market.</p>
          </div>
        </div>
        <div className='crypto-information-right'>
        <div className='crypto-information-right-text'>
          <h2>How to Buy Cryptocurrencies</h2>
          <p>Buying cryptocurrencies is a simple process. You can buy them directly from an exchange, or you can use a broker. If you want to buy cryptocurrencies directly from an exchange, you will need to create an account and verify your identity. You can then deposit funds into your account and use them to buy cryptocurrencies. If you want to use a broker, you will need to create an account and verify your identity. You can then deposit funds into your account and use them to buy cryptocurrencies. If you want to use a broker, you will need to create an account and verify your identity. You can then deposit funds into your account and use them to buy cryptocurrencies.</p>
          </div>
          <video className='video' autoPlay loop muted>
            <source src={cryptomarket2} type='video/mp4' />
          </video>
          </div>
        <div className='where-to-buy'>
          <h2>Where to buy Crypto Currencies</h2>
          <p>There are many exchanges where you can buy cryptocurrencies. Here are some of the most popular:</p>
          <div className='where-to-buy-links'>
            <a href='https://www.coinbase.com/' target='_blank' rel='noreferrer'>Coinbase</a>
            <a href='https://www.binance.com/en' target='_blank' rel='noreferrer'>Binance</a>
            <a href='https://www.bitstamp.net/' target='_blank' rel='noreferrer'>Bitstamp</a>
            <a href='https://www.kraken.com/' target='_blank' rel='noreferrer'>Kraken</a>
            <a href='https://www.bitfinex.com/' target='_blank' rel='noreferrer'>Bitfinex</a>
            <a href='https://www.bittrex.com/' target='_blank' rel='noreferrer'>Bittrex</a>
            <a href='https://www.gdax.com/' target='_blank' rel='noreferrer'>GDAX</a>
            <a href='https://www.coinmama.com/' target='_blank' rel='noreferrer'>Coinmama</a>
            </div>
        </div>
      </div></>
  );
}
