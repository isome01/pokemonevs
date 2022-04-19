import React from 'react'
import PropTypes from 'prop-types'


const EVToggleStatsNav = ({evStatsHeaders, onStatToggle, activeStat}) => {

  return (
    <div className='card text-center'>
      <div className='card-header'>
        <ul className='nav nav-tabs card-header-tabs'>
          <li className='nav-item' onClick={() => onStatToggle('All')}>
            <a
              className={`nav-link ${activeStat === 'All' ? 'active' : ''}`}
              href='#'><b>All</b></a>
          </li>
          {
            evStatsHeaders.map(header => (
              <li key={`${header}-nav-item`} className='nav-item' onClick={() => onStatToggle(header)}>
                <a
                  className={`nav-link ${activeStat === header ? 'active' : ''}`}
                  href='#'
                >{header}</a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

EVToggleStatsNav.propTypes = {
  evStatsHeaders: PropTypes.any,
  onStatToggle: PropTypes.func,
  activeStat: PropTypes.string
}

EVToggleStatsNav.defaultProps = {
  evStatsHeaders: [],
  onStatToggle: () => {},
  activeStat: ''
}

export default EVToggleStatsNav
