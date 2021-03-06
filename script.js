var myIcon = L.icon({
  iconUrl: './images/icon-location.svg',
  iconAnchor: [22, 94]
});


function setMap(query) {
  if (!query)
    query = "";
  else
    query = "?query=" + query;
  fetch("https://ip-details.herokuapp.com/" + query).then((response) => {
    response.json().then((details) => {
      //------------------------------------
      document.getElementById("ip-address").innerText = details.query;
      document.getElementById("timezone").innerText = details.timezone;
      document.getElementById("location").innerText = details.city + ", " + details.regionName + ", " +
        details.country;
      document.getElementById("isp").innerText = details.isp + ", " + details.org;

      //------------------------------------
      let latitude = details.lat;
      let longitude = details.lon;
      let map = L.map('map').setView([latitude, longitude], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      L.marker([latitude, longitude], {
          icon: myIcon
        }).addTo(map)
        .openPopup();

    })
  });
}



setMap();