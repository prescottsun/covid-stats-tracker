import React, { useEffect, useState } from 'react'
import {fetchDailyData} from '../../api'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'
import { findAllByDisplayValue } from "@testing-library/react"

const Chart = ({data: {confirmed, deaths, recovered}, country}) => {
  const [dailyData, setDailyData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData( await fetchDailyData())
    }
    
    fetchAPI()

  }, [])
  console.log(dailyData)

  const lineChart = (
    dailyData ? (<Line data={{
      labels: dailyData.map(({date}) => date),
      datasets: [{
        data: dailyData.map(({confirmed}) => confirmed),
        label: 'Infected',
        borderColor: '#3333ff',
        fill: true,
      }, {
        data: dailyData.map(({deaths}) => deaths),
        label: 'Deaths',
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        fill: true,
      }],
    }}
    />) : <h1>Daily data not available</h1>
  )

    const barChart = (
      confirmed ? 
      (<Bar 
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [{
            label: 'People',
            backgroundColor: [
              'rgba(0, 0, 255, 0.5',
              'rgba(0, 255, 0, 0.5',
              'rgba(255, 0, 0, 0.5',
            ],
          data: [confirmed.value, recovered.value, deaths.value]
          }]     
        }}
        options={{
          legends: {display: false},
          title: {display: true, text: `Current state in ${country}`}
        }}
      />)
      : null
    )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  )
}

export default Chart
