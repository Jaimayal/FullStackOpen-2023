import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const TogableComponent = (props, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  if (visible) {
    return (
      <>
        {props.children}
        <button onClick={() => setVisible(false)}>Cancel</button>
      </>
    )
  }

  return (
    <>
      <button onClick={() => setVisible(true)}>{props.buttonLabel}</button>
    </>
  )
}

const Togglable = forwardRef(TogableComponent)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
