import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { 
    FlatButton,
    Popover,
    Menu,
    MenuItem
 } from 'material-ui'
 import AccessAlarmIcon from '@material-ui/icons/ExpandMore'

export default class MemberMenuButton extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          open: false,
        }
      }
    
      handleClick = (event) => {
        event.preventDefault()
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        })
      }
    
      handleRequestClose = () => {
        this.setState({
          open: false,
        })
      }
    
      render() {
        const content = this.props.user ? 
            (<div style={{display: 'inline'}}>
            <FlatButton
                style={this.props.style}
                onClick={this.handleClick}
            >
                Members <AccessAlarmIcon/>
            </FlatButton>
            <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            >
            <Menu>
                <MenuItem><Link to="/dashboard">Dashboard</Link></MenuItem>
                <MenuItem><Link to="/resources">Resources</Link></MenuItem>
            </Menu>
            </Popover>
         </div>) : 
        ''
        return (
            content
        )
      }
}