import React, { useState, useEffect } from "react";

import { ThemeProvider } from "./context/ThemeContext";

import InfoIcon from "./components/InfoIcon";
import CounterStat from "./components/CounterStat";
import ThemeToggler from "./components/ThemeToggler";
import LineChart from "./components/LineChart";

import easyTimeFormat from "./helpers/easyTimeFormat";
import buildChartData from "./helpers/buildChartData";
import fetchRegion from "./helpers/fetchRegion";

// https://api.coronavirus.data.gov.uk/v1/data
const uriGov = "https://api.coronavirus.data.gov.uk/v1/data";
// filters=<string>&structure=<string>[&latestBy=<string>][&format=<string>][&page=<number>]
const filters = "?filters=areaName=United%2520Kingdom;";
const areaType = "areaType=overview";
const structure =
  '&structure={"date":"date", "currentPatients":"hospitalCases", "dailyTests":"newVirusTests", "dailyAdmissions":"newAdmissions", "dailyCases":"newCasesByPublishDate", "dailyDeaths":"newDeaths28DaysByPublishDate", "dailyVaccinatedCompleted":"newPeopleVaccinatedCompleteByPublishDate", "totalTests":"cumVirusTests", "totalCases":"cumCasesByPublishDate", "totalDeaths":"cumDeaths28DaysByPublishDate", "totalVaccinatedCompleted":"cumPeopleVaccinatedCompleteByPublishDate"}';
// const latestBy = "&latestBy:newCasesByPublishDate"; // not using right now - Filters the data to ensure newCasesByPublishDate isnt null.
// https://api.coronavirus.data.gov.uk/v1/data?filters=areaName=United%20Kingdom;areaType=overview&structure={%22date%22:%22date%22,%22todayTests%22:%22newTestsByPublishDate%22,%22tests%22:%22cumTestsByPublishDate%22,%22testCapacity%22:%22plannedCapacityByPublishDate%22,%22newCases%22:%22newCasesByPublishDate%22,%22cases%22:%22cumCasesByPublishDate%22,%22hospitalized%22:%22hospitalCases%22,%22usedVentilationBeds%22:%22covidOccupiedMVBeds%22,%22newAdmissions%22:%22newAdmissions%22,%22admissions%22:%22cumAdmissions%22,%22todayDeaths%22:%22newDeaths28DaysByPublishDate%22,%22totalDeaths%22:%22cumDeaths28DaysByPublishDate%22,%22ONSweeklyDeaths%22:%22newOnsDeathsByRegistrationDate%22,%22ONStotalDeaths%22:%22cumOnsDeathsByRegistrationDate%22}

