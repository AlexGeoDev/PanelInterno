import React from "react"
import PropTypes from "prop-types"

class SerialForm extends React.Component {
  static propTypes = {
    consultaActivation: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      serial: ""
    }
  }

  onsubmit = (e) => {
    e.preventDefault()
    this.props.consultaActivation(this.state.serial)
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.onsubmit}>
        <input
          required={true}
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={this.state.serial}
          onChange={e => this.setState({ serial: e.target.value })}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    )
  }
}
export default SerialForm
