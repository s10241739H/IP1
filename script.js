window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  // Existing scroll function
}

function displayImagesOpacity() {
  // Existing code for displaying images opacity
}

window.addEventListener("load", function () {
  displayImagesOpacity();
  displayImagesSlider();
});

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (username === "hello" && password === "password") {
      alert("You have successfully logged in.");
      location.reload();
  } else {
      loginErrorMsg.style.opacity = 1;
  }
});

import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists/SpotifyGetPlaylists";
import "./style.css";

const clientId = "b6ff65d1ed1649bd883f61d2ce2576b2";
const redirectUrlAfterLogin = "http://127.0.0.1:5503/index.html";
const scopes = [
  "user-read-top-read",
];
const spotifyAuthorizeEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrlAfterLogin}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const WebApp = () => {
  useEffect(() => {
      if (window.location.hash) {
          const { access_token, expires_in, token_type } = window.location.hash
              .substring(1)
              .split("&")
              .reduce((acc, param) => {
                  const [key, value] = param.split("=");
                  acc[key] = value;
                  return acc;
              }, {});

          localStorage.clear();
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);
      }
  }, []);

  useEffect(() => {
      // Fetch and display top tracks
      getTopTracks();
  }, []); // Run only once after component mounts

  return (
      <div class="container">
          <h1>hi</h1>
          <a href={spotifyAuthorizeEndpoint}>
              <button>Login to Spotify</button>
          </a>
          <SpotifyGetPlaylists />
      </div>
  );
};

export default WebApp;

async function getProfile() {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
          Authorization: 'Bearer ' + accessToken
      }
  });

  if (response.ok) {
      const data = await response.json();
      console.log('User Profile Data:', data);
  } else {
      console.error('Error fetching user profile:', response.status);
  }
}

async function getTopTracks() {
  const accessToken = localStorage.getItem('accessToken');

  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
          Authorization: 'Bearer ' + accessToken
      }
  });

  if (response.ok) {
      const data = await response.json();
      console.log('Top Tracks Data:', data);

      // Call the function to display the top tracks
      displayTopTracks(data.items);
  } else {
      console.error('Error fetching top tracks:', response.status);
  }
}

function displayTopTracks(tracks) {
  // Display logic for top tracks
}



