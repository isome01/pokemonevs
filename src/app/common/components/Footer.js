import React from 'react'
import PropTypes from 'prop-types'

/* Adhoc footer component: props should not be passed in */

const footerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
}

const Footer = ({copyrightText}) => {
  return (
    <footer
      id='footer'
      className='col-sm-12'
      style={{}}
    >
      <div style={footerStyle}>
        <div className='' style={{textAlign: 'center', margin: '0 50px'}}>
          <span>
            <p>{copyrightText}</p>
          </span>
        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  copyrightText: PropTypes.string
}

Footer.defaultProps = {
  copyrightText: ''
}

export default Footer
