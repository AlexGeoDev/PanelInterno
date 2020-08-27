import React from 'react';

function TabComponent(props) {
  return (
    <div className='d-flex justify-content-center'>
      {props.listElement &&
        props.listElement.map((element, key) => (
          <div
            key={key}
            className={`mx-2 tab-item ${props.active == element.active && 'active'}`}
            onClick={() => {
              if (element.onAction) {
                element.onAction();
              }
            }}
          >
            {element.label}
          </div>
        ))
      }
    </div>
  )
}

export default TabComponent;