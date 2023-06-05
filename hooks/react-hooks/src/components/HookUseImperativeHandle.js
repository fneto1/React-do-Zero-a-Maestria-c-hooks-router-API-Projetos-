import { useImperativeHandle, useRef } from 'react'

import SomeComponent from './SomeComponent'

const HookUseImperativeHandle = () => {
    const componentRef = useRef()
  return (
    <div>
        <h2>HookUseImperativeHandle</h2>
        <SomeComponent ref={componentRef} />
        <button onClick={() => componentRef.current.validate()} >Validate</button>
    </div>
  )
}

export default HookUseImperativeHandle