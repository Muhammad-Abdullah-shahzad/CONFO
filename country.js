import {getCountryDataFromAPI,ToggleDarkAndLightModes} from "./script.js";
let lightMode = JSON.parse( localStorage.getItem('lightmode'))


if(!lightMode){
  // ToggleDarkAndLightModes()
  console.log('executed4')
}
  window.addEventListener(
      "load",
      () => {
        const backBtn=document.querySelector("#backbtn");
        backBtn.addEventListener('click',()=>{
         window.history.go(-1)
        })
        const darkModeButton = document.querySelector("#dark-mode-btn2");
        darkModeButton.addEventListener("click",()=>{
    lightMode =!lightMode 
    
    //  toggle and store in local storage
     localStorage.setItem('lightmode',JSON.stringify(lightMode))
    
     ToggleDarkAndLightModes();
  })
        setTimeout(() => {
          const container = document.querySelector(" .single-card-container");
          let Params = new URLSearchParams(location.search);
          const name = Params.get("name");
          console.log(name);
  
          getCountryDataFromAPI(
            `https://restcountries.com/v3.1/name/${name}?fullText=true`
          ).then((response) => {
            console.log(response);
            const countryCard = `
      <div class="card">
        <img id="flag" src=${response[0].flags.svg} alt="" />
        <div class="country-det">
          <h2>More Details</h2>
          <div  class="info-container" >
  
          <p><b>Name:</b>${response[0]?.name.common}</p>
       
          <p><b>Independent:</b>${response[0].independent ? "YES" : "NO"}</p>
          <p><b>Region:</b>${response[0]?.region}</p>
          <p class='borders' ><b>Borders:</b> ${
            response[0].borders
              ? response[0].borders.filter(Boolean).join(",")
              : "No borders available"
          }</p>
          <p><b>Capital:</b>${response[0]?.capital[0]} </p>
          <p><b>Continent:</b>${response[0]?.continents[0]}</p>
          <p><b>Area:</b>${response[0]?.area}sq km</p>
            </br>
            </br>
            </br>
            </br>
            </br>
            </br>
     
          </div>
          <p><b>Official Name:</b>${response[0]?.name.official}</p>
          <p class="apealing-font" ><b>Map Link:</b><a href=${
            response[0]?.maps.googleMaps
          }>${response[0]?.maps.googleMaps}</a> </p>
        </div>
             
    </div>`;
            container.innerHTML = countryCard;
          });
        },1000);

console.log("lightmode value page 2",lightMode)
    
      });
    