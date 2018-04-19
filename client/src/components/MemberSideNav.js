import React from 'react'
import { 
    Drawer,
    MenuItem,
    Avatar,
    Divider
} from 'material-ui'

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
            <MenuItem>Users</MenuItem>
            <MenuItem>Blog Posts</MenuItem>
        </Drawer>
      </div>
    );
  }
}