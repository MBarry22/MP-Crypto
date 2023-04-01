import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CryptoNews.css";

const CryptoNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: "GET",
        url: "https://min-api.cryptocompare.com/data/v2/news/?lang=EN",
        headers: {
          "Content-Type": "application/json",
          authorization:
            "Apikey 2c3772b79d1d8fc8d25beaa21496b8f32cdb69ed5711e88516702c6a457a8fa3",
        },
      };
      try {
        const response = await axios.request(options);
        setNews(response.data.Data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNews();
    const interval = setInterval(() => {
      fetchNews();
    }, 5 * 60 * 1000); // fetch news every 5 minutes
    return () => clearInterval(interval);
  }, []);

  if (news.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="crypto-news-container">
      
      <div className="crypto-news-grid">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="crypto-news-item"
          >
            <div className="crypto-news-image-container">
              <img
                src={article.imageurl}
                alt={article.title}
                className="crypto-news-image"
              />
            </div>
            <div className="crypto-news-content">
              <h2 className="crypto-news-title">{article.title}</h2>
              <p className="crypto-news-body">{article.body}</p>
              <div className="crypto-news-meta">
                <p className="crypto-news-source">{article.source_info.name}</p>
                <p className="crypto-news-date">
                  {new Date(article.published_on * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
