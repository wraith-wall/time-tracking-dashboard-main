"use strict";
// Step 1: Fetch JSON data from a local file
function fetchData() {
  const url = "data.json";
  fetch(url)
    .then(function (response) {
      // Convert the response to JSON
      return response.json();
    })
    .then(function (json) {
      const data = json;
      // Call the function to modify the DOM with the fetched data
      modifyDOM(data, "daily"); // Default to showing daily
      setupButtons(data); // Add event listeners to buttons
    })
    .catch(function (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching data:", error);
    });
}

// Step 2: Modify the DOM with the fetched data
function modifyDOM(data, selectedTimeframe) {
  // Get the container element where we will add the data
  const container = document.getElementById("tracker__container");

  // Clear the container before adding new content
  container.innerHTML = "";

  // Map titles to color classes
  const colorMap = {
    Work: "tracker__entry--orange",
    Play: "tracker__entry--blue",
    Study: "tracker__entry--red",
    Exercise: "tracker__entry--green",
    Social: "tracker__entry--purple",
    "Self Care": "tracker__entry--yellow",
  };

  // Loop through each entry in the data
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];

    // Create a new article element for each entry
    const entryArticle = document.createElement("article");
    entryArticle.className = "tracker__entry";

    const colorClass = colorMap[entry.title] || "";
    entryArticle.className = `tracker__entry ${colorClass}`;

    // Add the title of the entry
    const title = document.createElement("h2");
    title.textContent = entry.title;
    entryArticle.appendChild(title);

    // Add the selected timeframe data
    const timeframeData = entry.timeframes[selectedTimeframe];
    const timeframePara = document.createElement("p");

    // Create divs for each part of the text
    const currentHoursDiv = document.createElement("div");
    const previousHoursDiv = document.createElement("div");

    // Customize the text based on the selected timeframe
    if (selectedTimeframe === "daily") {
      currentHoursDiv.textContent = `${timeframeData.current}hrs`;
      previousHoursDiv.textContent = `Yesterday - ${timeframeData.previous}hrs`;
    } else if (selectedTimeframe === "weekly") {
      currentHoursDiv.textContent = `${timeframeData.current}hrs`;
      previousHoursDiv.textContent = `Last Week - ${timeframeData.previous}hrs`;
    } else if (selectedTimeframe === "monthly") {
      currentHoursDiv.textContent = `${timeframeData.current}hrs`;
      previousHoursDiv.textContent = `Last Month - ${timeframeData.previous}hrs`;
    }

    // Add classes to the spans for styling
    currentHoursDiv.classList.add("tracker__current-timeframe");
    previousHoursDiv.classList.add("tracker__previous-timeframe");

    // Append the divs to the paragraph
    timeframePara.appendChild(currentHoursDiv);
    timeframePara.appendChild(previousHoursDiv);

    // Append the paragraph to the entry article
    entryArticle.appendChild(timeframePara);

    // Append the entry div to the container
    container.appendChild(entryArticle);
  }
}

// Step 3: Set up timeframe buttons and event listeners
function setupButtons(data) {
  const timeframeButtons = document.querySelectorAll(".tracker__button");
  const activeButtons = document.querySelectorAll(".button");

  if (activeButtons.length > 0) {
    activeButtons[0].classList.add("active");
  }

  timeframeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedTimeframe = button.dataset.timeframe; // Get the selected timeframe
      modifyDOM(data, selectedTimeframe);
    });
  });

  activeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");
    });
  });
}

// Step 4: Call the fetchData function to start the process
fetchData();
