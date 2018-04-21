import React from 'react'
import { 
    Drawer,
    MenuItem,
    Avatar,
    Divider
} from 'material-ui'
import { Link } from 'react-router-dom'

export default class DrawerSimpleExample extends React.Component {

  constructor(props) {
    super(props)
    this.state = {open: true}
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    const { user } = this.props

    return (
      <div style={{marginTop : "65px"}}>
        <Drawer 
          open={this.state.open}
          containerStyle={{
            position: "absolute",
            top : "65px"
          }}
        >
          <div style={{padding: "10px"}}>
            {
                user.profile_img_url ?
                <Avatar 
                  src={this.props.user.profile_img_url} 
                  size={74}
                  style={
                    {
                      position: 'relative',
                      marginLeft : "50%",
                      right : "32px"
                    }
                  }
                /> :
                ""
             } 
             <p style={{textAlign : 'center'}}>Welcome, {user.first_name}!</p>
            </div>
            <Divider/>
            <Link to="/admin"><MenuItem>Dashboard</MenuItem></Link>
            <Link to="/admin/users"><MenuItem>Users</MenuItem></Link>
            <MenuItem>Blog Posts</MenuItem>
        </Drawer>
      </div>
    );
  }
}