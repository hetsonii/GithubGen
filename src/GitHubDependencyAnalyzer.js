import React, { useState } from 'react';
import axios from 'axios';

const GitHubDependencyAnalyzer = ({ Username }) => {
  const [topDependencies, setTopDependencies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const personalAccessToken = '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';
  console.log(Username)

  const fetchPackageJson = async () => {
    setIsLoading(true);

    try {
      const axiosInstance = axios.create({
        headers: {
          'Authorization': `token ${personalAccessToken}`,
          'Accept': 'application/vnd.github.v3.raw',
        },
      });

      const response = await axiosInstance.get(`https://api.github.com/users/${Username}/repos`);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch repositories. Status Code: ${response.status}`);
      }

      const repositories = response.data;

      if (repositories.length === 0) {
        console.log('No repositories found for this user.');
        return;
      }

      const dependencyCounts = {};

      for (const repo of repositories) {
        const repoLink = repo.html_url;
        const repoApiLink = `https://api.github.com/repos/${repoLink.replace('https://github.com/', '')}/contents/package.json`;

        try {
          const packageJsonResponse = await axiosInstance.get(repoApiLink);

          if (packageJsonResponse.status === 200) {
            const packageJsonContent = packageJsonResponse.data;

            if (packageJsonContent.dependencies) {
              for (const dependency in packageJsonContent.dependencies) {
                if (dependencyCounts[dependency]) {
                  dependencyCounts[dependency]++;
                } else {
                  dependencyCounts[dependency] = 1;
                }
              }
            }
          } else {
            console.log(`No package.json file found for ${repo.name}`);
          }
        } catch (error) {
          console.error(`Error fetching package.json for ${repo.name}:`, error.message);
        }
      }

      const sortedDependencies = Object.entries(dependencyCounts).sort((a, b) => b[1] - a[1]);
      const top10Dependencies = sortedDependencies.slice(0, 10).map(([dependency, count]) => ({ name: dependency, count }));

      setTopDependencies(top10Dependencies);

      console.log('Top 10 most used dependencies by this user:');
      console.log(top10Dependencies);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchPackageJson} disabled={isLoading}>
        {isLoading ? 'Fetching...' : 'Fetch Top 10 Dependencies'}
      </button>
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ul>
          {topDependencies.map((dep, index) => (
            <li key={index}>
              {dep.name}: {dep.count}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GitHubDependencyAnalyzer;
//  White Gloves Gang
