import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Route } from 'react-router-dom'
import { Avatar } from 'material-ui'
import actions from '../actions'
import AdminUsers from './AdminUsers'
import MemberSideNav from '../components/MemberSideNav'

class Dashboard extends Component{
	render(){

		const { user } = this.props


		return(
			<div>
				{
					user === false ? (<Redirect to="/" />) :
						user === null ? (<div>Loading application</div>) :
							(<div>
								<h1>Coming from Dashboard</h1>
									{
										user.profile_img_url ? 
										<MemberSideNav user={user}/> :
										<MemberSideNav />
									}
									<h1>Welcome, {user.first_name}</h1>
									{
										user.approved ?  
										<h1>You are approved</h1> :
										<h1>We are currently waiting on your account to be approved. Once it has been approved, you will receive an email and be able to access protected content. Thank you!</h1>
									}
									<Route exact path="/admin-dashboard/users" component={AdminUsers} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)