import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as styles from './common.module.css'


const NavbarContent = (navbarTitle, navbarHeader) => (
  <div>
    <div>
      <span><a href="#"> {navbarTitle} </a></span>
    </div>
    {/* Map a list of navbar links here... */}
  </div>
)

NavbarContent.propTypes = {
  navbarTitle : PropTypes.string,
}

const MainNavbar = ({id, className, style, navLogoImg, navLogoText, navContent, hideNavLogoText, showLogin}) => {

  const resetActive = () => {
  }

  const [selectedChild, getSelectedChild] = useState(null)
  return (
    <Fragment>
      <nav
        className={`main-navbar navbar-dark navbar navbar-expand-md navbar-expand-sm ${className}`}
        style={{...style}}
      >
        {/* Navbar header */}
        <div className='navbar-header'>
          <Link to='/'>
              <span className='nav-header navbar-brand'>
                {(navLogoImg &&
                  <img src={navLogoImg} alt={navLogoText} className='nav-logo'/>
                )}
                {!hideNavLogoText && navLogoText}
              </span>
          </Link>
        </div>
        {/* navbar toggler: for mobile view */}
        <div className='' style={{width: 75}}>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target={`#${id.replace(/ /g, '-')}`}
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='hztlNavButton'
          >
            <span className='navbar-toggler-icon' />
          </button>
        </div>
        {/* Our precious little links */}
        <div id={id.replace(/ /g, '-')} className='collapse navbar-collapse nav-content' style={{width: '100%'}}>
          <ul className='navbar-nav' style={{display: 'flex', justifyContent: 'center', width: '100%', marginLeft: 50, marginRight: 50}}>
            {(navContent || []).map((content, i) => (
              <Fragment key={`${content.text || ''}-${i}`}>
                {/*<div className='nav-separator text-center'>|</div>*/}
                <li
                  onMouseOver={() => getSelectedChild(content.children)}
                  onClick={content.children ? null : resetActive}
                >
                  <Link
                    to={content.link || '#'}
                    className='nav-item'
                  >{content.text && content.text}
                  </Link>
                </li>
              </Fragment>
            ))}
          </ul>
          {showLogin && (
            <span className='nav-login'>
              <Link to='/login' className='nav-item'>
                Login
              </Link>
            </span>
          )}
        </div>
      </nav>
      {
        selectedChild &&
        <div
          onMouseLeave={() => getSelectedChild(null)}
          className='child-content'>
          {selectedChild}
        </div>
      }
      <div
        className='collapse'
        id='navbarToggleExternalContent'
        style={{marginTop: 20}}
      />
    </Fragment>
  )
}

MainNavbar.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  navLogoImg: PropTypes.string,
  navLogoText: PropTypes.any.isRequired,
  navContent: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      children: PropTypes.any
    }).isRequired
  ).isRequired,
  style: PropTypes.object,
  hideNavLogoText: PropTypes.bool,
  showLogin: PropTypes.bool
}

MainNavbar.defaultProps = {
  style: {},
  className: '',
}

const SideNav = ({}) => {
  return (
    <nav>

    </nav>
  )
}

const Tabs = ({tabsetId, tabs, className, style, containerStyle, containerClassName, children}) => {
  const [active, setActiveTab] = useState(0)

  return (
    <Fragment>
      <nav className={`${className}`} style={style}>
        <ul className='nav nav-tabs' role='tablist' id={tabsetId} style={{width: '100%'}}>
          {tabs.map((tab, i) => (
            <li key={`${tab}${i}`} className={`nav-item ${active === i ?'active' : ''}`}>
              <Link
                id={`${tab}-tab`}
                key={`${tab}-${i}`}
                to={`#${tab}`}
                className={`nav-link ${active === i ?'active' : ''}`}
                onClick={() => setActiveTab(i)}
                data-toggle='tab'
                role='tab'
                aria-controls={tab}
                aria-selected={active === i}
              >
                {tab}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className={`tab-content ${containerClassName}`}
        id={`${tabsetId}Content`}
        style={{width: '100%', ...containerStyle}}
      >
        {(
          typeof (children) === 'object' && (
            children.map((child, i) => (
              <div
                className={`tab-pane fade ${(i === active) ? 'show active' : ''}`}
                id={tabs[i]}
                role='tabpanel'
                aria-labelledby={`${tabs[i]}-tab`}
                key={`${tabs[i]}-tab-${i}`}
              >
                {child}
              </div>
            ))
          )
        )}
      </div>
    </Fragment>
  )
}

Tabs.propTypes = {
  tabsetId: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  containerStyle: PropTypes.object,
  containerClassName: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any
}

Tabs.defaultProps = {
  style: {},
  className: '',
  containerStyle: {},
  containerClassName: '',
}

SideNav.propTypes = {

}

export {
  MainNavbar,
  SideNav,
  NavbarContent,
  Tabs
}
