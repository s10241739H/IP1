document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "a064044b17d1fb347d58fa9635234936b5776";
    getContacts();
    document.getElementById("add-update-msg").style.display = "none";

    document.getElementById("contact-submit").addEventListener("click", function (e) {
        e.preventDefault();

        let signinUsername = document.getElementById("signin-username").value;
        let signinPassword = document.getElementById("signin-password").value;

        let jsondata = {
            "Username": signinUsername,
            "Password": signinPassword,
        };

        let settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(jsondata),
            beforeSend: function () {
                document.getElementById("contact-submit").disabled = true;
                document.getElementById("add-contact-form").reset();
            }
        };

        fetch("https://ip2024-b27a.restdb.io/rest/signin", settings)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Extract the username from the response data
                const username = data[0].Username;
    
                // Display the username in a specific HTML element
                document.getElementById("username-display").innerText = `Welcome, ${username}!`;
    
                // Redirect to index.html
                window.location.href = "../index.html";
            } else {
                // Handle unsuccessful sign-in
                document.getElementById("login-error-msg").style.display = "block";
                setTimeout(function () {
                    document.getElementById("login-error-msg").style.display = "none";
                }, 3000);
            }
    
            document.getElementById("contact-submit").disabled = false;
            getContacts();

        });
    
    });

  
    function getContacts(limit = 10, all = true) {
      let settings = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      }
  
      fetch("https://ip2024-b27a.restdb.io/rest/signin", settings)
        .then(response => response.json())
        .then(response => {
          let content = "";
  
          for (var i = 0; i < response.length && i < limit; i++) {
            content = `${content}<tr id='${response[i]._id}'>
                <td>${response[i].username}</td>
                <td>${response[i].password}</td>
                <td>
                    <a href='#' class='delete' data-id='${response[i]._id}'>Delete</a>
                </td>
            </tr>`;
          }
  
          document.getElementById("contact-list").getElementsByTagName("tbody")[0].innerHTML = content;
          document.getElementById("total-contacts").innerHTML = response.length;
        });
    }
  
    document.getElementById("contact-list").addEventListener("click", function (e) {
      if (e.target.classList.contains("delete")) {
        e.preventDefault();
        let contactId = e.target.dataset.id;
        deleteContact(contactId);
      }
    });
  
    function deleteContact(id) {
      const settings = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
      };
  
      fetch(`https://ip2024-b27a.restdb.io/rest/signin/${id}`, settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          getContacts();
        })
        .catch(error => console.error("Error deleting contact:", error));
    }
  });