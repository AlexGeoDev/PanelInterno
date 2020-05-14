import React from 'react';

function FieldForm(props) {
  console.log('FIELD PROPS', props);
  return (
    <React.Fragment>
      <div className={`d-flex ${props.customStyle} ${props.horizontal ? 'justify-content-between align-items-center' : 'flex-column align-items-start'} `}>
        <label className='mb-0 mr-2 font-bold'>
          {props.label}
        </label>
        {props.readOnly ?
          <p
            className={`mb-0 ${props.horizontal ? 'w-50' : 'w-100'}`}
          >
            {props.value}
          </p>
          :
          <input
            className={`field-container ${props.horizontal ? ' w-50' : 'w-100'}`}
            type='text'
            value={props.value}
            onChange={(field) => {
              if (props.onChangeValue) {
                props.onChangeValue(field.target.value)
              }
            }}
          />
        }
      </div>

      <style jsx>
        {
          `
            .field-container {
              border-radius: 4px;
              border: 1px solid rgba(26, 26, 26, .5);
              height: 40px;
              padding-left: 0.7rem;
            }
          `
        }
      </style>
    </React.Fragment >
  );
}

export { FieldForm };