import React, { useState, useEffect } from "react";
import "./App.css";
import GitHubDependencyAnalyzer from "./GitHubDependencyAnalyzer";
import data from "./data.json";

const App = () => {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("default");
  const [showIcons, setShowIcons] = useState(false);
  const [hideBorder, setHideBorder] = useState(false);
  const [countPrivate, setCountPrivate] = useState(false);
  const [stats, setStats] = useState("");
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [layout, setLayout] = useState("compact");
  const [streakStats, setStreakStats] = useState("");
  const [langCard, setLangCard] = useState("");
  const [wakaTimeCard, setWakaTimeCard] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [themes, setThemes] = useState([]);
  const [iconTitles, setIconTitles] = useState([]);
  const [badgeData, setBadgeData] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredIconTitles, setFilteredIconTitles] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [badgeUrls, setBadgeUrls] = useState([]);
  const [generatedBadgeUrls, setGeneratedBadgeUrls] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const [isCopied, setIsCopied] = useState(false);
  const [badgeButtons, setBadgeButtons] = useState([]);
  const [template1, setTemplate1] = useState("");

  useEffect(() => {
    const iconTitlesData = data.icons.map((icon) => icon.title);
    console.log("Fetched icon titles:", iconTitlesData);
    setIconTitles(iconTitlesData);
  }, []);

  const filterSuggestions = (searchText) => {
    return iconTitles.filter(
      (item) =>
        (item && item.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.slug &&
          item.slug.toLowerCase().includes(searchText.toLowerCase()))
    );
  };

  const generateTemp1 = () => {
    const template = `# 🔮 About Me:
  
<!-- Introduction About Yourself -->
  
## 🌐 Socials:
  
![](https://img.shields.io/badge/instagram-100000?style=for-the-badge&logo=instagram&logoColor=white&labelColor=000000&color=E4405F)
![](https://img.shields.io/badge/linkedin-100000?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=000000&color=0A66C2')
![](https://img.shields.io/badge/twitter-100000?style=for-the-badge&logo=twitter&logoColor=white&labelColor=000000&color=1D9BF0)
![](https://img.shields.io/badge/youtube-100000?style=for-the-badge&logo=youtube&logoColor=white&labelColor=000000&color=FF0000)
  
    
<br />
  
## 👨‍💻 Tech Stack:
  
  ${selectedTitles.map((url, index) => (
    `![Tech Stack](${url.toLowerCase().replace(/\s+/g, '')})`
  )).join('\n')}
    
<br />
  
## 💻 Workspace Specs:
![kubuntu](https://img.shields.io/badge/kubuntu-100000?style=for-the-badge&logo=kubuntu&logoColor=white&labelColor=black&color=0079C1)
![republicofgamers](https://img.shields.io/badge/Rog-Strinx_G15-100000?style=for-the-badge&logo=republicofgamers&logoColor=white&labelColor=black&color=FF0029)
![amd](https://img.shields.io/badge/AMD-Ryzen_74800H-100000?style=for-the-badge&logo=amd&logoColor=white&labelColor=000000&color=ED1C24)
![nvidia](https://img.shields.io/badge/Nvidia-GTX_1650-100000?style=for-the-badge&logo=nvidia&logoColor=white&labelColor=000000&color=76B900)
    
<br />
  
## 📊 GitHub Stats:
  
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=${showIcons}&theme=${theme})
<br /><br />
![GitHub Streak Stats](https://github-readme-streak-stats.herokuapp.com?user=${username}&theme=${theme})
<br /><br />
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&hide_border=${hideBorder}&include_all_commits=false&count_private=${countPrivate}&layout=${layout})<br/><br />
Stats since June 10, 2023<br/>
![Wakatime Stats](https://github-readme-stats.vercel.app/api/wakatime?username=${username}&theme=${theme}&layout=${layout})

### ✍️ Random Quote
![Random Quote](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${theme})`;
  
    setTemplate1(template);
  
    const blob = new Blob([template], { type: 'text/markdown' });
  
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'about_me.md';
  
    // Append the link to the body and click it programmatically
    document.body.appendChild(link);
    link.click();
  
    // Remove the link from the body
    document.body.removeChild(link);
  }

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

  const handleIconInputChange = (event) => {
    const { value } = event.target;
    setSearchText(value);

    const filteredSuggestions = iconTitles.filter(
      (item) =>
        (item && item.toLowerCase().includes(value.toLowerCase())) ||
        (item.slug && item.slug.toLowerCase().includes(value.toLowerCase()))
    );

    setFilteredIconTitles(filteredSuggestions.slice(0, 6));
  };

  const handleIconSelect = (selectedTitle) => {
    console.log(`Selected icon title: ${selectedTitle}`);
    const icon = data.icons.find((icon) => icon.title === selectedTitle);

    if (icon) {
      const hexColor = icon.hex;
      console.log(hexColor);

      const url = `https://img.shields.io/badge/${selectedTitle}-100000?style=for-the-badge&logo=${selectedTitle}&logoColor=white&labelColor=black&color=${hexColor}`;

      setSelectedTitles((prevTitles) => [...prevTitles, url]);
    } else {
      console.error(`Icon not found for title: ${selectedTitle}`);
    }

    setSearchText(""); // Set selected title in the input
    setFilteredIconTitles([]); // Clear suggestions
  };

  const yourFunctionToProcessSelectedTitles = (selectedTitles) => {
    console.log("Selected Titles:", selectedTitles);
  };

  const generateBadgeUrl = (title) => {
    const icon = iconTitles.find((icon) => icon.title === title);

    if (icon) {
      return `https://img.shields.io/badge/${icon.title}-100000?style=for-the-badge&logo=${icon.title}&logoColor=white&labelColor=black&color=${icon.hex}`;
    }

    // return '';
  };

  const handleBadgeCopy = (badgeUrl, initialButtonText) => {
    navigator.clipboard.writeText(badgeUrl);

    // Update the button text and animation state for the copied badge
    setBadgeButtons((prevBadgeButtons) => {
      return prevBadgeButtons.map((button) => {
        if (button.badgeUrl === badgeUrl) {
          // Change the button text and set isCopied to true
          return { ...button, buttonText: "Copied", isCopied: true };
        } else {
          return button;
        }
      });
    });

    // Reset the button text and animation state after a certain delay (e.g., 2 seconds)
    setTimeout(() => {
      setBadgeButtons((prevBadgeButtons) => {
        return prevBadgeButtons.map((button) => {
          if (button.badgeUrl === badgeUrl) {
            // Reset the button text and isCopied to false
            return {
              ...button,
              buttonText: initialButtonText,
              isCopied: false,
            };
          } else {
            return button;
          }
        });
      });
    }, 2000);
  };

  const renderBadges = () => {
    return (
      <div>
        {selectedTitles.map((url, index) => (
          <div key={index}>
            <img
              onClick={() =>
                navigator.clipboard.writeText(`<img src="${url}">`)
              }
              src={url}
              alt={`Badge ${index + 1}`}
            />
            <br />
            <button
              onClick={() => handleBadgeCopy(url, "Copy")}
              className={
                badgeButtons.find((button) => button.badgeUrl === url)?.isCopied
                  ? "copied"
                  : ""
              }
            >
              {
                badgeButtons.find((button) => button.badgeUrl === url)
                  ?.buttonText
              }
            </button>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    // Initialize badge buttons when selectedTitles change
    const initialBadgeButtons = selectedTitles.map((url) => ({
      badgeUrl: url,
      buttonText: "Copy",
      isCopied: false,
    }));
    setBadgeButtons(initialBadgeButtons);
  }, [selectedTitles]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    switch (name) {
      case "username":
        setUsername(value.toLowerCase().replace(/\s+/g, ""));
        break;
      case "theme":
        setTheme(value.toLowerCase().replace(/\s+/g, ""));
        break;
      case "show_icons":
        setShowIcons(checked);
        break;
      case "hide_border":
        setHideBorder(checked);
        break;
      case "count_private":
        setCountPrivate(checked);
        break;
      default:
        break;
    }
  };

  const generateStreakStats = () => {
    const link = `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=${hideBorder}`;
    setStreakStats(link.toLowerCase().replace(/\s+/g, ""));
  };

  const generateLangCard = () => {
    if (layout === "no-progress") {
      const link = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&hide_progress=true`;
      setLangCard(link.toLowerCase().replace(/\s+/g, ""));
    } else {
      const link = `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&layout=${layout}`;
      setLangCard(link.toLowerCase().replace(/\s+/g, ""));
    }
  };

  const generateWakaTimeCard = () => {
    if (layout !== "compact") {
      const link = `https://github-readme-stats.vercel.app/api/wakatime?username=${username}&theme=${theme}`;
      setWakaTimeCard(link.toLowerCase().replace(/\s+/g, ""));
    } else {
      const link = `https://github-readme-stats.vercel.app/api/wakatime?username=${username}&layout=compact&theme=${theme}`;
      setWakaTimeCard(link.toLowerCase().replace(/\s+/g, ""));
    }
  };

  const generateStats = () => {
    if (!username) {
      setError("Please enter a username.");
      setStats("");
      return;
    }


    setIsLoading(true);

    const link = `https://github-readme-stats.vercel.app/api?username=${username}&theme=${theme}&show_icons=${showIcons}&hide_border=${hideBorder}&count_private=${countPrivate}`;

    const img = new Image();
    img.onload = () => {
      setStats(link.toLowerCase().replace(/\s+/g, ""));
      setIsLoading(false);
    };
    img.src = link;

    setError("");
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
    <div className="outer_container">
      <div className="container">
        <div className="flex">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <br />

        <div className="flex">
          <label>Theme:</label>
          <select name="theme" value={theme} onChange={handleInputChange}>
            <option value="Default">Default</option>
            <option value="Dark">Dark</option>
            <option value="Radical">Radical</option>
            <option value="Murko">Murko</option>
            <option value="Gruvbox">Gruvbox</option>
            <option value="Tokyo Night">Tokyo Night</option>
            <option value="One Dark">One Dark</option>
            <option value="Cobalt">Cobalt</option>
            <option value="Synthwave">Synthwave</option>
            <option value="High Contrast">High Contrast</option>
            <option value="Dracula">Dracula</option>
            <option value="Prussian">Prussian</option>
            <option value="Monokai">Monokai</option>
            <option value="Vue">Vue</option>
            <option value="Vue Dark">Vue Dark</option>
            <option value="Shades of Purple">Shades of Purple</option>
            <option value="Nightowl">Nightowl</option>
            <option value="Buefy">Buefy</option>
            <option value="Blue-Green">Blue-Green</option>
            <option value="Algolia">Algolia</option>
            <option value="Great Gatsby">Great Gatsby</option>
            <option value="Darcula">Darcula</option>
            <option value="Bear">Bear</option>
            <option value="Solarized Dark">Solarized Dark</option>
            <option value="Solarized Light">Solarized Light</option>
            <option value="Chartreuse Dark">Chartreuse Dark</option>
            <option value="Nord">Nord</option>
            <option value="Gotham">Gotham</option>
            <option value="Material Palenight">Material Palenight</option>
            <option value="Graywhite">Graywhite</option>
            <option value="Vision Friendly Dark">Vision Friendly Dark</option>
            <option value="Ayu Mirage">Ayu Mirage</option>
            <option value="Midnight Purple">Midnight Purple</option>
            <option value="Calm">Calm</option>
            <option value="Flag India">Flag India</option>
            <option value="Omni">Omni</option>
            <option value="Jolly">Jolly</option>
            <option value="Maroongold">Maroongold</option>
            <option value="Yeblu">Yeblu</option>
            <option value="Blueberry">Blueberry</option>
            <option value="Slateorange">Slateorange</option>
            <option value="Kacho Ga">Kacho Ga</option>
            <option value="Outrun">Outrun</option>
          </select>
        </div>
        <br />

        <div className="checkbox-container">
          <div className="checkbox-label">
            <label>Show Icons:</label>
            <input
              type="checkbox"
              name="show_icons"
              checked={showIcons}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkbox-label">
            <label>Hide Border:</label>
            <input
              type="checkbox"
              name="hide_border"
              checked={hideBorder}
              onChange={handleInputChange}
            />
          </div>

          <div className="checkbox-label">
            <label>Count Private:</label>
            <input
              type="checkbox"
              name="count_private"
              checked={countPrivate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <br />
        <div className="bottom">
          <label>Icon Title:</label>
          <div className="input-container">
            <input
              type="text"
              name="iconTitle"
              placeholder="Search for an icon title..."
              value={searchText}
              onChange={handleIconInputChange}
            />
            {filteredIconTitles.length > 0 && (
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
            )}
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
                <br />
                <br />
                <div>
                  {selectedTitles.map((url, index) => (
                    <div key={index}>
                      <img
                        onClick={() =>
                          navigator.clipboard.writeText(`<img src="${url}">`)
                        }
                        src={url}
                        alt={`Badge ${index + 1}`}
                      />
                      <br />
                      {/* {console.log(url)} */}
                    </div>
                  ))}
                </div>

                <br />
                <p>Generated Link:</p>
                <img src={stats} alt="Generated Link" />
                <p>Generated Streak Stats:</p>
                <img src={streakStats} alt="Generated Link" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<img src="${streakStats}" alt="${username}'s Streak Stats" />`
                    );
                  }}
                >
                  Copy
                </button>
                <br />

                <p>Generated Language Card:</p>
                <img src={langCard} alt="Generated Link" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<img src="${langCard}" alt="${username}'s Lang Card" />`
                    );
                  }}
                >
                  Copy
                </button>
                <br />

                <p>Generated WakaTime Card:</p>
                <img src={wakaTimeCard} alt="Generated Link" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `<img src="${streakStats}" alt="${username}'s Wakatime Stats" />`
                    );
                  }}
                >
                  Copy
                </button>
                <br />
              </>
            )
          )}
        </div>

        {error && <p className="error">{error}</p> && username}
        <GitHubDependencyAnalyzer Username={username} />
        <button onClick={generateTemp1}>Generate From Template</button>

      </div>
    </div>
  );
};

export default App;
