class Films {
  constructor(_name, _imageUrl, _description, _brand, _price) {
    this.name = _name;
    this.imageUrl = _imageUrl;
    this.description = _description;
    this.brand = _brand;
    this.price = _price;
  }
}

const URLparameters = new URLSearchParams(location.search);
const filmId = URLparameters.get("id");

const nameF = document.getElementById("name");
const imageUrlF = document.getElementById("imageUrl");
const descriptionF = document.getElementById("description");
const brandF = document.getElementById("brand");
const priceF = document.getElementById("price");

const filmUrl = "https://striveschool-api.herokuapp.com/api/product/";
const form = document.getElementById("form");

if (filmId) {
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
        throw new Error("Errore nel recupero del film");
      }
    })
    .then((data) => {
      nameF.value = data.name;
      imageUrlF.value = data.imageUrl;
      descriptionF.value = data.description;
      brandF.value = data.brand;
      priceF.value = data.price;
    })
    .catch((err) => console.log("ERRORE DEL RIPOPOLAMENTO DEL FORM", err));
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const film = new Films(
    nameF.value,
    imageUrlF.value,
    descriptionF.value,
    brandF.value,
    priceF.value
  );

  const methodToUse = filmId ? "PUT" : "POST";
  const URLtoUse = filmId ? filmUrl + filmId : filmUrl;

  fetch(URLtoUse, {
    method: methodToUse,
    body: JSON.stringify(film),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2I0ODM4MzRiZjAwMTUwMDA3M2QiLCJpYXQiOjE3NDI1NTE4ODEsImV4cCI6MTc0Mzc2MTQ4MX0.POUXKznEXTLAoakiRoynJPgi_8kQAf-l5b5kGFf-5MY",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(
          filmId
            ? "Film aggiornato con successo!"
            : "Film inserito con successo!"
        );
        form.reset();
        location.assign("./index.html");
      } else {
        throw new Error("Operazione non riuscita");
      }
    })
    .catch((error) => {
      console.log("Errore: ", error);
    });
});

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
      const row = document.getElementById("modal");
      data.forEach((film) => {
        row.innerHTML =
          row.innerHTML +
          `  
              <div class="card mb-3 mt-3 bg-secondary " id="card">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${film.imageUrl}" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h3 class="card-title text-light">${film.name}</h3>
            
              <p class="card-text text-light ">
              $  ${film.price}   
              </p>
               <button onclick="editfilm('${film._id}')" class="btn btn-success">Modifica</button>
               <button onclick="deletefilm('${film._id}')" class="btn btn-danger">Elimina</button>
             
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
  location.assign("./backoffice.html?id=" + filmId);
};

const deletefilm = function (filmId) {
  const conferma = confirm("Sei sicuro di voler eliminare questo film?");
  if (conferma) {
    fetch(filmUrl + "/" + filmId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkM2I0ODM4MzRiZjAwMTUwMDA3M2QiLCJpYXQiOjE3NDI1NTE4ODEsImV4cCI6MTc0Mzc2MTQ4MX0.POUXKznEXTLAoakiRoynJPgi_8kQAf-l5b5kGFf-5MY",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("CONCERTO ELIMINATO");

          location.assign("./index.html");
        } else {
          throw new Error("eliminazione NON andata a buon fine!");
        }
      })
      .catch((err) => {
        console.log("ERRORE NELLA CANCELLAZIONE", err);
      });
  }
};
const resetButton = document.querySelector(".btn-danger");
resetButton.addEventListener("click", () => {
  const conferma = confirm("Sei sicuro di voler cancellare tutti i campi?");

  if (conferma) {
    form.reset();
  }
});
