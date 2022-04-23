import React, {useCallback, useEffect, useState} from 'react'
import {useForm} from '../../hooks'
// import PropTypes from 'prop-types'
import {getListAllPokemonInfo} from './api'
import EVStatisticsPanel from './EVStatisticsPanel'
import EVToggleStatsNav from './EVToggleStatsNav'
import PokemonCardPanel from './PokemonCardPanel'

const pokemonCountLimit = 898

const Dashboard = ({}) => {
  const [allData, setAllData] = useState([])
  const [allEvsStats, setAllEvsStats] = useState({})
  const [activeStat, setActiveStat] = useState('All')
  const {initialValues, currentValues, setInitialValues, isDirty, setValue} = useForm()

  const toggleActiveStat = useCallback(stat => {
    if (!stat) {
      console.log('Unknown stat toggle.')
      setActiveStat('All')
    }
    setActiveStat(stat)
  }, [setActiveStat])

  useEffect(() => {
    setInitialValues({
      searchBoxValue: ''
    })

    getListAllPokemonInfo().then(
      res => {
        // set holistic data
        setAllData(res.slice(0, 898))

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
  }, [setAllData, setAllEvsStats, setInitialValues])

  const statsHeaders = Object.keys(allEvsStats)
  const filteredData = allData
    .filter(d => {

    // filter by tab

    if (activeStat === 'All') {
      return true
    }
    let match = false
    for (let n = 0; n < d.ev_yield.length; n++) {
      const y = d.ev_yield[n]
      if (!match && activeStat === y.slice(2)) {
        match = true
      }
    }
    return match
  })
    .filter(d => {
      // filter by searchBoxValue value
      const {searchBoxValue} = currentValues
      if (!isDirty) return true

      else if (!(d.name.includes(searchBoxValue))) return false

      return true
    })

  return (
    <div className='row'>
      <EVStatisticsPanel
        evStats={allEvsStats}
        className='col-sm-3'
        style={{maxHeight: 400, backgroundColor: '#fff'}}
      />
      <div className='col-sm-6' style={{boxShadow: '0 5px 15px', backgroundColor: '#fff'}}>
        <EVToggleStatsNav
          evStatsHeaders={statsHeaders}
          onStatToggle={toggleActiveStat}
          activeStat={activeStat}
        />
        <div className='col-sm-12' style={{padding: 20, margin: '150px 0', }}>
          <input
            type='select'
            className='offset-sm-2 col-sm-8'
            placeholder='...Pikachu, etc.'
            style={{width: '100%', padding: 5}}
            value={currentValues['searchBoxValue'] || ''}
            onChange={e => setValue('searchBoxValue', e.target.value)}
          />
        </div>
        <PokemonCardPanel
          allData={filteredData}
          className='col-sm-12 text-center justify-content-center row'
          style={{marginBottom: 50}}
        />
      </div>
    </div>
  )
}

export default Dashboard
