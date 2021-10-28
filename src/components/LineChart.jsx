import React, { useState, useEffect, useRef, useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import Chart from 'chart.js/auto';


const LineChart = ({ type, labels, datasets }) => {
    const { theme } = useContext(ThemeContext)
    const [chart, setChart] = useState(0);
    const ctx = useRef(0);
    

    const config = {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            // responsive: true,
            // maintainAspectRatio : false,
            elements: {
                point:{
                    radius: 0
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--chart')
                    }
                },
            },
            scales: {
                y: {
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--chart')
                    },
                    grid: {
                        borderColor:getComputedStyle(document.body).getPropertyValue('--chart'),
                        color: getComputedStyle(document.body).getPropertyValue('--chart')
                    },
                    beginAtZero: true,
                },
                x: {
                    ticks: {
                        color: getComputedStyle(document.body).getPropertyValue('--chart')
                    },
                    grid: {
                        borderColor:getComputedStyle(document.body).getPropertyValue('--chart'),
                        color: getComputedStyle(document.body).getPropertyValue('--chart'),
                        display: false
                    }
                }
            }
        }
    }
    // Use the theme to re-render.
    useEffect(() => {
        const newChart = new Chart(ctx.current, config);

        // newChart.defaults.global.defaultFontColor = getComputedStyle(document.body).getPropertyValue('--chart');
        setChart(newChart);
        
        // cleanup by destroying the chart
        return () => {
            newChart.destroy();
        }
    }, [theme]);

    return (
        <div className="chart">
            <canvas ref={ctx} />
        </div>
    )
}

export default LineChart
