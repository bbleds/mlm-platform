import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {AppBar, Tabs, Tab, Toolbar} from 'material-ui'
import { FlatButton } from 'material-ui'
import AuthButton from './AuthButton'
import MemberMenuButton from './MemberMenuButton'

export default class Header extends Component{

  render(){
    const {user} = this.props
    const styles = {
      padding : "10px",
      color : `white`,
      textAllign: 'center',
      height : "100%"
    }

    return(
      <AppBar 
        style={{margin:`0px`}}
        showMenuIconButton={false}
        title="Name"
        iconElementRight={    
          <div style={{position:'relative', height: '100%', top: "-4px"}}>
            <Link to="/"><FlatButton style={styles}>Home</FlatButton></Link>
            <FlatButton style={styles}>Blog</FlatButton>
            <FlatButton style={styles}>Team</FlatButton>
            <FlatButton style={styles}>Recipies</FlatButton>
            <MemberMenuButton user={user} style={styles}/>
            <AuthButton user={user} style={styles}/>
          </div>
        }
      />
    )
  }
}