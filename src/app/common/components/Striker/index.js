import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import * as styles from './Striker.module.css'


const strikerDirection = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
const polygonConfigDefault = {height: 0, width: 0, slope: 0}


const Striker = ({direction, polygonColor, children,
                   style, className, polygonStyle, polygonClassName, headerStyle, headerClassName}) => {
  const [strikerSelections, setStrikerSelections] = React.useState({})

  const configureDimensions = React.useCallback(() => {
    const polygonConfig = polygonConfigDefault
    /* grab height and width of the parent of the striker-container */
    const strikerComponent = $('.striker')
    polygonConfig.width = strikerComponent.parent().innerWidth()
    polygonConfig.height = strikerComponent.parent().innerHeight()
    polygonConfig.slope = (polygonConfig.width + polygonConfig.height) / 2

    const config = {
      config : polygonConfig,
      left: {
        borderRight: 0,
        borderLeft: `solid ${polygonConfig.width}px ${polygonColor}`,
        borderTop: `solid ${polygonConfig.height}px transparent`,
        borderBottom: `solid ${polygonConfig.height}px transparent`
      },
      topLeft: {
        borderRight: `solid ${polygonConfig.width}px transparent`,
        borderLeft: 0,
        borderTop: `solid ${polygonConfig.height}px ${polygonColor}`,
        borderBottom: 0
      },
      bottomLeft: {
        borderRight: `solid ${polygonConfig.width}px transparent`,
        borderLeft: 0,
        borderBottom: `solid ${polygonConfig.height}px ${polygonColor}`,
        borderTop: 0
      },
      right: {
        borderRight: `solid ${polygonConfig.width}px ${polygonColor}`,
        borderLeft: 0,
        borderTop: `solid ${polygonConfig.height}px transparent`,
        borderBottom: `solid ${polygonConfig.height}px transparent`
      },
      topRight: {
        borderRight: 0,
        borderLeft: `solid ${polygonConfig.width}px transparent`,
        borderTop: `solid ${polygonConfig.height}px ${polygonColor}`,
        borderBottom: 0
      },
      bottomRight: {
        borderRight: 0,
        borderLeft: `solid ${polygonConfig.width}px transparent`,
        borderTop: 0,
        borderBottom: `solid ${polygonConfig.height}px ${polygonColor}`
      },
      top: {
        borderRight: `solid ${polygonConfig.width}px transparent`,
        borderLeft: `solid ${polygonConfig.width}px transparent`,
        borderTop: `solid ${polygonConfig.height}px ${polygonColor}`,
        borderBottom: 0
      },
      bottom: {
        borderRight: `solid ${polygonConfig.width}px transparent`,
        borderLeft: `solid ${polygonConfig.width}px transparent`,
        borderTop: 0,
        borderBottom: `solid ${polygonConfig.height}px ${polygonColor}`
      },
      hourglass: {
        borderRight: `solid ${polygonConfig.width}px transparent`,
        borderLeft: `solid ${polygonConfig.width}px transparent`,
        borderTop: `solid ${polygonConfig.height}px ${polygonColor}`,
        borderBottom: `solid ${polygonConfig.height}px ${polygonColor}`
      },
      infinity: {
        borderRight: `solid ${polygonConfig.width}px ${polygonColor}`,
        borderLeft: `solid ${polygonConfig.width}px ${polygonColor}`,
        borderTop: `solid ${polygonConfig.height}px transparent`,
        borderBottom: `solid ${polygonConfig.height}px transparent`
      }
    }
    setStrikerSelections(config)
  }, [setStrikerSelections])

  React.useEffect(() => {
    $(document).ready(() => {
      configureDimensions()
    })
    $(window).resize(() => {
      configureDimensions()
    })
  }, [configureDimensions])

  React.useEffect(() => {
    // component will mount
    return configureDimensions()
  }, [configureDimensions])

  /*
  * Look into enabling this component with other layers
  * */

  const selection = strikerSelections[direction] || {}

  return (
    <div className={`striker ${className}`} style={style}>
      <div
        className={`striker-polygon ${polygonClassName}`}
        style={{zIndex: 2, ...selection, ...polygonStyle}}
      />
      <div className={`striker-header ${headerClassName}`} style={{zIndex: 10,...headerStyle}}>
        {children}
      </div>
    </div>
  )
}

Striker.propTypes = {
  direction: PropTypes.oneOf(strikerDirection),
  polygonColor: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  headerStyle: PropTypes.object,
  headerClassName: PropTypes.string,
  polygonStyle: PropTypes.object,
  polygonClassName: PropTypes.string,
}

Striker.defaultProps = {
  direction: strikerDirection[0],
  polygonColor: 'rgba(0, 0, 0, 1)',
  style: {},
  className: '',
  headerStyle: {},
  headerClassName: '',
  polygonStyle: {},
  polygonClassName: ''
}

export default Striker
