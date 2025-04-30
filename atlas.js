const countriesList = document.getElementById("countries-list");
const continent = document.getElementById("kontinent");
const modalBody = document.getElementById("oneCountry-body");
const modalTitle = document.getElementById("oneCountry-title");
const modal = new bootstrap.Modal(document.getElementById("oneCountry"));

function loadCountries(region) {
  countriesList.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      data.forEach((country) => {
        let blockCountry = `
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 p-2">
              <div class="card">
            <img class="card-img-top" src="${country.flags.png}" alt="${country.flags.png}" style="width: 100%; height: 150px; object-fit: cover;"/>
            <div class="card-body">
                <h4 class="card-title"><a href="#">${country.translations.ces.official}</a></h4>
                <p class="card-text">Hlavní město: <b>${country.capital[0]}</b></p>
                <p><button class="btn btn-info" 
              data-bs-toggle="modal" 
              data-bs-target="#oneCountry"
              data-name="${country.name.common}">Informace</button></p>
            </div>
              </div>
          </div>
          `;
        countriesList.innerHTML += blockCountry;
      });
      document.querySelectorAll('button[data-name]').forEach(button => {
        button.addEventListener('click', () => {
          const countryName = button.getAttribute('data-name');
          modal.show();
          fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText-true`)
          .then(res => res.json())
          .then(data => {
            const country = data[0];
            let sousedi = "";
            for (let i = 0; i < country.borders.length; i++) {
              sousedi += (i > 0 ? ", " : "") + country.borders[i];
            }
            modalTitle.innerHTML = `<h4>${country.translations.ces.common}</h4>`;
            modalBody.innerHTML = `
            <img src="${country.flags.png}" alt="Vlajka ${country.name.common}">
                  <p></p>
                  <p><b>Hlavní město: </b>${country.capital[0]}</p>
                  <p><b>Rozloha: </b>${country.area} km<sup>2</sup></p>
                  <p><b>Sousedí s: </b>${sousedi}</p>
                  <p><b>Populace: </b>${country.population} lidí</p>
                  <p><b>Měna: </b>${Object.values(country.currencies)[0].name}</p>
                  <p><b>Nachází se: </b><a href="${country.maps.googleMaps}" target="_blank">Google mapy</a> <a href="${country.maps.openStreetMaps}" target="_blank">Open Street Maps</a></p>
                  <p><b>Časová zóna: </b>${country.timezones[0]}</p>`;
          })
          .catch(error => {
            console.error(error);
          })
        })
      });
    })
    .catch(error => {
      console.error(error);
    });
}

loadCountries("europe");

continent.addEventListener("change", function (event) {
  loadCountries(event.target.value);
});