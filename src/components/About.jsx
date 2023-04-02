import "../styles/About.css";
import real_time_prices from  "../assets/images/real_time_prices.jpg";
import tracking from "../assets/images/tracking.jpg";
import news from "../assets/images/news.jpg";


export default function About() {
  const placeholderImage = "https://via.placeholder.com/150";
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">About MP-CRYPTO</h1>
      </div>
      <div className="about-body">
        <p className="about-text">
          CryptoTracker is a free web application that allows users to track the prices of various cryptocurrencies in real-time. Our goal is to provide accurate and up-to-date information to help users make informed decisions when investing in the crypto market.
        </p>
        <div className="about-features">
          <div className="about-feature">
            <img
              src={real_time_prices}
              alt="Feature 1"
              className="about-feature-image"
            />
            <h2 className="about-feature-title">Real-time Price Updates</h2>
            <p className="about-feature-text">
              CryptoTracker uses the latest technology to provide real-time price updates for all the major cryptocurrencies. This allows users to stay on top of the latest market trends and make informed investment decisions.
            </p>
          </div>
          <div className="about-feature">
            <img
              src={tracking}
              alt="Feature 2"
              className="about-feature-image"
            />
            <h2 className="about-feature-title">Personalized Portfolio Tracking</h2>
            <p className="about-feature-text">
              With CryptoTracker, users can create a personalized portfolio of their favorite cryptocurrencies and track their performance over time. This feature allows users to see how their investments are performing and make adjustments as needed.
            </p>
          </div>
          <div className="about-feature">
            <img
              src={news}
              alt="Feature 3"
              className="about-feature-image"
            />
            <h2 className="about-feature-title">News and Analysis</h2>
            <p className="about-feature-text">
              CryptoTracker provides users with the latest news and analysis from top sources in the crypto industry. This feature helps users stay informed about the latest developments in the market and make informed investment decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
