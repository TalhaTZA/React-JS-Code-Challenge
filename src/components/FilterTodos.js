import React, { Component, Fragment } from "react";

import styled from "styled-components";

class FilterTodos extends Component {
  onOptionsChanged = ev => {
    this.props.onChange(ev.target.value, this.props.id);
  };

  render() {
    const { type } = this.props;

    return (
      <Fragment>
        <DropDown value={type} onChange={this.onOptionsChanged}>
          <option  value={1}>
            All
          </option>
          <option value={2}>
            Active
          </option>
          <option  value={3}>
            Completed
          </option>
        </DropDown>
      </Fragment>
    );
  }
}

const DropDown = styled.select`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 50px;
  width: 500px;
  margin-bottom: 16px;
  margin-top: 16px

  &::placeholder {
    color: #8d96a8;
  }
`;

export default FilterTodos;
