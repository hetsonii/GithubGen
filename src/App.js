import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('');
  const [showIcons, setShowIcons] = useState(false);
  const [hideBorder, setHideBorder] = useState(false);
  const [countPrivate, setCountPrivate] = useState(false);
  const [stats, setStats] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    switch (name) {
      case 'username':
        setUsername(value.toLowerCase().replace(/\s+/g, '')); // Convert to lowercase and remove spaces
        break;
      case 'theme':
        setTheme(value.toLowerCase().replace(/\s+/g, '')); // Convert to lowercase and remove spaces
        break;
      case 'show_icons':
        setShowIcons(checked);
        break;
      case 'hide_border':
        setHideBorder(checked);
        break;
      case 'count_private':
        setCountPrivate(checked);
        break;
      default:
        break;
    }
  };

  const generateStats = () => {
    const link = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&count_private=${countPrivate}`;
    setStats(link.toLowerCase().replace(/\s+/g, '')); // Convert generated link to lowercase and remove spaces
  };

  return (
    <div>
      <label>
        Username:
      </label>
      <input type="text" name="username" value={username} onChange={handleInputChange} />
      <br />

      <label>
        Theme:
      </label>
      <input type="text" name="theme" value={theme} onChange={handleInputChange} />
      <br />

      <label>
        Show Icons:
      </label>
      <input type="checkbox" name="show_icons" checked={showIcons} onChange={handleInputChange} />
      <br />

      <label>
        Hide Border:
      </label>
      <input type="checkbox" name="hide_border" checked={hideBorder} onChange={handleInputChange} />
      <br />

      <label>
        Count Private:
      </label>
      <input type="checkbox" name="count_private" checked={countPrivate} onChange={handleInputChange} />
      <br />
      <br />

      <div>
        <p>Username: {username}</p>
        <p>Theme: {theme}</p>
        <p>Show Icons: {showIcons.toString()}</p>
        <p>Hide Border: {hideBorder.toString()}</p>
        <p>Count Private: {countPrivate.toString()}</p>
      </div>

      <br />
      <button onClick={generateStats}>Generate Link</button>
      <br />
      <div>
        <p>Generated Link:</p>
        <img src={stats} alt="Generated Link" />
      </div>
    </div>
  );
}

export default App;
