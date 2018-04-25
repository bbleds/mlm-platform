import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
   Snackbar,
   FlatButton,
   RaisedButton
} from 'material-ui'
import actions from '../actions'

class Notification extends Component {

  render() {
    return (<Snackbar
        message={this.props.notification.message}
        open={this.props.notification.open}
        autoHideDuration={this.props.notification.autoHideDuration}
        onRequestClose={this.props.actions.toggleNotification}
    />)
  }
}

const mapStateToProps = state => {
  return {
    notification : state.notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)