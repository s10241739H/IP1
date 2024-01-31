
//vote//
 
function toggleVoteContainer() {
    var voteContainer = document.querySelector('.votecontainer');
    voteContainer.style.display = (voteContainer.style.display === 'none' || voteContainer.style.display === '') ? 'flex' : 'none';
}



document.addEventListener("DOMContentLoaded", function () {
    var pickLocation = document.querySelector('.pickalocation');
    var locationDiv = document.querySelector('.location');
    var concertsContainer1 = document.querySelector('.concertscontainer1');

    pickLocation.addEventListener('click', function () {
        if (locationDiv.style.display === 'block') {
            locationDiv.style.display = 'none';
        } else {
            locationDiv.style.display = 'block';
        }
    });

    // Add event listener for the "Singapore" location
    var singaporeLocation = document.querySelector('.location p:first-child');
    singaporeLocation.addEventListener('click', function () {
        // Hide all concert containers
        var concertContainers = document.querySelectorAll('[class^="concertscontainer"]');
        concertContainers.forEach(function (container) {
            container.style.display = 'none';
        });

        // Show the concertscontainer1
        concertsContainer1.style.display = 'block';

        // Hide the location div after selecting a location
        locationDiv.style.display = 'none';
    });
});




//vvv ///
document.addEventListener('DOMContentLoaded', function () {
    var buttons = document.querySelectorAll('.votingcontents h2');
    buttons = Array.prototype.slice.call(buttons);

    buttons.forEach(function (button) {
        updateDude(button);

        button.addEventListener('click', function () {
            increaseScore(button);
        });
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getKeyFrom(button) {
        return 'score' + capitalizeFirstLetter(button.getAttribute('rel'));
    }

    function getScore(button) {
        return +localStorage.getItem(getKeyFrom(button)) || 0;
    }

    function setScore(button, score) {
        localStorage.setItem(getKeyFrom(button), score);
    }

    function updateDude(button) {
        var score = getScore(button),
            element = document.querySelector('#' + button.getAttribute('rel'));
        if (element) {
            element.textContent = score;
        }
    }

    function increaseScore(button) {
        var score = getScore(button);
        score++;

        setScore(button, score);

        updateDude(button);
    }
});