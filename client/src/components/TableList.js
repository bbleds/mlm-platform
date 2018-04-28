import React, { Component } from 'react'
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
import { TableCell } from 'material-ui/Table'
import actions from '../actions'
import * as R from 'ramda'

export default class TableList extends Component{

	render(){
		const {
            title,
            headerCols,
            multiSelectable,
            onRowSelection,
            deselectOnClickaway,
            data,
            bulkActions,
            includeActions
        } = this.props

        console.log('DESKTOP FOOTER ACTIONS', bulkActions);

		return(
            <Paper>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle 
                            text={title || "Default"}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <Table 
                    multiSelectable={multiSelectable || true} 
                    onRowSelection={onRowSelection}
                >
                    <TableHeader>
                        <TableRow>
                            { headerCols.map((i, index)=> <TableHeaderColumn key={index}>{i}</TableHeaderColumn>) }
                            { includeActions ?  <TableHeaderColumn>Actions</TableHeaderColumn> : ''}
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={ deselectOnClickaway || false}>
                        { data && data.length > 0 ? 
                            data.map((i) => {
                                return (
                                    <TableRow 
                                        key={i.id}
                                        selected={i.selected}>
                                        {
                                            headerCols.map((n,index) => {
                                                return (
                                                    <TableRowColumn key={index}>{i[n.toLowerCase()]}</TableRowColumn>
                                                )
                                            })
                                        }
                                        {
                                            includeActions ? 
                                            <TableRowColumn>
                                                {
                                                    i.actions.map((action, index)=>{
                                                        const button = action.linkTo ? 
                                                            <Link to={action.linkTo}>
                                                                <RaisedButton label={action.label}/>
                                                            </Link> : 
                                                            <RaisedButton 
                                                                label ={action.label}
                                                                onClick={action.clickHandler}
                                                            />

                                                        return (
                                                            <div 
                                                                key={index} 
                                                                style={{display:"inline-block"}}
                                                                onClick={e=>{
                                                                    e.preventDefault()
                                                                    e.stopPropagation()
                                                                }}>   
                                                                {button}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </TableRowColumn> : 
                                            ""
                                        }
                                    </TableRow>
                                )
                            }) :
                            <TableRow>
                              <TableRowColumn>No data provided</TableRowColumn>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <Toolbar>
                    <ToolbarGroup>
                        { bulkActions ? 
                            bulkActions.map((i,index)=>{
                               return (
                                <RaisedButton 
                                    key={index}
                                    label={i.label}
                                    onClick={i.clickHandler}
                                />)
                            }) :
                            ""  
                        }
                    </ToolbarGroup>
                </Toolbar>
            </Paper> 
		)
	}
}