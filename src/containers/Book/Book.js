import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { unformatBook } from 'helper'

class Book extends Component {
  render() {
    const { loading, error } = this.props.data

    return (
      <div style={{ paddingLeft: 40 }}>
        <p>{unformatBook(this.props.match.params.bookName)}</p>
        <p style={{ width: "30vw" }}>{loading || error ? "-" : this.props.data.bookSummaries.nodes[0].summary}</p>
      </div>
    );
  }
}

export default compose(graphql(gql`
mutation($bookName: String!, $summary: String!){
  createBookSummary(input: {bookSummary:{bookName: $bookName, summary: $summary}}){
    bookSummary{
      id
    }
  }
}
`, {
    props: ({ mutate }) => ({
      createBookSummary: ({ bookName, summary }) => mutate({ variables: { bookName, summary } })
    })
  }), graphql(gql`
query($bookName: String!){
  bookSummaries: allBookSummaries(condition:{bookName: $bookName}){
    nodes{
      summary
    }
  }
}
`, { options: ({ match }) => ({ variables: { bookName: match.params.bookName } }) }))(Book)