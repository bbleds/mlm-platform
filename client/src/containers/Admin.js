import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Route } from 'react-router-dom'
import { Avatar } from 'material-ui'
import actions from '../actions'
import AdminUsers from './AdminUsers'
import Dashboard from '../components/Dashboard'
import AdminUsersEdit from '../components/AdminUsersEdit'

class Admin extends Component{
	render(){

		const { user } = this.props

		return(
			<div>
				{
					user === false ? (<Redirect to="/" />) :
						user === null ? (<div>Loading application</div>) :
							(<div className="container" >
								<h1>Admin</h1>
									<Route exact path ='/admin' component={Dashboard} />
									<Route exact path="/admin/users" component={AdminUsers} />
									<Route exact path="/admin/users/:id" component={AdminUsersEdit} />
							</div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)