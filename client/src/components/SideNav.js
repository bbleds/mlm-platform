import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { 
    AppBar,
    Drawer,
    MenuItem,
    Avatar,
    Divider
} from 'material-ui'
import {blue500, red500, greenA200} from 'material-ui/styles/colors'
import Close from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import actions from '../actions'

class SideNav extends Component {

  render() {
    const { user } = this.props

    return (
      <div>
        <Drawer 
          open={this.props.navToggled}
        >
          <AppBar
            title="Menu"
            onLeftIconButtonClick={() => this.props.actions.toggleNav()}
            iconElementLeft={<Close color={'white'} viewBox="0 0 24 24" style={{width:"26px", height: "26px", margin: "10px", cursor: "pointer"}}/>}
          />
          <Link to="/"><MenuItem>Home</MenuItem></Link>
          <Link to="/"><MenuItem>Blog</MenuItem></Link>
          <Link to="/"><MenuItem>Team</MenuItem></Link>
          <Link to="/"><MenuItem>Recipies</MenuItem></Link>
          {
            user && user.permissions === "admin" && user.approved ? 
            (
              <div>
                <Divider/>
                <MenuItem disabled={true}>Admin</MenuItem>
                <Divider/>
                <Link to="/admin"><MenuItem>Dashboard</MenuItem></Link>
                <Link to="/admin/users"><MenuItem>Users</MenuItem></Link>
                <MenuItem>Blog Posts</MenuItem>
              </div>
            ) : 
            ""
          }

        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navToggled : state.navToggled,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)