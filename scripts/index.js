const films = function () {
  const filmUrl = "https://striveschool-api.herokuapp.com/api/product/";
  fetch(filmUrl, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2I0ODM4MzRiZjAwMTUwMDA3M2QiLCJpYXQiOjE3NDI1NTE4ODEsImV4cCI6MTc0Mzc2MTQ4MX0.POUXKznEXTLAoakiRoynJPgi_8kQAf-l5b5kGFf-5MY",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Purtroppo non Funziona ");
      }
    })
    .then((data) => {
      const row = document.getElementById("film-row");
      data.forEach((film) => {
        row.innerHTML =
          row.innerHTML +
          ` <div class="col col-12 col-sm-6"> 
            <div class="card mb-3 mt-3 bg-secondary ">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${film.imageUrl}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title text-light">${film.name}</h5>
            <p class="card-text text-light ">${film.description}</p>
            <p class="card-text">
              <small class="text-light">${film.brand}-${film.price}$</small>
            </p>
            <button onclick="editfilm('${film._id}')" class="btn btn-info">Modifica</button>
            <a href="dettagli.html?id=${film._id}" class="btn btn-primary">Dettagli</a>
          </div>
        </div>
      </div>
    </div>
    </div>
        `;
      });
    })
    .catch((error) => {
      console.log("errore", error);
    });
};
films();
const editfilm = function (filmId) {
  location.assign("./backOffice.html?id=" + filmId);
};
