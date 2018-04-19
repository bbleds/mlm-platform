import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { FlatButton } from 'material-ui'

export default class AuthButton extends Component{

    render(){
        const {user} = this.props

        let content
        switch (user) {
            case false:
                content = (<Link to="/login-or-register"><FlatButton style={this.props.style}>Login or Register</FlatButton></Link>)
                break
            case null:
                content = (
                <FlatButton style={this.props.style}>Loading...</FlatButton>
                )
                break
            default:
                content = (<a href="/api/v1/auth/logout"><FlatButton style={this.props.style}>Logout</FlatButton></a>)
                break
        }
        
        return(
            content
        )
    }
}