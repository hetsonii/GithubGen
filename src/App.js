import React, { useState, useEffect } from 'react';
import './App.css';
import GitHubDependencyAnalyzer from './GitHubDependencyAnalyzer';
import data from './data.json'

const App = () => {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('default');
  const [showIcons, setShowIcons] = useState(false);
  const [hideBorder, setHideBorder] = useState(false);
  const [countPrivate, setCountPrivate] = useState(false);
  const [stats, setStats] = useState('');
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [layout, setLayout] = useState('compact');
  const [streakStats, setStreakStats] = useState('');
  const [langCard, setLangCard] = useState('');
  const [wakaTimeCard, setWakaTimeCard] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const [iconTitles, setIconTitles] = useState([]);
  const [badgeData, setBadgeData] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredIconTitles, setFilteredIconTitles] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [badgeUrls, setBadgeUrls] = useState([]);
  const [generatedBadgeUrls, setGeneratedBadgeUrls] = useState([]);

  useEffect(() => {
    const iconTitlesData = data.icons.map(icon => icon.title);
    console.log('Fetched icon titles:', iconTitlesData);
    setIconTitles(iconTitlesData);
  }, []);


  const filterSuggestions = (searchText) => {
    return iconTitles.filter(
      (item) =>
        (item.title && item.title.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.slug && item.slug.toLowerCase().includes(searchText.toLowerCase())) 
    );
  };



  const handleSearchInputChange = (event) => {
    const searchText = event.target.value;
    setSearchInput(searchText);

    if (searchText) {
      const filteredSuggestions = filterSuggestions(searchText);
      setSuggestions(filteredSuggestions.slice(0, 6)); // Show only top 6 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (selectedTitle) => {
    setSearchInput(selectedTitle);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const handleIconInputChange = event => {
    const { value } = event.target;
    setSearchText(value);

    const filteredSuggestions = iconTitles.filter(
      item =>
        (item && item.toLowerCase().includes(value.toLowerCase())) ||
        (item.slug && item.slug.toLowerCase().includes(value.toLowerCase()))
    );

    setFilteredIconTitles(filteredSuggestions.slice(0, 6));
  };

  const handleIconSelect = (selectedTitle) => {
    console.log(`Selected icon title: ${selectedTitle}`);
    const icon = iconTitles.find((icon) => icon.title === selectedTitle);

    setSelectedTitles((prevTitles) => [...prevTitles, `https://img.shields.io/badge/${selectedTitle}-100000?style=for-the-badge&logo=${selectedTitle}&logoColor=white&labelColor=black&color=${title => (iconTitles.find(icon => icon.title === title) || {}).hex}`]);
    setSearchText();
    // setFilteredIconTitles(['']);
  };


  const yourFunctionToProcessSelectedTitles = (selectedTitles) => {
    console.log('Selected Titles:', selectedTitles);
  };

  const generateBadgeUrl = (title) => {
    const icon = iconTitles.find((icon) => icon.title === title);
    // console.log(icon);

    if (icon) {
      return `https://img.shields.io/badge/${icon.title}-100000?style=for-the-badge&logo=${icon.title}&logoColor=white&labelColor=black&color=${icon.hex}`;
    }

    // return '';
  };



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

  const generateStreakStats = () => {
    const link = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=${hideBorder}`;
    setStreakStats(link.toLowerCase().replace(/\s+/g, ''));
  };

  const generateLangCard = () => {
    if (layout === 'no-progress') {
      const link = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&hide_progress=true`;
      setLangCard(link.toLowerCase().replace(/\s+/g, ''));
    } else {
      const link = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&layout=${layout}`;
      setLangCard(link.toLowerCase().replace(/\s+/g, ''));
    }
  };

  const generateWakaTimeCard = () => {
    if (layout !== 'compact') {
      const link = `https://github-readme-stats.vercel.app/api/wakatime?username=${username}&theme=${theme}`;
      setWakaTimeCard(link.toLowerCase().replace(/\s+/g, ''));
    } else {
      const link = `https://github-readme-stats.vercel.app/api/wakatime?username=${username}&layout=compact&theme=${theme}`;
      setWakaTimeCard(link.toLowerCase().replace(/\s+/g, ''));
    }
  };

  const generateStats = () => {
    if (!username) {
      setError('Please enter a username.');
      setStats('');
      return;
    }

    setIsLoading(true);

    const link = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&count_private=${countPrivate}`;

    const img = new Image();
    img.onload = () => {
      setStats(link.toLowerCase().replace(/\s+/g, ''));
      setIsLoading(false);
    };
    img.src = link;

    setError('');
  };



  const handleSubmitClick = () => {
    generateStats();
    generateStreakStats();
    generateLangCard();
    generateWakaTimeCard();

    const generatedUrls = selectedTitles.map(generateBadgeUrl);
    setGeneratedBadgeUrls(generatedUrls);

    // Update badgeUrls with the badge URLs of selected titles
    const badgeUrlsForSelectedTitles = selectedTitles.map(generateBadgeUrl);
    setBadgeUrls(badgeUrlsForSelectedTitles);
    // {console.log(badgeUrls);}
    yourFunctionToProcessSelectedTitles(selectedTitles);
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
      <div className="flex">
        <label>Icon Title:</label>
        <input
          type="text"
          name="iconTitle"
          placeholder="Search for an icon title..."
          value={searchText}
          onChange={handleIconInputChange}
        />
        <div className="suggestions">
          {filteredIconTitles.map((title, index) => (
            <div
              key={index}
              className="suggestions-item"
              onClick={() => handleIconSelect(title)}
            >
              {title}
            </div>
          ))}
        </div>
      </div>

      <br />
      <button onClick={handleSubmitClick}>Generate Badges</button>
      <br />
      <div>
        {isLoading ? (
          <div className="skeleton-loader-container">
            <div className="skeleton-loader"></div>
          </div>
        ) : (
          stats && (
            <>
              <p>Generated Link:</p>
              <img src={stats} alt="Generated Link" />
              <p>Generated Streak Stats:</p>
              <img src={streakStats} alt="Generated Link" />
              <br />

              <p>Generated Language Card:</p>
              <img src={langCard} alt="Generated Link" />
              <br />

              <p>Generated WakaTime Card:</p>
              <img src={wakaTimeCard} alt="Generated Link" />
              <br />
              <div>
                {selectedTitles.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={`Badge ${index + 1}`} />
                    <br />
                    {console.log(url)}
                  </div>
                ))}
              </div>

            </>
          )

        )}
      </div>

      {error && <p className="error">{error}</p>}
      <GitHubDependencyAnalyzer />
    </div>
  );
};

export default App;
