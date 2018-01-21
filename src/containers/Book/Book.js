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

  onConfirm() {
    this.props.upsertBookSummary({ bookId: bookIdFromName(this.props.match.params.bookName), summary: this.state.bookSummary }).then(() => {
      this.setState({ editing: false })
    }).catch((err) => {
      console.log(err);
      alert("Error when updating summary. Please try again later.")
    })
  }

  render() {
    const { loading, error } = this.props.data

    return (
      <div className={styles.bookContainer}>
        <div className={styles.titleContainer}>
          <a className={styles.title}>{unformatBook(this.props.match.params.bookName)}</a>
          <div onClick={() => { this.setState({ editing: !this.state.editing }) }}><i className={`fas fa-edit ${styles.editButton}`} /></div>
        </div>
        {
          this.state.editing ?
            <div className={styles.editBookContainer}>
              <textarea value={this.state.bookSummary} onChange={linkState(this, "bookSummary")} />
              <button onClick={() => { this.onConfirm() }}>Confirm</button>
            </div> :
            <p style={{ width: "30vw" }}>{loading || error ? "-" : this.props.data.bookSummary ? this.props.data.bookSummary.summary : "No summary"}</p>
          }
      </div>
    );
  }
}

// TODO: Change to get from current user
const GetBookSummaryQuery = gql`
query($bookId: Int!){
  bookSummary: bookSummaryByUserIdAndBookId(userId: 1, bookId: $bookId){
    nodeId
    summary
  }
}
`

export default compose(graphql(gql`
mutation($bookId: Int!, $summary: String!){
  upsertBookSummary(input: {bookId: $bookId, summary: $summary}){
    bookSummary{
      nodeId
      summary
    }
  }
}
`, {
    props: ({ mutate }) => ({
      upsertBookSummary: ({ bookId, summary }) => mutate({
        variables: { bookId, summary },
        update: (proxy, { data: { upsertBookSummary } }) => {
          const data = proxy.readQuery({ query: GetBookSummaryQuery, variables: { bookId } });
          data.bookSummary = upsertBookSummary.bookSummary
          proxy.writeQuery({ query: GetBookSummaryQuery, variables: { bookId }, data });
        }
      })
    })
  }), graphql(GetBookSummaryQuery, {
    options: ({ match }) => ({
      variables: { bookId: bookIdFromName(match.params.bookName) },
    })
  }))(Book)
