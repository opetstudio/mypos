import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
// import { HashRouter as Router, Route, withRouter } from 'react-router-dom'

// Import Screens for the Router
// prettier-ignore
import {
  RootScreen
} from '../Containers'
import ResponsiveContainer from '../Containers/ResponsiveContainer'
import PageAbout from '../Containers/PageAbout'
import PageProfile from '../Containers/Profile'
import RouteWrapper from '../Containers/RouteWrapper'
// --- import list page entyty ---

// begin Ignite-Entity-Filecontent
import Filecontent from '../Containers/Filecontent'
import FilecontentForm from '../Containers/Filecontent/form'
// end Ignite-Entity-Filecontent

// begin Ignite-Entity-File
import File from '../Containers/File'
import FileForm from '../Containers/File/form'
// end Ignite-Entity-File

// begin Ignite-Entity-Participantbadge
import Participantbadge from '../Containers/Participantbadge'
// import ParticipantbadgeForm from '../Containers/Participantbadge/form'
// end Ignite-Entity-Participantbadge

// begin Ignite-Entity-Classparticipant
import Classparticipant from '../Containers/Classparticipant'
import ClassparticipantForm from '../Containers/Classparticipant/form'
// end Ignite-Entity-Classparticipant

// begin Ignite-Entity-Classes
import Classes from '../Containers/Classes'
import ClassesForm from '../Containers/Classes/form'
// end Ignite-Entity-Classes

// begin Ignite-Entity-User
import User from '../Containers/User'
import UserForm from '../Containers/User/form'
// end Ignite-Entity-User

// begin Ignite-Entity-Participant
import Participant from '../Containers/Participant'
import ParticipantForm from '../Containers/Participant/form'
// end Ignite-Entity-Participant

// begin Ignite-Entity-Conference
import Conference from '../Containers/Conference'
import ConferenceForm from '../Containers/Conference/form'
// end Ignite-Entity-Conference

// begin Ignite-Entity-Badge
import Badge from '../Containers/Badge'
import BadgeForm from '../Containers/Badge/form'
// end Ignite-Entity-Badge

// begin Ignite-Entity-Login
import LoginForm from '../Containers/Login/form'
// end Ignite-Entity-Login

class App extends Component {
  componentWillMount () {
    this.unlisten = this.props.history.listen((location, action) => {
      // console.log('on route change ', location)
      // this.props.onRouteChange(location)
      const loginRestriction = [
        '/about',
        '/entity/user',
        '/entity/participant',
        '/entity/classes',
        '/entity/conference',
        '/entity/badge',
        '/profile'
      ]
      if (loginRestriction.indexOf(location.pathname) !== -1) {
        this.props.checkLogedStatus()
      }
    })
  }
  componentWillUnmount () {
    this.unlisten()
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
const AppContainer = withRouter(App)

class NavigationRouter extends Component {
  componentWillUpdate (prevProps) {
    // console.log('this.props.location=', this.props.location)
    // console.log('prevProps.location=', prevProps.location)
  }
  render () {
    return (
      <Router>
        <AppContainer checkLogedStatus={this.props.checkLogedStatus}>
          <ResponsiveContainer>
            <Route exact path='/' component={RootScreen} />
            <Route exact path='/profile' component={PageProfile} />
            {/* ---- list page entity ---- */}

            {/* begin Ignite-Entity-Filecontent */}
            <Route exact path='/entity/filecontent' component={Filecontent} />
            <Route
              exact
              path='/entity/filecontent-trash'
              component={Filecontent}
            />
            <Route
              exact
              path='/entity/filecontent/create'
              component={FilecontentForm}
            />
            <Route
              exact
              path='/entity/filecontent/update/:id'
              component={FilecontentForm}
            />
            {/* end Ignite-Entity-Filecontent */}

            {/* begin Ignite-Entity-File */}
            <Route exact path='/entity/file' component={File} />
            <Route exact path='/entity/file-trash' component={File} />
            <Route exact path='/entity/file/create' component={FileForm} />
            <Route exact path='/entity/file/update/:id' component={FileForm} />
            {/* end Ignite-Entity-File */}

            {/* begin Ignite-Entity-Participantbadge */}
            <Route
              exact
              path=' /entity/participantbadge/:participant_id'
              component={Participantbadge}
            />
            {/* <Route exact path='/entity/participantbadge-trash' component={Participantbadge} />
    <Route exact path='/entity/participantbadge/create' component={ParticipantbadgeForm} />
    <Route exact path='/entity/participantbadge/update/:id' component={ParticipantbadgeForm} /> */}
            {/* end Ignite-Entity-Participantbadge */}

            {/* begin Ignite-Entity-Classparticipant */}
            <Route
              exact
              path='/entity/classparticipant'
              component={Classparticipant}
            />
            <Route
              exact
              path='/entity/classparticipant-trash'
              component={Classparticipant}
            />
            <Route
              exact
              path='/entity/classparticipant/create'
              component={ClassparticipantForm}
            />
            <Route
              exact
              path='/entity/classparticipant/update/:id'
              component={ClassparticipantForm}
            />
            {/* end Ignite-Entity-Classparticipant */}

            {/* begin Ignite-Entity-Classes */}
            <Route exact path='/entity/classes' component={Classes} />
            <Route exact path='/entity/classes-trash' component={Classes} />
            <Route
              exact
              path='/entity/classes/create'
              component={ClassesForm}
            />
            <Route
              exact
              path='/entity/classes/update/:id'
              component={ClassesForm}
            />
            {/* end Ignite-Entity-Classes */}

            {/* begin Ignite-Entity-User */}
            <Route exact path='/entity/user' component={User} />
            <Route exact path='/entity/user-trash' component={User} />
            <Route exact path='/entity/user/create' component={UserForm} />
            <Route exact path='/entity/user/update/:id' component={UserForm} />
            {/* end Ignite-Entity-User */}

            {/* begin Ignite-Entity-Participant */}
            <Route exact path='/entity/participant' component={Participant} />
            <Route
              exact
              path='/entity/participant-trash'
              component={Participant}
            />
            <Route
              exact
              path='/entity/participant/create'
              component={ParticipantForm}
            />
            <Route
              exact
              path='/entity/participant/update/:id'
              component={ParticipantForm}
            />
            {/* end Ignite-Entity-Participant */}

            {/* begin Ignite-Entity-Conference */}
            <Route exact path='/entity/conference' component={Conference} />
            <Route
              exact
              path='/entity/conference-trash'
              component={Conference}
            />
            <Route
              exact
              path='/entity/conference/create'
              component={ConferenceForm}
            />
            <Route
              exact
              path='/entity/conference/update/:id'
              component={ConferenceForm}
            />
            {/* end Ignite-Entity-Conference */}

            {/* begin Ignite-Entity-Badge */}
            <Route exact path='/entity/badge' component={Badge} />
            <Route exact path='/entity/badge-trash' component={Badge} />
            <Route exact path='/entity/badge/create' component={BadgeForm} />
            <Route
              exact
              path='/entity/badge/update/:id'
              component={BadgeForm}
            />
            {/* end Ignite-Entity-Badge */}

            {/* begin Ignite-Entity-Login */}
            <Route exact path='/login' component={LoginForm} />
            {/* end Ignite-Entity-Login */}

            <Route exact path='/about' component={PageAbout} />
            <Route exact path='/entity/entity1' component={PageAbout} />
          </ResponsiveContainer>
        </AppContainer>
      </Router>
    )
  }
}
export default NavigationRouter
