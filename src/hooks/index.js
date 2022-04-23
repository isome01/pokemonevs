import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {fromJS} from 'immutable'

const useForm = (values = {}) => {
  if (typeof (values) !== 'object') {
    throw new Error('Initial values type should be either a javascript object.')
  }

  const [currentValues, setValues] = useState({})
  const [initialValues, setInitialValues] = useState({})
  const setValue = useCallback((key = '', value = '') => {
    const values  = currentValues || {}
    setValues({...values, [key]: value})
  }, [setValues, currentValues])

  const initialize = useCallback((initialValues = {}) => {
    const values = {}
    const keys = Object.keys(initialValues || {})
    keys.forEach(key => {
      values[String(key)] = initialValues[key]
    })
    setInitialValues({...values})
    setValues({...values})
  }, [setInitialValues, setValues])

  const isDirty = !(fromJS(initialValues).equals(fromJS(currentValues)))

  return {
    currentValues,
    setValue,
    setValues,
    initialValues,
    setInitialValues: initialize,
    isDirty
  }
}

export {
  useForm
}