import React from 'react'
import PropTypes from 'prop-types'


const EVStatisticsPanel = ({evStats, className, style}) => {

  const evKeys = Object.keys(evStats)
  return (
    <div className={className} style={style}>
      <div style={{padding: 20, margin: 'auto', borderBottom: 'solid 5px #440088', borderRadius: 10}}>
        <h3 style={{marginTop: 50, fontWeight: 'bold'}}>Total Pokemon Effort Values </h3>
        {evKeys.map(ev => (
          <h4 style={{fontSize: 20}} key={`${ev}`}>{ev}: {evStats[ev]}</h4>
        ))}
      </div>
    </div>
  )
}

EVStatisticsPanel.propTypes = {
  evStats: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.any
}

EVStatisticsPanel.defaultProps = {
  evStats: {},
  className: '',
  style: {}
}

export default EVStatisticsPanel
