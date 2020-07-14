import React, { Component } from "react";
import Context from "../../Context/Context";
import { withRouter } from 'react-router-dom';

class Search extends Component {
  static contextType = Context;

  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
  }

  handleChange = value => {
    this.setState(
      {
        searchString: value
      },
      () => this.context.setSearchValue(value)
    );

    this.props.history.push('/products');
  };

  render() {
    return (
      <div>
        <input
          type="search"
          placeholder="Search items"
          className=".NavBar__search-keyword"
          value={this.state.searchString}
          onChange={e => this.handleChange(e.target.value)}
        />
      </div>
    );
  }
}

export default withRouter(Search);
