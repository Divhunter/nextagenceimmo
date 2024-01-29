import React from 'react'
import './checkbox.css'

const CheckboxCustom = ({checked,size=20,handleCheckedChange}) => {
  return (
    <div>
          <label className='checkbox-container'>
              <input
                type="checkbox"
                className="checkbox"
                id="accepter-conditions"
                name="accepter-conditions"
                style={{width:`${size}px`,height:`${size}px`}}
                checked={checked}
                onChange={handleCheckedChange} />
              <span></span>
            </label>
    </div>
  )
}

export default CheckboxCustom