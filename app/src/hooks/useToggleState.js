import { useState } from 'react'

const useToggleState = () => {
  const [state, setState] = useState(false)
  const onToggleState = () => setState(prevState => !prevState)

  return { state, onToggleState }
}

export default useToggleState
