import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('default');
  const [showIcons, setShowIcons] = useState(false);
  const [hideBorder, setHideBorder] = useState(false);
  const [countPrivate, setCountPrivate] = useState(false);
  const [stats, setStats] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    switch (name) {
      case 'username':
        setUsername(value.toLowerCase().replace(/\s+/g, ''));
        break;
      case 'theme':
        setTheme(value);
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
    if (!username) {
      setError('Please enter a username.');
      setStats(''); // Clear the stats if there's an error
      return;
    }

    const link = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&count_private=${countPrivate}`;
    setStats(link.toLowerCase().replace(/\s+/g, ''));
    setError('');
  };

  return (
    <div className='container'>
      <div className="flex">
        <label>
          Username:
        </label>
        <input type="text" name="username" value={username} onChange={handleInputChange} />
      </div>
      <br />

      <div className="flex">
        <label>
          Theme:
        </label>
        <select name="theme" value={theme} onChange={handleInputChange}>
          <option value="default">Default</option>
          <option value="dark">Dark</option>
          <option value="radical">Radical</option>
          <option value="murko">Murko</option>
          <option value="gruvbox">Gruvbox</option>
        </select>
      </div>
      <br />

      <div className="checkbox-container">
        <div className="checkbox-label">
          <label>
            Show Icons:
          </label>
          <input type="checkbox" name="show_icons" checked={showIcons} onChange={handleInputChange} />
        </div>

        <div className="checkbox-label">
          <label>
            Hide Border:
          </label>
          <input type="checkbox" name="hide_border" checked={hideBorder} onChange={handleInputChange} />
        </div>

        <div className="checkbox-label">
          <label>
            Count Private:
          </label>
          <input type="checkbox" name="count_private" checked={countPrivate} onChange={handleInputChange} />
        </div>
      </div>

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
        {stats && (
          <>
            <p>Generated Link:</p>
            <img src={stats} alt="Generated Link" />
          </>
        )}
      </div>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
