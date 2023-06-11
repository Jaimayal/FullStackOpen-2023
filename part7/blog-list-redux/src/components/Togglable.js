import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

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
        <Button onClick={() => setVisible(false)} variant="outlined" color="error">
          Cancel
        </Button>
      </>
    )
  }

  return (
    <>
      <Button onClick={() => setVisible(true)} variant="outlined">
        {props.buttonLabel}
      </Button>
    </>
  )
}

const Togglable = forwardRef(TogableComponent)

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
