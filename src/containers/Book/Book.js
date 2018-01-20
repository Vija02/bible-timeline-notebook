import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { bookIdFromName, unformatBook } from 'helper'

class Book extends Component {
  render() {
    const { loading, error } = this.props.data

    return (
      <div style={{ paddingLeft: 40 }}>
        <p>{unformatBook(this.props.match.params.bookName)}</p>
        <p style={{ width: "30vw" }}>{loading || error ? "-" : this.props.data.bookSummaries.nodes.length > 0 ? this.props.data.bookSummaries.nodes[0].summary : "No summary"}</p>
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