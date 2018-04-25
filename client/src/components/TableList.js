import React, { Component } from 'react'
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
import actions from '../actions'

export default class TableList extends Component{

	render(){
		const { 
            multiSelectable,
            onRowSelection,
            deselectOnClickaway,
            bodyContent,
            footerContent
        } = this.props

		return(
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle 
                            text="Users"
                        />
                    </ToolbarGroup>
                </Toolbar>
                <Table 
                    multiSelectable={multiSelectable || true} 
                    onRowSelection={onRowSelection}
                >
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Permissions</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody 
                        deselectOnClickaway={ deselectOnClickaway || false}
                    >
                        { bodyContent }
                    </TableBody>
                </Table>
                <Toolbar>
                    <ToolbarGroup>
                        { footerContent }
                    </ToolbarGroup>
                </Toolbar>
            </Paper> 
		)
	}
}