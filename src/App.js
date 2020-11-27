import React, { useState } from "react"
const api = {
  key: "c9bba8e5832e8ada5d3dd45b776f59c1",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);

        })

    }
  }
  const dateBuilder = (d) => {
    console.log(d);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined")
      ? ((weather.weather[0].main == "Clouds") ?
        'App warm' :
        (weather.weather[0].main == "Rain") ?
          'App Rainy' :
          (weather.weather[0].main == "Clear") ?
            'App Clear' :
            'App')

      : 'App'}>
      <main>
        <div className="search_box">
          <input
            type="text"
            className="search_bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location_box">

              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>

            <div className="weather_box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
          </div>
              <div className="weather">
                {weather.weather[0].main}


              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
