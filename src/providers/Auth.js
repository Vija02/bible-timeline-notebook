import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext()

export const AuthConsumer = Consumer

export default class Auth extends Component {
  render() {
    return <Provider value={this.props.value}>{this.props.children}</Provider>
  }
}