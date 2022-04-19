import ajax from './ajax'
import browserStorage from './browserStorage'

const getStyleStringFromObj = style => {
  if (!(Object.keys(style).length)) return ''

  return(
    Object.entries(style)
      .map(([k,v]) => {
        k = k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)

        return v ? `${k}: ${v}` : ''
      })
      .reduce((a, b) => a + b + ';')
  )
}

export {
  ajax,
  browserStorage,
  getStyleStringFromObj
}