import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect, Link } from 'react-router-dom'
import { 
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableFooter,
	TableRow,
	TableRowColumn,
	Toolbar,
	ToolbarGroup,
	ToolbarTitle,
	RaisedButton,
	Paper
} from 'material-ui'
import actions from '../actions'

class AdminUsers extends Component{
	componentDidMount(){
    this.props.actions.fetchUsers()
  }

	render(){

		const { user } = this.props
		let users

		let mockContent

		if (this.props.users) {
			users = this.props.users.data
			mockContent = users.map((i) => <li key={i.id}>{i.first_name}</li>)
		}

		return(
			<div>
				{
					user === false ? (<Redirect to="/" />) :
						user === null ? (<div>Loading application</div>) :
							(<div>
									{
										user.permissions == 'admin' && user.approved && users ?  
										(
											<Paper zDepth={1}>
												<Toolbar>
													<ToolbarGroup>
														<ToolbarTitle text="Manage Users" />
													</ToolbarGroup>
												</Toolbar>
												<Table>
													<TableHeader>
														<TableRow>
															<TableHeaderColumn tooltip="The user's name">Name</TableHeaderColumn>
															<TableHeaderColumn tooltip="The user's email address">Email</TableHeaderColumn>
															<TableHeaderColumn tooltip="The user's permissions">Permissions</TableHeaderColumn>
															<TableHeaderColumn tooltip="The action you wish to apply">Actions</TableHeaderColumn>
														</TableRow>
													</TableHeader>
													<TableBody>
														{
															users.map((i) => {
																return (
																	<TableRow key={i.id}>
																		<TableRowColumn>{i.first_name} {i.last_name}</TableRowColumn>
																		<TableRowColumn>{i.email}</TableRowColumn>
																		<TableRowColumn>{i.permissions}</TableRowColumn>
																		<TableRowColumn>
																			<Link to="/"><RaisedButton primary={true} label="Edit" /></Link>
																			<Link to="/"><RaisedButton secondary={true} label="Delete" /></Link>
																		</TableRowColumn>
																	</TableRow>
																)
															})
														}
													</TableBody>
													<TableFooter adjustForCheckbox={false}>
															<TableRow>
																<TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
																	Display Delete Selected button here
																</TableRowColumn>
															</TableRow>
														</TableFooter>
												</Table>
											</Paper>
										) :
										<div>Loading application</div>
									}
							</div>)
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('STATE', state);
	

  return {
		user : state.auth.user,
		users : state.users.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)