import React from 'react';

class MenuLink extends React.Component {

  render() {
    const { url, name } = this.props;
    return (
      <div>
        <div className='menulist-item my-2'>
          <a href={url} className='menulist-link'>
            {name}
          </a>
        </div>

        <style jsx>
          {
            `
              .menulist-item{
                color:white;
                text-align: left;
              }

              .menulist-link{
                color:white;
              }
            `
          }
        </style>
      </div>
    )
  }
}

export default MenuLink;