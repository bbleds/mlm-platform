import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
	FlatButton,
	Paper
} from 'material-ui'
import TableList from '../components/TableList'
import actions from '../actions'

class AdminUsers extends Component{

	componentDidMount(){
		this.props.actions.fetchUsers()
	}

	render(){
		const { user } = this.props
		const users = this.props.users.users ? this.props.users.users.data.filter(i=>i.id !== user.id) : []
		const headerCols = ['Name', 'Email', 'Permissions', 'Actions']

		const bodyContent = users && users.length ?
			users.map((i, index) => {
				return (
					<TableRow 
						key={i.id} 
						selected={this.props.users.selectedUsers.filter(x => x.id === i.id).length > 0} 
					>
						<TableRowColumn>{i.first_name} {i.last_name}</TableRowColumn>
						<TableRowColumn>{i.email}</TableRowColumn>
						<TableRowColumn>{i.permissions}</TableRowColumn>
						<TableRowColumn>
							<div onClick={e=>{
								e.preventDefault()
								e.stopPropagation()
							}}>
								<RaisedButton 
									label="Edit" 
									primary={true} 
								/>
								<RaisedButton 
									label="Delete" 
									secondary={true} 
									onClick={() => {
										this.props.actions.toggleModal(
											'Confirm Delete',
											(<div>
												<FlatButton
													label="Cancel"
													onClick={() => this.props.actions.toggleModal()}
												/>
												<FlatButton 
													label="Confirm" 
													onClick={() => {
														this.props.actions.deleteUsers([i.id])
														this.props.actions.toggleModal()
													}}
												/>
											</div>),
											(<p>This cannot be undone and will erase this user and all associated data. Are you sure you want to delete user "{i.first_name} {i.last_name}"?</p>)
									)}}
								/>
							</div>
						</TableRowColumn>
					</TableRow>
				)
				}) : 
				""
		const footerContent = this.props.users.selectedUsers && this.props.users.selectedUsers.length ? 
			<RaisedButton 
				secondary={true} 
				label="Delete Selected" 
				onClick={()=>{
					this.props.actions.toggleModal(
						'Confirm Delete',
						(<div>
							<FlatButton
								label="Cancel"
								onClick={() => this.props.actions.toggleModal()}
							/>
							<FlatButton 
								label="Confirm" 
								onClick={() => {
									this.props.actions.deleteUsers(this.props.users.selectedUsers.map(i=>i.id))
									this.props.actions.toggleModal()
								}}
							/>
						</div>),
						(<p>This cannot be undone and will erase the selected user(s) and all associated data. Are you sure you want to delete the selected users? </p>)
				)}}
			/> :
			""

		return(
			<div>
				{ 
				users ? 
					users.length > 0 ? 
						<TableList
							title={'Users'}
							headerCols={headerCols}
							onRowSelection = {(rows) => this.props.actions.selectUsers(rows)}
							bodyContent={bodyContent}
							footerContent={footerContent}
						/> :
						<h1>No user Data Available</h1> :
					<h1>Loading...</h1>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
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