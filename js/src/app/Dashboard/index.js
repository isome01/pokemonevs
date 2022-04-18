import React, {useEffect, useState} from 'react'
// import PropTypes from 'prop-types'
import {getListAllPokemonInfo} from './api'


const pokemonCountLimit = 898

const Dashboard = ({}) => {
  const [allData, setAllData] = useState([])
  const [allEvsStats, setAllEvsStats] = useState({})

  useEffect(() => {
    getListAllPokemonInfo().then(
      res => {
        // set holistic data
        setAllData(res)

        // set all EVS data exclusively
        const stats = {}
        res.slice(0, pokemonCountLimit).map(d => {
          const {ev_yield = []} = d
          ev_yield.forEach(y => {
            const count = Number(y.slice(0, 1))
            const effortValue = y.slice(2)
            if (!stats[`${effortValue}`]) {
              stats[`${effortValue}`] = 0
            }
            stats[`${effortValue}`] += count
          })
          setAllEvsStats(stats)
        })
      }
    ).catch(
      err => {
        console.log(err)
      }
    )
  }, [setAllData, setAllEvsStats])

  const evKeys = Object.keys(allEvsStats)

  return (
    <div className='row'>
      <div className='col-sm-3'>
        <h3 style={{marginTop: 50}}>Total Pokemon Effort Values </h3>
        {evKeys.map(ev => (
          <h4 key={`${ev}`}>{ev}: {allEvsStats[ev]}</h4>
        ))}
      </div>
      <div className='col-sm-7'>
        {allData.slice(0, 10).map((data, i) => {
          if (!data.sprite_img) {
            return null
          }
          return (
            <a key={`${data.name}-${i}`} href={data.link} target='_blank'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{data.name}</h5>
                  <img
                    style={{width: 200}}
                    src={data.sprite_img}
                    alt={data.sprite_img}
                    key={`${data.name}-${i}`}
                  />
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
