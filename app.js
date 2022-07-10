async function fetchData (lat , long ) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const result = await axios.get( proxy + "api.openweathermap.org/data/2.5/weather" , {
        params : {
            lat : lat,
            lon : long 
        }
    });
 console.log(result);
//calling the render function
  renderData(result);
};

//getting the location
 navigator.geolocation.getCurrentPosition( succeed );
 
function succeed (position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude; 
      fetchData(lat , long);
};


const temp = document.querySelector(".temperature");
const locality = document.querySelector(".location");
const condition = document.querySelector(".condition");
const definition  = document.getElementsByClassName("definition")[0];

let currentTemp;

 const renderData = (res) => {
     //displaying the temperature
     currentTemp =   (parseFloat(res.data.main.temp) - 273).toFixed(2);
        console.log(currentTemp);
            temp.innerHTML = `${currentTemp} ` + "C";
     
     //displaying the icon
     const code = res.data.cod;
        condition.innerHTML = `<i class="owf owf-${code}">   </i>  `;

     // for description
     const describe = res.data.weather[0].description;
        definition.innerHTML = ` It's so ${describe}y out here`;

     //displaying the place and the country   
     const place =  res.data.name ; 
     const country = res.data.sys.country;
        locality.innerHTML = `${place} , ${country}`;

     temp.addEventListener("click" , (e) =>{
        console.log("hello");
            if(e.target.textContent.includes("C")){
                currentTemp =       ((9/5)*(parseFloat(res.data.main.temp) - 273) + 32 ).toFixed(2);
                    temp.innerHTML = `${currentTemp} F`;
            }    else if(e.target.textContent.includes("F")){
                    currentTemp =  (parseFloat(res.data.main.temp) - 273).toFixed(2);
                        temp.innerHTML = `${currentTemp} ` + "C";
            }      
   });
   
    

    //  useIcons(description);
     
 };

