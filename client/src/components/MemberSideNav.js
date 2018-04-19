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
      <div>
        <Drawer open={this.state.open}>
            {
                user.profile_img_url ?
                <Avatar src={this.props.user.profile_img_url} /> :
                ""
             } 
            <Divider/>
            <Link to="/admin-dashboard"><MenuItem>Dashboard</MenuItem></Link>
            <Link to="/admin-users"><MenuItem>Users</MenuItem></Link>
            <MenuItem>Blog Posts</MenuItem>
        </Drawer>
      </div>
    );
  }
}