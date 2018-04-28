import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
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
		const headerCols = ['Name', 'Email', 'Permissions']

		const data = users.map(i=>{
			return {
				...i,
				name : `${i.first_name} ${i.last_name}`,
				actions : [
					{
						label : 'Edit',
						linkTo : `/admin/users/${i.id}`
					},
					{
						label : 'Delete',
						clickHandler : () => {
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
						)}
					}
				],
				selected : this.props.users.selectedUsers.filter(n=>n.id == i.id).length ? true : false
			}
		})
		
		// let desktopfooterContent = this.props.users.selectedUsers && this.props.users.selectedUsers.length ? 
		// 	<RaisedButton 
		// 		secondary={true} 
		// 		label="Delete Selected" 
		// 		onClick={()=>{
		// 			this.props.actions.toggleModal(
		// 				'Confirm Delete',
		// 				(<div>
		// 					<FlatButton
		// 						label="Cancel"
		// 						onClick={() => this.props.actions.toggleModal()}
		// 					/>
		// 					<FlatButton 
		// 						label="Confirm" 
		// 						onClick={() => {
		// 							this.props.actions.deleteUsers(this.props.users.selectedUsers.map(i=>i.id))
		// 							this.props.actions.toggleModal()
		// 						}}
		// 					/>
		// 				</div>),
		// 				(<p>This cannot be undone and will erase the selected user(s) and all associated data. Are you sure you want to delete the selected users? </p>)
		// 		)}}
		// 	/> :
		// 	""
		let bulkActions = this.props.users.selectedUsers && this.props.users.selectedUsers.length ?
				[{
					label : 'Delete Selected',
					clickHandler : ()=>{
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
					)}
				}] : 
				""

		return(
			<div>
				{  
					users.length > 0 ? 
						<TableList
							includeActions={true}
							title={'Users'}
							headerCols={headerCols}
							onRowSelection = {(rows) => this.props.actions.selectUsers(rows)}
							data={data}
							bulkActions={bulkActions}
						/> :
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