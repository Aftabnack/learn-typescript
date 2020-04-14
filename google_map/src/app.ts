const form = document.querySelector("form")!;
const input = document.getElementById("address") as HTMLInputElement;
const GAPI_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

function searchHandler(evt: Event) {
  evt.preventDefault();
  const address = input.value;
  const sanitizeInput = encodeURIComponent(address);
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${sanitizeInput}&key=${GAPI_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));
}

form.addEventListener("submit", searchHandler);
