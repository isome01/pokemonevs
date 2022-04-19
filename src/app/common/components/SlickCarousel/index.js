import React, {Fragment, useEffect} from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import * as styles from './SlickCarousel.module.css'
import {fromJS} from 'immutable'

const SlickCarousel = ({title, showTitle, imgURLS, children, className, style, slickConfig, imageStyle}) => {
  const slickId = `${title}-carousel`

  const slickSettings = {
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    dots: true,
    ...slickConfig
  }

  return (
    <div style={style} className={className}>
      <h3>{showTitle && title}</h3>
      <Slider {...slickSettings}>
        {fromJS(imgURLS).map((src, i) => (
          <div key={`${slickId}-${i}`} style={{imageStyle}}>
            <img
              src={src}
              alt={src}
              key={`${slickId}-${i}`}
              style={imageStyle}
              data-lazy={src}
            />
          </div>
        ))}
        {children && children}
      </Slider>
    </div>
  )
}

SlickCarousel.propTypes = {
  title: PropTypes.string,
  showTitle: PropTypes.bool,
  imgURLS: PropTypes.arrayOf(
    PropTypes.string
  ),
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  imageStyle: PropTypes.object
}

SlickCarousel.defaultProps = {
  imgURLS: [],
  style: {width: 500},
  className: '',
  imageStyle: {}
}

export default SlickCarousel
