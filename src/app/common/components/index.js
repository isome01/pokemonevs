import React from 'react'
import PropTypes from 'prop-types'
import PageCover from './PageCover'
import {MainNavbar, SideNav, Tabs} from './Navigation'
import Modal from './Modal'
import SlickCarousel from './SlickCarousel'
import {Table, ColumnGroup, Column} from 'steelrose/common/components/Table'
import Striker from 'steelrose/common/components/Striker'

const sectionBlockStyle = {
  padding: 15,
  margin: 0,
  backgroundColor: '#000',
  color: '#fff'
}

const SectionBlock = ({children, className, style}) => (
  <section className={`col-sm-12 ${className}`} style={{...sectionBlockStyle, ...style}}>
    {children}
  </section>
)

const CardRow = ({className, style, children}) => (
  <div className={`card-row ${className}`} style={style}>
    {children}
  </div>
)

const Card = ({cardImgURL, cardTitle, children, className, style, titleSize=18, ...props}) => {
  return (
    <div className={`card ${className}`} style={style} {...props}>
      <div className='img-face' style={{backgroundImage: `url("${cardImgURL}")`}} />
      <div>
        <h4 style={{fontSize: titleSize}}>{cardTitle}</h4>
        {children}
      </div>
    </div>
  )
}

Card.propTypes = {
  cardImgURL: PropTypes.string.isRequired,
  cardTitle: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  titleSize: PropTypes.number,
  props: PropTypes.any
}

Card.defaultProps = {
  cardTitle: '',
  className: '',
  style: {},
  titleSize: 18
}

const Dialogue = ({style, className, children, ...props}) => (
  <div style={{...style}} className={`dialogue-frame ${className}`} {...props}>
    {children}
  </div>
)

Dialogue.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  props: PropTypes.any
}

Dialogue.defaultProps = {
  className: '',
  style: {},
}

export {
  PageCover,
  MainNavbar,
  SideNav,
  SectionBlock,
  CardRow,
  Card,
  Modal,
  Tabs,
  SlickCarousel,
  Table, ColumnGroup, Column,
  Striker,
  Dialogue
}
