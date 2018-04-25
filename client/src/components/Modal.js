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

    const { modal } = this.props

    return (
      <Dialog
          modal={true}
          title={modal.title}
          open={modal.open}
          actions={modal.actions}
          children={modal.children}
      />
    )
  }
}

const mapStateToProps = state => ({ modal : state.modal })

const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)