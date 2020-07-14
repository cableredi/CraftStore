import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
    };
  }

  handleChange = (value) => {
    this.setState(
      {
        searchString: value,
      },
      () => this.props.setSearchValue(value)
    );

    this.props.history.push("/products");
  };

  render() {
    return (
      <div>
        <input
          type="search"
          placeholder="Search items"
          value={this.state.searchString}
          onChange={(e) => this.handleChange(e.target.value)}
        />
      </div>
    );
  }
}

export default withRouter(Search);
