var markers = [];

function searchCountry() {

  var input = document.getElementById('searchBar').value;
  document.getElementById('searchBar').value = "";
  for (let i of markers) {
    console.log(i)
    var a = input.toUpperCase();
    var b = i.country.toUpperCase();

    if (a == b) {
      google.maps.event.trigger(i.markers, 'click');
      break;
    }

  }

}


function initMap() {
  fetchData();

  let inputData;


  async function fetchData() {
    await fetch('https://corona.lmao.ninja/countries')
      .then(res => res.json())
      .then(data => {
        inputData = data;
        var totalDeaths = 0;
        var totalCases = 0;
        var totalRecoveries = 0;
        var totalCritical = 0;
        data.forEach(i => {
          totalDeaths += i.deaths;
          totalCases += i.cases;
          totalRecoveries += i.recovered;
          totalCritical += i.critical;
        })

        data.forEach(i => {
          var scale = Math.round(i.cases / totalCases * 100) + 5
          var coords = {
            lat: i.countryInfo.lat,
            lng: i.countryInfo.long
          }
          var marker = new google.maps.Marker({
            position: coords,
            map: map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'red',
              fillOpacity: 0.6,
              scale: scale,
              strokeColor: 'white',
              strokeWeight: 0
            }
          });
          markers.push({
            country: i.country,
            markers: marker
          });

          var infoWindow = new google.maps.InfoWindow({
              content: `<div id=${i['countryInfo']['_id']} class="data-wrap" onclick="clickStore('${i['countryInfo']['iso2']}')">
                        <div class="infoContainer">
                         <b><h1>${i.country}</h1>
                         <img src="${i['countryInfo']['flag']}" width="35px" height="25px"/> 
                         </b><hr>
                            <div class="infoCases">
                              <h2>Cases:</h2>
                              <h3>${i.cases}</h3>
                            </div>
                            <div class="infoDeaths">
                              <h2>Deaths:</h2>
                              <h3>${i.deaths}</h3>
                            </div>
                            <div class="infoRecovered">
                              <h2>Recovered:</h2>
                              <h3>${i.recovered}</h3>
                            </div>
                            <div class="infoCritical">
                              <h2>Critical:</h2>
                              <h3>${i.critical}</h3>
                            </div>
                            <div class="infoTodayCases">
                              <h2>Today's Cases:</h2>
                              <h3>${i.todayCases}</h3>
                            </div>
                            <div class="infoActive">
                              <h2>Active:</h2>
                              <h3>${i.active}</h3>
                            </div>
                       </div>
                    </div> 
                    `
          });
          marker.addListener('click', function () {
            infoWindow.open(map, marker);
          });

          marker.addListener('click', function () {
            map.setZoom(3);
            map.setCenter(marker.getPosition());
          });

        })
          var cases = `<h4>Cases      <i class="fas fa-globe"></i></h4>
                        <h5>${totalCases}</h5>`;
          var deaths = `<h4>Deaths    <i class="fas fa-skull-crossbones"></i></h4>
                        <h5>${totalDeaths}</h5>`;
          var recovered = `<h4>Recovered     <i class="fas fa-first-aid"></i></h4>
                            <h5>${totalRecoveries}</h5>`
          var critical = `<h4>Critical     <i class="fas fa-procedures"></i></h4>
                            <h5>${totalCritical}</h5>`
        document.getElementById('totalCases').innerHTML = cases;
        document.getElementById('totalDeaths').innerHTML = deaths;
        document.getElementById('totalRecovered').innerHTML = recovered;
        document.getElementById('totalCritical').innerHTML = critical

      });


    var sortedCasesOutput = `<div class ="wrap">`;
    var sortedDeathsOutput = `<div class ="wrap">`;
    var sortedRecoveredOutput = `<div class ="wrap">`;
    var sortedCriticalOutput = `<div class ="wrap">`;
    var button = document.querySelector(".closeButtonContainer");
    var x = document.querySelector(".dataContainer");
    button.addEventListener('click', function () {
      x.style.display = "none";
      button.style.display = "none";
    })
  
     document.getElementById('cases').addEventListener('click', function () {
      x.style.display = "block";
      button.style.display = "block";
      inputData.sort((a, b) => b.cases - a.cases).forEach((one, index) => {
        sortedCasesOutput +=
         ` <div id=${one['countryInfo']['_id']} class="data-wrap" onclick="clickStore('${one['countryInfo']['iso2']}')">
                <div class="data-wrap">
                    <div class="dataListContainer">
                        <div class="data"> 
                           <div class="dataCases">
                               <h4>${one['country']}</h4>
                               <h5>Cases: ${one['cases']}</h5>
                           </div>
                        </div>
                        <div class="dataNumber">
                            <img src="${one['countryInfo']['flag']}" width="30px" height="20px"/>  
                        </div>
                    </div>
                </div>
          </div>
                
         `
      })
    

      sortedCasesOutput += "</div>"

      x.innerHTML = sortedCasesOutput;
    })


    document.getElementById('deaths').addEventListener('click', function () {
      x.style.display = "block";
      button.style.display = "block";
      inputData.sort((a, b) => b.deaths - a.deaths).forEach((two, index) => {
        sortedDeathsOutput +=
            ` <div id=${two['countryInfo']['_id']} class="data-wrap" onclick="clickStore('${two['countryInfo']['iso2']}')">
                <div class="data-wrap">
                    <div class="dataListContainer">
                        <div class="data"> 
                           <div class="dataDeaths">
                               <h4>${two['country']}</h4>
                               <h5>Deaths: ${two['deaths']}</h5>
                           </div>
                        </div>
                        <div class="dataNumber">    
                            <img src="${two['countryInfo']['flag']}" width="30px" height="20px"/> 
                        </div> 
                    </div>
                </div>
              </div>
                
                `
      })
      sortedDeathsOutput += "</div>"

      x.innerHTML = sortedDeathsOutput;

    })

    document.getElementById('recovered').addEventListener('click', function () {
      x.style.display = "block";
      button.style.display = "block";
      inputData.sort((a, b) => b.recovered - a.recovered).forEach((three, index) => {
        sortedRecoveredOutput +=
            ` <div id=${three['countryInfo']['_id']} class="data-wrap" onclick="clickStore('${three['countryInfo']['iso2']}')">
                <div class="data-wrap">
                    <div class="dataListContainer">
                        <div class="data"> 
                           <div class="dataRecovered">
                               <h4>${three['country']}</h4>
                               <h5>Recovered: ${three['recovered']}</h5>
                           </div>
                        </div>
                        <div class="dataNumber">
                            <img src="${three['countryInfo']['flag']}" width="30px" height="20px"/>                 
                        </div>
                    </div>
                </div>
             </div>
                
                `
      })
      sortedRecoveredOutput += "</div>"

      x.innerHTML = sortedRecoveredOutput;

    })

    document.getElementById('critical').addEventListener('click', function () {
      x.style.display = "block";
      button.style.display = "block";
      inputData.sort((a, b) => b.critical - a.critical).forEach((four, index) => {
        sortedCriticalOutput +=
            ` <div id=${four['countryInfo']['_id']} class="data-wrap" onclick="clickStore('${four['countryInfo']['iso2']}')">
                <div class="data-wrap">
                    <div class="dataListContainer">
                        <div class="data">
                           <div class="dataCritical">
                               <h4>${four['country']}</h4>
                               <h5>Critical: ${four['critical']}</h5>
                           </div>
                        </div>
                        <div class="dataNumber">                  
                            <img src="${four['countryInfo']['flag']}" width="30px" height="20px"/>                           
                        </div>
                    </div>
                </div>
              </div>
                
                `
      })
      sortedCriticalOutput += "</div>"

      x.innerHTML = sortedCriticalOutput;
    })

  }



  var options = {
    zoom: 2.2,
    center: {
      lat: 15.4542,
      lng: 18.7322
    },
    styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#242f3e"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#746855"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#242f3e"
        }]
      }, {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      }, {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#38414e"
        }]
      }, {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#212a37"
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#17263c"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#515c6d"
        }]
      }, {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#17263c"
        }]
      }
    ]
  };
  var map = new google.maps.Map(document.getElementById('map'), options);

}
