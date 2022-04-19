import React from 'react'
import PropTypes from 'prop-types'

const PokemonCardPanel = ({allData, className, style}) => {
  return (
    <div className={className} style={style}>
      {allData.map((data, i) => {
        const {name} = data
        const cleanedName = name.slice(0, 1).toUpperCase() + name.slice(1)
        if (!data.sprite_img) {
          return null
        }
        return (
          <a className='col-xs-3'
             key={`${data.name}-${i}`}
             href={data.link}
             target='_blank'
             style={{textDecoration: 'none', color: 'white', margin: '0 10px', minWidth: 250}}
          >
            <div className='card' style={{margin: '20px 0', borderRadius: 15}}>
              <div className='card-body' style={{background: 'rgb(64, 0, 128)'}}>
                <h5 className='card-title' style={{width: '100%'}}>{cleanedName}</h5>
                <div className='card-title' style={{width: '100%'}}>Dex No. {data.dex_no}</div>
              </div>
              <div  className='card-body'
                    style={{display: 'flex', align: 'center', alignItems: 'center'}}
              >
                <img
                  style={{width: 75, height: 50}}
                  src={data.sprite_img}
                  alt={data.sprite_img}
                  key={`${data.name}-${i}`}
                />
                <div
                  className='card-text'
                  style={{textAlign: 'center', alignItems: 'center', width: '100%', fontSize: 16, color: '#007bff'}}
                >
                  {data.ev_yield.map(y => (
                    <div key={y} style={{padding: 5}}>{y}</div>
                  ))}
                </div>
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}

PokemonCardPanel.propTypes = {
  allData: PropTypes.array.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

PokemonCardPanel.defaultProps = {
  className: '',
  style: {}
}

export default PokemonCardPanel
