import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import linkState from 'linkstate'

import { bookIdFromName, unformatBook } from 'helper'
import styles from './Book.module.css'

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, bookSummary: "" };
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.props.data.bookSummary !== nextProps.data.bookSummary) {
      this.setState({ bookSummary: nextProps.data.bookSummary ? nextProps.data.bookSummary.summary : "" })
    }
  }
  render() {
    const { loading, error } = this.props.data

    return (
      <div style={{ paddingLeft: 40, display: "flex", flexDirection: "column", marginTop: 20 }}>
        <div style={{ display: "flex" }}>
          <a style={{ marginRight: 5 }}>{unformatBook(this.props.match.params.bookName)}</a>
          <div onClick={() => { this.setState({ editing: !this.state.editing }) }}><i className={`fas fa-edit ${styles.editButton}`} /></div>
        </div>
        {
          this.state.editing ?
            <textarea value={this.state.bookSummary} onChange={linkState(this, "bookSummary")} /> :
            <p style={{ width: "30vw" }}>{loading || error ? "-" : this.props.data.bookSummary ? this.props.data.bookSummary.summary : "No summary"}</p>
        }
      </div>
    );
  }
}

export default compose(graphql(gql`
mutation($bookId: Int!, $summary: String!){
  createBookSummary(input: {bookSummary:{bookId: $bookId, summary: $summary}}){
    bookSummary{
      id
    }
  }
}
`, {
    props: ({ mutate }) => ({
      createBookSummary: ({ bookId, summary }) => mutate({ variables: { bookId, summary } })
    })
    // TODO: Change to get from current user
  }), graphql(gql`
query($bookId: Int!){
  bookSummary: bookSummaryByUserIdAndBookId(userId: 1, bookId: $bookId){
    summary
  }
}
`, { options: ({ match }) => ({ variables: { bookId: bookIdFromName(match.params.bookName) } }) }))(Book)