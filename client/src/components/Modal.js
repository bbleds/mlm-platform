import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
   Dialog,
   FlatButton,
   RaisedButton
} from 'material-ui'
import actions from '../actions'

class Modal extends Component {

  render() {
    return (<Dialog
        title={this.props.modal.title}
        modal={true}
        open={this.props.modal.open}
        actions={this.props.modal.actions}
        children={this.props.modal.children}
    />)
  }
}

const mapStateToProps = state => {
  return {
    modal : state.modal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)