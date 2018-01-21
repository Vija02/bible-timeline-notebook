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
            <p style={{ width: "30vw" }}>{loading || error ? "-" : this.props.data.bookSummaries.nodes.length > 0 ? this.props.data.bookSummaries.nodes[0].summary : "No summary"}</p>
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
  }), graphql(gql`
query($bookId: Int!){
  bookSummaries: allBookSummaries(condition:{bookId: $bookId}){
    nodes{
      summary
    }
  }
}
`, { options: ({ match }) => ({ variables: { bookId: bookIdFromName(match.params.bookName) } }) }))(Book)