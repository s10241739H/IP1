document.addEventListener("DOMContentLoaded", async function () {
  const usernameDisplay = document.getElementById("display-username");

  const clientId = "b6ff65d1ed1649bd883f61d2ce2576b2";
  const redirectUri = "http://127.0.0.1:5503/html/profile.html";
  const scopes = ["user-read-private", "user-read-email"];

  const token = window.location.hash.substring(1).split("&").reduce((acc, param) => {
      const [key, value] = param.split("=");
      acc[key] = value;
      return acc;
  }, {})["access_token"];

  if (token) {
      await getProfile(token);
  }

  async function getProfile(token) {
      const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      if (response.ok) {
          const data = await response.json();
          console.log("User Profile Data:", data);

          // Update your UI with the user data
          if (usernameDisplay) {
              usernameDisplay.textContent = `Welcome, ${data.display_name}!`;
              usernameDisplay.style.display = "block";
          }
      } else {
          console.error("Error fetching user profile:", response.status);
      }
  }
});