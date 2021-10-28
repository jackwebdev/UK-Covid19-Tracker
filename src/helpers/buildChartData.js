import easyTimeFormat from "./easyTimeFormat"

const buildChartData = (govData) => {
    let dates = [];
    let cases = [];
    let deaths = [];
    let charts = [
        {
            name: "Case/Deaths",
            labels: dates,
            datasets: [
                {
                    label: "Cases",
                    order: 1,
                    data: cases,
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderColor: "rgba(255, 159, 64, 1)",
                    borderWidth: 1,
                    fill: true,
                },
                {
                    label: "Deaths",
                    order: 2,
                    data: deaths,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    fill: true,
                }
            ]
        }
    ];


    for (let i = govData.length - 1; i >= 0; i--) {
      let data = govData[i];
      let {day, monthTrim, yearTrim} = easyTimeFormat(data.date);
      dates.push(`${day} ${monthTrim} ${yearTrim}`)
      cases.push(data.dailyCases);
      deaths.push(data.dailyDeaths);
    }

    return charts;
}

export default buildChartData
