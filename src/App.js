import { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons';



const API_KEYS = "1080f8ec3de12845e74397b14e3632ee";

function App() {
  const [name, setName] = useState("Vienna");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [max, setMax] = useState("");
  const [min, setMin] = useState("");
  const [description, setDescription] = useState("");
  const [icon,setIcon] = useState('')
  //console.log('description', typeof description)

  const getWeather = async () => {
    try {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${API_KEYS}`
      );
      const res = await api_call.json();
      setCountry(res.sys.country);
      setMax(Math.ceil(res.main.temp_max - 273.15));
      setMin(Math.ceil(res.main.temp_min - 273.15));
      setDescription(res.weather[0].description);
      setIcon(res.weather[0].icon)
      setTemp(Math.ceil(res.main.temp - 273.15));
      console.log("response", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeather();
    //setCountry(response.sys.country)
  }, [name]);

  const onChangeHandler = (e) => {
    setName(e.target.value);
    const calender = new Date();
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    setDate(calender.toLocaleDateString("en-US", options));
  };

  const containerStyle = css`
  width: 100vw;
  min-width: 400px;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  filter: blur(4px);
  -webkit-filter: blur(4px);
  ${description.includes("clouds")? `background-image: url("cloud.jpg");` :
  description.includes("rain")? `background-image: url("rain.jpg");` :
  description.includes("storm")? `background-image: url("storm.jpg");` :
  description.includes("snow")? `background-image: url("snow.jpg");` :
  description.includes("mist")? `background-image: url("mist.jpg");` :
  `background-image: url("sunny.jpg");`}
`;

  return (
    <div>
      <div className={containerStyle}></div>
      <div
        className={css`
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.4);
          color: white;
          font-weight: bold;
          border: 3px solid #f1f1f1;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          width: 80%;
          padding: 20px;
          text-align: center;
          height: 50%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <fieldset
          className={css`
            width: 30%;
            height: 30%;
          `}
        >
          <legend>City</legend>
          <input
            value={name}
            onChange={onChangeHandler}
            className={css`
              width: 50%;
              margin-top: 5%;
              height: 30%;
              background-color: rgba(0, 0, 0, 0.4);
              color: white;
              font-size: 18px;
            `}
          />
        </fieldset>
        <fieldset
          className={css`
            width: 50%;
            height: 95%;
          `}
        >
          <legend>Details</legend>
          <p>
            {name}, {country}{" "}
          </p>
          <p>{date}</p>
          <p>{temp}&deg;C</p>
          <p>{description}</p>
          <img alt="icon" src={`http://openweathermap.org/img/w/${icon}.png`} width="100" height="90" />
          <div
            className={css`
              display: flex; justify-content: space-evenly; width: 100%;
            `}
          >
            <p id="max"> <FontAwesomeIcon icon={faArrowUp} />{max}&deg;C</p>
            <p id="min"><FontAwesomeIcon icon={faArrowDown} />{min}&deg;C</p>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default App;
