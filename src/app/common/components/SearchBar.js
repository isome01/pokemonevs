import React from 'react'
import PropTypes from 'prop-types'

const SearchBar = ({dataList, style, className}) => {
  return (
    <input
      type='select'
      className='offset-sm-2 col-sm-8'
      placeholder='...Pikachu, etc.'
      style={{width: '100%', ...style}}
    />
  )
}

SearchBar.propTypes = {
  dataList: PropTypes.array,
  style: PropTypes.object,
  className: PropTypes.string
}

SearchBar.defaultProps = {
  dataList: [],
  style: {},
  className: ''
}

export default
