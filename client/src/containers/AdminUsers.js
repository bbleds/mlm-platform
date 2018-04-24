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

	constructor(props){
    super(props)
    this.handleRowSelection = this.handleRowSelection.bind(this)
  }

	componentDidMount(){
		this.props.actions.fetchUsers()
	}
	
	handleRowSelection(rows){
		this.setState({selectedRows: rows})
		this.props.actions.selectUsers(rows)
	}

	render(){
		const { user } = this.props
		let users

		if (this.props.users.users) {
			users = this.props.users.users.data
		}

		return(
			<div>
				{
					users ? 
						<Paper>
							<Toolbar>
								<ToolbarGroup>
									<ToolbarTitle text="Users"/>
								</ToolbarGroup>
							</Toolbar>
							<Table multiSelectable={true} onRowSelection={this.handleRowSelection}>
								<TableHeader>
									<TableRow>
										<TableHeaderColumn>Name</TableHeaderColumn>
										<TableHeaderColumn>Email</TableHeaderColumn>
										<TableHeaderColumn>Permissions</TableHeaderColumn>
										<TableHeaderColumn>Actions</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody>
									{
											users.map((i, index) => {
												return (
													<TableRow key={i.id} selected={this.state && this.state.selectedRows.indexOf(index) !== -1} >
														<TableRowColumn>{i.first_name} {i.last_name}</TableRowColumn>
														<TableRowColumn>{i.email}</TableRowColumn>
														<TableRowColumn>{i.permissions}</TableRowColumn>
														<TableRowColumn>
															<RaisedButton label="Edit" primary={true} />
															<RaisedButton label="Delete" secondary={true} />
														</TableRowColumn>
													</TableRow>
												)
											})
									}
								</TableBody>
								<TableFooter adjustForCheckbox={false}>
									<TableRow>
										<TableRowColumn colSpan="4" style={{textAlign: 'center'}}>
											{
												this.props.users.selectedUsers && this.props.users.selectedUsers.length ? 
													<RaisedButton secondary={true} label="Delete Selected" /> :
													"Footer"
											}
										</TableRowColumn>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper> : 
						<h1>Loading...</h1>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('STATE', state)

  return {
		user : state.auth.user,
		users : state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)