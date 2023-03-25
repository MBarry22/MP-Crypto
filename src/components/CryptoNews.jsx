import React, { useState, useEffect } from "react";
import axios from "axios";

const CryptoNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: 'GET',
        url: 'https://cryptoinfo.p.rapidapi.com/api/private/latest_news/rapid_api/news/5',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '03c21f2263mshb829f69c279c2f0p196131jsn68f60ebe0c46',
          'X-RapidAPI-Host': 'cryptoinfo.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        setNews(response.data.articles);
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
    <div>
      <h1>Crypto News</h1>
      {news.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default CryptoNews;
