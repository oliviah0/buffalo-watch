/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import "./SearchForm.css";
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.searchterm) {
      this.setState({ keyword: this.props.searchterm });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.keyword}`);
  }

  render() {
    return (
      <div>

        <Form id="search-form" onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              size="lg"
              placeholder="Search"
              name="keyword"
              id="keyword"
              onChange={this.handleChange}
              value={this.state.keyword}
            />
            <InputGroup.Append>
              <Button
                type="submit"
                variant="outline-primary">
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(SearchForm);