function App() {
  const [cases, setCases] = useState({ "dailyCases": { "value": null, "date": null}, "totalCases": { "value": null, "date": null}});
  const [deaths, setDeaths] = useState({ "dailyDeaths": { "value": null, "date": null}, "totalDeaths": { "value": null, "date": null}});
  const [tests, setTests] = useState({ "dailyTests": { "value": null, "date": null}, "totalTests": { "value": null, "date": null}});
  const [vaccinatedCompleted, setVaccinatedCompleted] = useState({ "dailyVaccinatedCompleted": { "value": null, "date": null}, "totalVaccinatedCompleted": { "value": null, "date": null}});
  const [hospital, setHospital] = useState({ "dailyAdmissions": { "value": null, "date": null}, "currentPatients": { "value": null, "date": null}});
  const [charts, setCharts] = useState(false);
  const [england, setEngland] = useState(false);
  const [scotland, setScotland] = useState(false);
  const [wales, setWales] = useState(false);
  const [northernIreland, setNorthernIreland] = useState(false);
  // const [vaccineComplete, setVaccineComplete] = useState(0);
  // const [admissions, setHospitalAdmissions] = useState(0);
  // const [hospitalCases, setHospitalCases] = useState(0);

  useEffect(() => {
    // Fetch the main data for UK.
    fetch(uriGov + filters + areaType + structure, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log("Result", result);
        let data = result.data;
    
        let charts = buildChartData(data);
        // console.log(charts);
        setCharts(charts);

        const findLastData = (keys, entry, state) => {
          let newData = {...entry}
          keys.forEach((key) => {
            for(let j = 0; j < data.length; j++) {
              if(data[j][key]) {
                 return newData[key] = {
                    "value": data[j][key],
                    "date": data[j].date
                 }
              }
            }
          });
          // Update the state data.
          return state(newData);
        }
        findLastData(["dailyCases", "totalCases"], cases, setCases);
        findLastData(["dailyDeaths", "totalDeaths"], deaths, setDeaths);
        findLastData(["dailyTests", "totalTests"], tests, setTests);
        findLastData(["dailyVaccinatedCompleted", "totalVaccinatedCompleted"], vaccinatedCompleted, setVaccinatedCompleted);
        findLastData(["dailyAdmissions", "currentPatients"], hospital, setHospital);
      })
      .catch((error) => {
        console.log("Error", error);
      });

      // Fetch regions
      fetchRegion("england", setEngland)
      fetchRegion("scotland", setScotland);
      fetchRegion("wales", setWales);
      fetchRegion("northern%20ireland", setNorthernIreland)

  }, []);

  let {day, month, year, time} = easyTimeFormat();
  let date = `${day} ${month} ${year} - ${time}`;

  return (
    <ThemeProvider>
      <header className="header">
        <h1>🇬🇧 UK Covid-19 Tracker 🇬🇧</h1>
      </header>
      <main>
        <section>
          <div className="subtitle">
            <div>
              <InfoIcon colour="rgb(45, 163, 208)" />
              <h3>
                Nationwide UK Live Data - <a href="/" rel="noreferrer">(Refresh)</a>
              </h3>
              <p>{date}</p>
            </div>
            <ThemeToggler />
          </div>

          <div className="row">
            <CounterStat
              title="Cases"
              data={cases}
              keys={{"daily": "dailyCases", "total": "totalCases"}}
              colour="rgb(255, 158, 75)"
            />
            <CounterStat
              title="Deaths"
              data={deaths}
              keys={{"daily": "dailyDeaths", "total": "totalDeaths"}}
              colour="rgb(253, 98, 132)"
            />
            <CounterStat
              title="Tests"
              data={tests}
              keys={{"daily": "dailyTests", "total": "totalTests"}}
              colour="rgb(45, 163, 208)"
            />
          </div>
          <div className="row">
            <CounterStat
              title="100% Vaccinated"
              data={vaccinatedCompleted}
              keys={{"daily": "dailyVaccinatedCompleted", "total": "totalVaccinatedCompleted"}}
              colour="rgb(81, 192, 190)"
            />
            <CounterStat
              title="Hospital Admissions"
              data={hospital}
              keys={{"daily": "dailyAdmissions", "total": "currentPatients"}}
              colour="rgb(255, 158, 75)"
            />
          </div>
        </section>
        <section className="chart-section">
          <div className="row">
            <div className="widget nations">
            <div className="header">
                <p className="title">Nation Breakdown</p>
                <p>Total cases and deaths by nation.</p>
              </div>
       
                <p className="country">England
                  <span>
                    {england.totalCases}&nbsp;
                    <sup><small>Cases</small></sup>&nbsp;&nbsp;&nbsp;
                    {england.totalDeaths}&nbsp;
                    <sup><small>Deaths</small></sup>
                  </span>
                </p>
                <p className="country">Scotland
                  <span>
                    {scotland.totalCases}&nbsp;
                    <sup><small>Cases</small></sup>&nbsp;&nbsp;&nbsp;
                    {scotland.totalDeaths}&nbsp;
                    <sup><small>Deaths</small></sup>
                  </span>
                </p>
                <p className="country">Wales
                  <span>
                    {wales.totalCases}&nbsp;
                    <sup><small>Cases</small></sup>&nbsp;&nbsp;&nbsp;
                    {wales.totalDeaths}&nbsp;
                    <sup><small>Deaths</small></sup>
                  </span>
                </p>
                <p className="country">Northern Ireland
                  <span>
                    {northernIreland.totalCases}&nbsp;
                    <sup><small>Cases</small></sup>&nbsp;&nbsp;&nbsp;
                    {northernIreland.totalDeaths}&nbsp;
                    <sup><small>Deaths</small></sup>
                  </span>
                </p>

           
            </div>
            <div className="widget chart-box">
              <div className="header">
                <p className="title">Cases & Deaths</p>
                <p>Compare historical data.</p>
              </div>
              { charts && 
                  <LineChart 
                    type="line"
                    labels={charts[0].labels}
                    datasets={charts[0].datasets}
                />
              }
            </div>
          </div>
        </section>
      </main>
      <footer>
        <p>Data source: <a href="https://coronavirus.data.gov.uk/details/developers-guide/main-api" target="_blank" rel="noreferrer">Gov UK</a></p>
      </footer>
    </ThemeProvider>
  );
}

export default App;
