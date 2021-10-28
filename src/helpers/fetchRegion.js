import compactNumber from "./compactNumber";

const uriGov = "https://api.coronavirus.data.gov.uk/v1/data";
// filters=<string>&structure=<string>[&latestBy=<string>][&format=<string>][&page=<number>]
// const filters = "?filters=areaName=United%2520Kingdom;";
const areaType = "areaType=nation";
const structure =
  '&structure={"date":"date", "totalCases":"cumCasesByPublishDate", "totalDeaths":"cumDeaths28DaysByPublishDate"}';
const latestBy = "&latestBy=cumCasesByPublishDate"

const fetchRegion = (region, setState) => {
    const filters = `?filters=areaName=${region};`;
 return fetch(uriGov + filters + areaType + structure + latestBy, {
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    })
    .then(res => res.json())
    .then(result => {
            let data = result.data[0];
            // console.log("result", data);
            data = {
                "totalCases": compactNumber(data.totalCases),
                "totalDeaths": compactNumber(data.totalDeaths)
            }
            setState(data);
        }
    )
    .catch(error => {
        console.log("Error", error);
    });
}


export default fetchRegion
