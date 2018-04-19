import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import { Avatar } from 'material-ui'
import actions from '../actions'

class Dashboard extends Component{
	render(){

		const { user } = this.props


		return(
			<div>
				{
					user === false ? (<Redirect to="/" />) :
						user === null ? (<div>Loading application</div>) :
							(<div>
									{
										user.profile_img_url ? <Avatar src={user.profile_img_url} />	:
										''
									}
									<h1>Welcome, {user.first_name}</h1>
									{
										user.approved ? 
										<h1>You are approved</h1> :
										<h1>We are currently waiting on your account to be approved. Once it has been approved, you will receive an email and be able to access protected content. Thank you!</h1>
									}
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