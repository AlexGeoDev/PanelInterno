import React from 'react';
//import '../styles/login.css';

class Card extends React.Component {
  render() {
    return(
      <React.Fragment>
        <div className="col-md-2 card">
          <div>
            {this.props.name}
          </div>
          <div>
            {this.props.total}
          </div>
        </div>
        <style jsx>{`
          .card {
            background-color : ${this.props.color};
            height: 100px;
            weidht: 100px;
          }
        `}</style>
      </React.Fragment>
    );
  }
};

export default Card;