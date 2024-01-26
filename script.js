window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
}


function displayImagesOpacity() {
    var images = document.querySelectorAll(".merchimg img");
  
    for (var i = 0; i < images.length; i++) {
      images[i].style.opacity = "1";
    }
  }
  
  window.addEventListener("load", function () {
    displayImagesOpacity();
    displayImagesSlider();
  });
  
  
  document.addEventListener("DOMContentLoaded", function() {
    
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
window.addEventListener("scroll", reveal);
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
})




import SpotifyGetPlaylists from "./components/SpotifyGetPlaylists/SpotifyGetPlaylists";
import "./style.css";

const clientId = "b6ff65d1ed1649bd883f61d2ce2576b2";
const redirectUrlAfterLogin = "http://127.0.0.1:5500/index2.html";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
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

  return (
    <div className="container">
      <h1>hi</h1>
      <a href={spotifyAuthorizeEndpoint}>
        <button>Login to Spotify</button>
      </a>
      <SpotifyGetPlaylists />
    </div>
  );
};

export default WebApp;

