import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const ReactSelect = ({options}) => {
  return (
    <Select
      defaultValue={'N/A'}
      options={options}
    />
  )
}

ReactSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired
}

ReactSelect.defaultProps = {

}

export default ReactSelect
