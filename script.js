
let lightMode=JSON.parse(localStorage.getItem('lightmode'))??true;
window.addEventListener("load", () => {
  const darkModeButton = document.querySelector("#dark-mode-btn");
  darkModeButton.addEventListener("click",()=>{
    lightMode =!lightMode 
    
    //  toggle and store in local storage
     localStorage.setItem('lightmode',JSON.stringify(lightMode))
     console.log(lightMode)
    
     ToggleDarkAndLightModes();
  })
});




 export function ToggleDarkAndLightModes() {
  let searchBarContainer = document.querySelector(".search");
const backBtn=document.querySelector("#backbtn");
console.log(backBtn)
  const body = document.querySelector("body");
  const countryInfo = document.querySelectorAll(".country-info-container");

  body?.classList.toggle("dark-mode-body");
  countryInfo?.forEach((elem) => {
    elem?.classList?.toggle("dark-mode-country-info");
  });
  searchBarContainer?.classList.toggle("dark-mode-search");
  backBtn?.classList.toggle('.dark')
}
if(!lightMode) {ToggleDarkAndLightModes()}

 export   async function getCountryDataFromAPI(url) {
  const response = await (await fetch(url)).json();
  return response;
}

function addClickEventOnNewcards() {
  let countryNames = document.querySelectorAll(".country-name");
  countryNames = [...countryNames];

  const countriesArray = document.querySelectorAll(".country");
  countriesArray.forEach((countryElement) => {
    countryElement.addEventListener("click", (event) => {
      let parentElement = event.target.closest(".country");
      if (parentElement) {
        let name = parentElement.querySelector(".country-name").innerText;
        console.log(name);
        location.href = `coutry.html?name=${name}`;
      }
    });
  });
}

function renderData(ApiResponseArray) {
  const countriesContainer = document.querySelector(".countries-container");
  countriesContainer.innerHTML = "";
  ApiResponseArray.forEach((country, index) => {
    // console.log('region',country.region,'population',country.population,index);

    const countryCard = `
<div class="country">
<img
class="country-img"
src="${country.flags.svg}"
alt="Image of Iceland"
/>

<div class="country-info-container">
<h3 class="country-name"> ${country.name.common}</h3>
<p><b>Population: </b>%${country.population}</p>
<p><b>Region: </b>${country.region}</p>
<p><b>Capital: </b>${country.capital?.[0]}</p>
</div>
</div>
`;
    countriesContainer.innerHTML += countryCard;
  });
}

export default { getCountryDataFromAPI , ToggleDarkAndLightModes,lightMode };

let countries;
// window.addEventListener("load", () => {
//   setTimeout(() => {

//   }, 0);
// });

getCountryDataFromAPI("https://restcountries.com/v3.1/all").then((response) => {
  const selectbox = document.querySelector("select");
  let searchBar = document.querySelector(".search input");
  renderData(response);
  addClickEventOnNewcards();
  if (searchBar) {
    searchBar.addEventListener("input", (event) => {
      const filteredCountries = response.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );

      renderData(filteredCountries);
      addClickEventOnNewcards();
    });
  }
  selectbox.addEventListener("change", (event) => {
    const filteredCountriesByRegion = response.filter((country) =>
      country.region.toLowerCase().includes(event.target.value.toLowerCase())
    );
    renderData(filteredCountriesByRegion);
    addClickEventOnNewcards();
  });
});
