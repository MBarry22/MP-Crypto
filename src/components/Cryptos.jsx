import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cryptos.css';

export default function Cryptos(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const fetchData = useCallback(() => {
    axios
      .get('https://api.coinlore.net/api/tickers/')
      .then((res) => {
        setData(res.data.data.slice(0, 100));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 20000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  const handleSort = (field) => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFavorite = (crypto) => {
    const newFavorites = [...favorites, crypto];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const filteredData = data.filter((crypto) => {
    return crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  
  return (
    <div className="crypto-wrapper">
      <div className="crypto-header">
        <h1 className="crypto-title">Top 100 Crypto's</h1>
        <div className="crypto-search">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="crypto-body">
        <div className="crypto-table">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('rank')}>Rank</th>
                <th onClick={() => handleSort('name')}>Name</th>
                <th onClick={() => handleSort('price_usd')}>Price</th>
                <th onClick={() => handleSort('market_cap_usd')}>Market Cap</th>
                <th onClick={() => handleSort('volume24')}>24h Volume</th>
                <th onClick={() => handleSort('percent_change_24h')}>Change</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((crypto) => (
                <tr key={crypto.id}>
                  <td>{crypto.rank}</td>
                  <td className='name'>
                    <Link to={`/cryptos/${crypto.id}`}>
                      {crypto.name}
                    </Link>
                  </td>
                  <td>${crypto.price_usd}</td>
                  <td>${crypto.market_cap_usd}</td>
                  <td>${crypto.volume24}</td>
                  <td>{crypto.percent_change_24h}%</td>
                  <td>
                    <button
                      className="favorite-btn"
                      onClick={() => handleFavorite(crypto)}
                    >
                      Favorite
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

                     
