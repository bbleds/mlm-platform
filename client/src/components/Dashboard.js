import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Route } from 'react-router-dom'
import { Avatar } from 'material-ui'
import actions from '../actions'

class Dashboard extends Component{
	render(){

		const { user } = this.props

		return(
			<div>
				{
          (<div>Coming from Dashboard. send general message and styling here</div>)
        }
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)