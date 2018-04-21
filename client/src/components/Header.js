import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import {AppBar, Tabs, Tab, Toolbar} from 'material-ui'
import { FlatButton } from 'material-ui'
import actions from '../actions'
import AuthButton from './AuthButton'
import MemberMenuButton from './MemberMenuButton'

class Header extends Component{

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
        style={{margin:`0px`, width:"100%"}}
        title="Name"
        onLeftIconButtonClick={() => this.props.actions.toggleNav()}
        iconElementRight={    
          <div style={{position:'relative', height: '100%', top: "-4px"}}>
            {/* <MemberMenuButton user={user} style={styles}/> */}
            <AuthButton user={user} style={styles}/>
          </div>
        }
      />
    )
  }
}

const mapStateToProps = state => {
  console.log('state', state)
  return {
    navToggled : state.navToggled,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)