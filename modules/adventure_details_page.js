import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // console.log(search.split("=")[1]);
  return search.split("=")[1];

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // console.log(adventureId);
  try {
    let url =
      config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
    const response = await fetch(url);
    var data = await response.json();

    // Place holder for functionality to work in the Stubs
    return data;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let h1 = document.getElementById("adventure-name");
  h1.textContent = adventure.name;
  let para = document.getElementById("adventure-subtitle");
  para.textContent = adventure.subtitle;

  let photoGallery = document.getElementById("photo-gallery");
  let images = adventure.images;

  images.forEach((image) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", `${image}`);
    img.setAttribute("class", "activity-card-image");
    div.appendChild(img);
    photoGallery.appendChild(div);
  });

  let content = document.getElementById("adventure-content");
  let paragraph = document.createElement("p");
  paragraph.textContent = adventure.content;
  content.appendChild(paragraph);

  let costPerHead = document.getElementById("reservation-person-cost");
  let costArea = document.createElement("span");
  costArea.textContent = adventure.costPerHead;
  costPerHead.appendChild(costArea);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById("photo-gallery");
  let div = document.createElement("div");
  div.setAttribute("id", "carouselExampleIndicators");
  div.setAttribute("class", "carousel slide");
  div.setAttribute("data-bs-ride", "carousel");

  div.innerHTML = `
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      a
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;

  photoGallery.parentNode.replaceChild(div, photoGallery);

  let innerDiv = document.querySelector(".carousel-inner");

  for (let i = 0; i < images.length; i++) {
    if (i == 0) {
      let div = document.createElement("div");
      div.setAttribute("class", "carousel-item active");

      let img = document.createElement("img");
      img.setAttribute("class", "d-block w-100 activity-card-image");
      img.setAttribute("src", `${images[i]}`);

      div.appendChild(img);
      innerDiv.appendChild(div);
    } else {
      let div = document.createElement("div");
      div.setAttribute("class", "carousel-item");

      let img = document.createElement("img");
      img.setAttribute("class", "d-block w-100 activity-card-image");
      img.setAttribute("src", `${images[i]}`);

      div.appendChild(img);
      innerDiv.appendChild(div);
    }
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  // console.log(adventure);

  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  // document.getElementById('myForm').addEventListener('submit', async (e) => {
  let formDetail = document.getElementById("myForm");
  formDetail.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = {
      adventure: adventure.id,
      // name: e.target.name.value,
      name: formDetail.elements["name"].value,
      // date: e.target.date.value,
      date: formDetail.elements["date"].value,
      // person: e.target.person.value
      person: formDetail.elements["person"].value,
    };
    // console.log("formData", formData);

    let response = await fetch(config.backendEndpoint + "/reservations/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    let result = await response.json();
    if (result.success) alert("Success1!");
    else alert("Failed!1");
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
