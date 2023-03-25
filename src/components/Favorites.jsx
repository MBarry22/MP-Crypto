import React, { useState, useEffect } from 'react';
import '../styles/Favorites.css';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-wrapper">
      <h1 className="favorites-title">My Favorites</h1>
      <div className="favorites-body">
        <div className="favorites-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Price</th>
                <th>Market Cap</th>
                <th>24h Volume</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((crypto) => (
                <tr key={crypto.id}>
                  <td>{crypto.rank}</td>
                  <td>{crypto.name}</td>
                  <td>${crypto.price_usd}</td>
                  <td>${crypto.market_cap_usd}</td>
                  <td>${crypto.volume24}</td>
                  <td>{crypto.percent_change_24h}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
