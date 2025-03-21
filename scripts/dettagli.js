const URLparameters = new URLSearchParams(location.search);
const filmId = URLparameters.get("id");

const filmUrl = "https://striveschool-api.herokuapp.com/api/product/";

const getFilmDetails = function () {
  fetch(filmUrl + filmId, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2I0ODM4MzRiZjAwMTUwMDA3M2QiLCJpYXQiOjE3NDI1NTE4ODEsImV4cCI6MTc0Mzc2MTQ4MX0.POUXKznEXTLAoakiRoynJPgi_8kQAf-l5b5kGFf-5MY",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nel recupero dei dettagli");
      }
    })
    .then((data) => {
      const name = document.getElementById("name");
      const description = document.getElementById("description");
      const priceTime = document.getElementById("price-time");
      const imageUrl = document.getElementById("image");

      name.innerText = data.name;
      description.innerText = data.description;
      priceTime.innerText = `${data.price}$`;
      imageUrl.src = data.imageUrl;
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI FILM", err);
    });
};

const editFilm = function () {
  location.assign("./backoffice.html?id=" + filmId);
};

const deleteFilm = function () {
  if (confirm("Sei sicuro di voler eliminare questo film?")) {
    fetch(filmUrl + "/" + filmId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2I0ODM4MzRiZjAwMTUwMDA3M2QiLCJpYXQiOjE3NDI1NTE4ODEsImV4cCI6MTc0Mzc2MTQ4MX0.POUXKznEXTLAoakiRoynJPgi_8kQAf-l5b5kGFf-5MY",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Film eliminato con successo!");
          location.assign("./index.html");
        } else {
          throw new Error("Eliminazione NON andata a buon fine!");
        }
      })
      .catch((err) => {
        console.log("ERRORE NELLA CANCELLAZIONE", err);
      });
  }
};

getFilmDetails();
