import { func } from "prop-types";

const id = "YOUR_CLIENT_ID";
const secId = "YOUR_SECRET_ID";
const query = `client_id=${id}&client_secret=${secId}`;

async function getProfile(username) {
  const res = await fetch(`https://api.github.com/users/${username}?${query}`);
  const profile = await res.json();

  if(profile.message) throw new Error(profile.message); 
  return profile;
}

export async function getRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?${query}&per_page=100`);
  const repos = await res.json();
  
  if(repos.message) throw new Error(repos.message);
  return repos;
}

async function getStarCount(repos) {
  return repos.reduce((res, { stargazers_count }) => res + stargazers_count, 0);
}

async function calculateScore(followers, repos) {
  return (followers * 3) + await getStarCount(repos);
}

async function getUserData(username) {
  const [profile, repos] = await Promise.all([getProfile(username), getRepos(username)]);
  const score = await calculateScore(profile.followers, repos);
  return ({
    profile,
    score,
  })
}

export async function battle({ playerOne, playerTwo }) {
  const data = await Promise.all([ getUserData(playerOne), getUserData(playerTwo) ]);
  return data.sort((a, b) => b.score - a.score); 
}

export async function fetchPopularRepos (language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  const res = await fetch(endpoint);
  const data = await res.json();

  if (!data.items) throw new Error(data.message);
  return data.items;
}