import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {BrowserRouter, Route} from 'react-router-dom'
import Admin from './Admin'
import Header from '../components/Header'
import Landing from '../components/Landing'
import Auth from '../components/Auth'
import actions from '../actions'
import SideNav from '../components/SideNav'
import Modal from '../components/Modal'
import Notification from '../components/Notification'


class App extends Component {

  componentDidMount(){
    this.props.actions.fetchUser()
  }

  render(){
    const { user } = this.props

    return (
      <div className="container" style={{margin:"0px auto", maxWidth:"100%", width:"100%"}}>
        <BrowserRouter>
          <div>
           <Header user={user} />
           <SideNav user={user} />
           <Modal/>
           <Notification/>
           <Route exact path="/" component={Landing} />
           <Route exact path="/login-or-register" component={Auth} />
           <Route path="/admin" component={Admin} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)