document.addEventListener("DOMContentLoaded", async function () {
  const usernameDisplay = document.getElementById("display-username");

  const clientId = "b6ff65d1ed1649bd883f61d2ce2576b2";
  const redirectUri = "https://s10241739h.github.io/VibeVault/indexlogged.html";
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



document.addEventListener("DOMContentLoaded", function () {
  // Hide the loading animation initially
  const loadingAnimation = document.getElementById("loadingAnimation");
  loadingAnimation.style.display = "none";

  // Simulate a loading process
  simulateLoading();
});

async function simulateLoading() {
  // Show the loading animation
  const loadingAnimation = document.getElementById("loadingAnimation");
  loadingAnimation.style.display = "block";

  try {
      // Simulate an asynchronous task (e.g., fetching data)
      await fetchData();

      // Hide the loading animation when the task is complete
      loadingAnimation.style.display = "none";
  } catch (error) {
      console.error("Error:", error);

      // Handle errors and hide the loading animation
      loadingAnimation.style.display = "none";
  }
}

async function fetchData() {
  // Simulate an asynchronous task (e.g., fetching data)
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // Simulate a successful response
          resolve();
      }, 2000); // Adjust the duration as needed
  });
}