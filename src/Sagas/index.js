import { takeLatest, all } from 'redux-saga/effects'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import RehydrationServices from '../Services/RehydrationServices'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

// Types /* ------------- Types ------------- */

    // begin Ignite-Entity-Filecontent
    import { FilecontentTypes } from '../Containers/Filecontent/redux'
    // end Ignite-Entity-Filecontent
    

    // begin Ignite-Entity-File
    import { FileTypes } from '../Containers/File/redux'
    // end Ignite-Entity-File
    

    // begin Ignite-Entity-Participantbadge
    import { ParticipantbadgeTypes } from '../Containers/Participantbadge/redux'
    // end Ignite-Entity-Participantbadge
    

    // begin Ignite-Entity-Classparticipant
    import { ClassparticipantTypes } from '../Containers/Classparticipant/redux'
    // end Ignite-Entity-Classparticipant
    

    // begin Ignite-Entity-Classes
    import { ClassesTypes } from '../Containers/Classes/redux'
    // end Ignite-Entity-Classes
    

// begin Ignite-Entity-User
import { UserTypes } from '../Containers/User/redux'
// end Ignite-Entity-User

// begin Ignite-Entity-Participant
import { ParticipantTypes } from '../Containers/Participant/redux'
// end Ignite-Entity-Participant

// begin Ignite-Entity-Conference
import { ConferenceTypes } from '../Containers/Conference/redux'
// end Ignite-Entity-Conference

// begin Ignite-Entity-Badge
import { BadgeTypes } from '../Containers/Badge/redux'
// end Ignite-Entity-Badge

// begin Ignite-Entity-Login
import { LoginTypes } from '../Containers/Login/redux'
// end Ignite-Entity-Login

import { StartupTypes } from '../Redux/StartupRedux'
// Sagas /* ------------- Sagas ------------- */

    // begin Ignite-Entity-Filecontent
    import { postFilecontent, getFilecontents, getFilecontent, updateFilecontent, removeFilecontent, updateFilecontentBatch} from '../Containers/Filecontent/sagas'
    // end Ignite-Entity-Filecontent
    

    // begin Ignite-Entity-File
    import { postFile, getFiles, getFile, updateFile, removeFile, updateFileBatch} from '../Containers/File/sagas'
    // end Ignite-Entity-File
    

    // begin Ignite-Entity-Participantbadge
    import { postParticipantbadge, getParticipantbadges, getParticipantbadge, updateParticipantbadge, removeParticipantbadge, updateParticipantbadgeBatch} from '../Containers/Participantbadge/sagas'
    // end Ignite-Entity-Participantbadge
    

    // begin Ignite-Entity-Classparticipant
    import { postClassparticipant, getClassparticipants, getClassparticipant, updateClassparticipant, removeClassparticipant, updateClassparticipantBatch} from '../Containers/Classparticipant/sagas'
    // end Ignite-Entity-Classparticipant
    

    // begin Ignite-Entity-Classes
    import { postClasses, getClassess, getClasses, updateClasses, removeClasses, updateClassesBatch, doDeleteParticipant, doEvaluatedParticipant} from '../Containers/Classes/sagas'
    // end Ignite-Entity-Classes
    

// begin Ignite-Entity-User
import { postUser, getUsers, getUser, updateUser, removeUser, updateUserBatch, getUserProfile} from '../Containers/User/sagas'
// end Ignite-Entity-User

// begin Ignite-Entity-Participant
import { postParticipant, getParticipants, getParticipant, updateParticipant, removeParticipant, updateParticipantBatch, participantFetchInspect} from '../Containers/Participant/sagas'
// end Ignite-Entity-Participant

// begin Ignite-Entity-Conference
import { postConference, getConferences, getConference, updateConference, removeConference, updateConferenceBatch} from '../Containers/Conference/sagas'
// end Ignite-Entity-Conference

// begin Ignite-Entity-Badge
import { postBadge, getBadges, getBadge, updateBadge, removeBadge, updateBadgeBatch } from '../Containers/Badge/sagas'
// end Ignite-Entity-Badge

// begin Ignite-Entity-Login
import { postLogin, getLogins, getLogin, updateLogin, removeLogin, getLoginStatus } from '../Containers/Login/sagas'
// end Ignite-Entity-Login

import { startup } from './StartupSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
// const baseUrl = AppConfig.env === 'development' ? '/' : 'https://api1.opetstudio.com/'
const baseUrl = AppConfig.env === 'development' ? 'http://localhost:8080/' : 'https://api1.opetstudio.com/'
// const baseUrl = 'http://localhost:8080/'
const host = baseUrl + ''
// const host = baseUrl + 'api/service/v1/dashboard/api/'
// const host = 'http://localhost:8099/api/service/v1/dashboard/api/'
// const baseUrl = '/'
// const baseUrl = 'http://localhost:8099/'
// const host = 'http://localhost:8090/api/'
const api = DebugConfig.useFixtures ? FixtureAPI : API.create(host)
// const baseApi = DebugConfig.useFixtures ? FixtureAPI : API.create(baseUrl)
/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action

    // begin Ignite-Entity-Filecontent
    takeLatest(FilecontentTypes.FILECONTENT_CREATE, postFilecontent, api),
    takeLatest(FilecontentTypes.FILECONTENT_REQUEST, getFilecontent, api),
    takeLatest(FilecontentTypes.FILECONTENT_REQUEST_ALL, getFilecontents, api),
    takeLatest(FilecontentTypes.FILECONTENT_UPDATE, updateFilecontent, api),
    takeLatest(FilecontentTypes.FILECONTENT_UPDATE_BATCH, updateFilecontentBatch, api),
    takeLatest(FilecontentTypes.FILECONTENT_REMOVE, removeFilecontent, api),
    // end Ignite-Entity-Filecontent
    

    // begin Ignite-Entity-File
    takeLatest(FileTypes.FILE_CREATE, postFile, api),
    takeLatest(FileTypes.FILE_REQUEST, getFile, api),
    takeLatest(FileTypes.FILE_REQUEST_ALL, getFiles, api),
    takeLatest(FileTypes.FILE_UPDATE, updateFile, api),
    takeLatest(FileTypes.FILE_UPDATE_BATCH, updateFileBatch, api),
    takeLatest(FileTypes.FILE_REMOVE, removeFile, api),
    // end Ignite-Entity-File
    

    // begin Ignite-Entity-Participantbadge
    takeLatest(ParticipantbadgeTypes.PARTICIPANTBADGE_CREATE, postParticipantbadge, api),
    takeLatest(ParticipantbadgeTypes.PARTICIPANTBADGE_REQUEST, getParticipantbadge, api),
    takeLatest(ParticipantbadgeTypes.PARTICIPANTBADGE_REQUEST_ALL, getParticipantbadges, api),
    takeLatest(ParticipantbadgeTypes.PARTICIPANTBADGE_UPDATE, updateParticipantbadge, api),
    takeLatest(ParticipantbadgeTypes.PARTICIPANTBADGE_UPDATE_BATCH, updateParticipantbadgeBatch, api),
    takeLatest(ParticipantbadgeTypes.PARTICIPANTBADGE_REMOVE, removeParticipantbadge, api),
    // end Ignite-Entity-Participantbadge
    

    // begin Ignite-Entity-Classparticipant
    takeLatest(ClassparticipantTypes.CLASSPARTICIPANT_CREATE, postClassparticipant, api),
    takeLatest(ClassparticipantTypes.CLASSPARTICIPANT_REQUEST, getClassparticipant, api),
    takeLatest(ClassparticipantTypes.CLASSPARTICIPANT_REQUEST_ALL, getClassparticipants, api),
    takeLatest(ClassparticipantTypes.CLASSPARTICIPANT_UPDATE, updateClassparticipant, api),
    takeLatest(ClassparticipantTypes.CLASSPARTICIPANT_UPDATE_BATCH, updateClassparticipantBatch, api),
    takeLatest(ClassparticipantTypes.CLASSPARTICIPANT_REMOVE, removeClassparticipant, api),
    // end Ignite-Entity-Classparticipant
    

    // begin Ignite-Entity-Classes
    takeLatest(ClassesTypes.CLASSES_CREATE, postClasses, api),
    takeLatest(ClassesTypes.CLASSES_REQUEST, getClasses, api),
    takeLatest(ClassesTypes.CLASSES_REQUEST_ALL, getClassess, api),
    takeLatest(ClassesTypes.CLASSES_UPDATE, updateClasses, api),
    takeLatest(ClassesTypes.CLASSES_UPDATE_BATCH, updateClassesBatch, api),
    takeLatest(ClassesTypes.CLASSES_REMOVE, removeClasses, api),
    takeLatest(ClassesTypes.CLASSES_DELETE_PARTICIPANT, doDeleteParticipant, api),
    takeLatest(ClassesTypes.CLASSES_EVALUATED_PARTICIPANT, doEvaluatedParticipant, api),
    // end Ignite-Entity-Classes
    

    // begin Ignite-Entity-User
    takeLatest(UserTypes.USER_CREATE, postUser, api),
    takeLatest(UserTypes.USER_REQUEST, getUser, api),
    takeLatest(UserTypes.USER_REQUEST_PROFILE, getUserProfile, api),
    takeLatest(UserTypes.USER_REQUEST_ALL, getUsers, api),
    takeLatest(UserTypes.USER_UPDATE, updateUser, api),
    takeLatest(UserTypes.USER_UPDATE_BATCH, updateUserBatch, api),
    takeLatest(UserTypes.USER_REMOVE, removeUser, api),
    // end Ignite-Entity-User

    // begin Ignite-Entity-Participant
    takeLatest(ParticipantTypes.PARTICIPANT_CREATE, postParticipant, api),
    takeLatest(ParticipantTypes.PARTICIPANT_REQUEST, getParticipant, api),
    takeLatest(ParticipantTypes.PARTICIPANT_REQUEST_ALL, getParticipants, api),
    takeLatest(ParticipantTypes.PARTICIPANT_UPDATE, updateParticipant, api),
    takeLatest(ParticipantTypes.PARTICIPANT_UPDATE_BATCH, updateParticipantBatch, api),
    takeLatest(ParticipantTypes.PARTICIPANT_REMOVE, removeParticipant, api),
    takeLatest(ParticipantTypes.PARTICIPANT_FETCH_INSPECT, participantFetchInspect, api),
    // end Ignite-Entity-Participant

    // begin Ignite-Entity-Conference
    takeLatest(ConferenceTypes.CONFERENCE_CREATE, postConference, api),
    takeLatest(ConferenceTypes.CONFERENCE_REQUEST, getConference, api),
    takeLatest(ConferenceTypes.CONFERENCE_REQUEST_ALL, getConferences, api),
    takeLatest(ConferenceTypes.CONFERENCE_UPDATE, updateConference, api),
    takeLatest(ConferenceTypes.CONFERENCE_UPDATE_BATCH, updateConferenceBatch, api),
    takeLatest(ConferenceTypes.CONFERENCE_REMOVE, removeConference, api),
    // end Ignite-Entity-Conference

    // begin Ignite-Entity-Badge
    takeLatest(BadgeTypes.BADGE_CREATE, postBadge, api),
    takeLatest(BadgeTypes.BADGE_REQUEST, getBadge, api),
    takeLatest(BadgeTypes.BADGE_REQUEST_ALL, getBadges, api),
    takeLatest(BadgeTypes.BADGE_UPDATE, updateBadge, api),
    takeLatest(BadgeTypes.BADGE_UPDATE_BATCH, updateBadgeBatch, api),
    takeLatest(BadgeTypes.BADGE_REMOVE, removeBadge, api),
    // end Ignite-Entity-Badge

    // begin Ignite-Entity-Login
    takeLatest(LoginTypes.LOGIN_CHECK_STATUS, getLoginStatus, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, getLogin, api),
    takeLatest(LoginTypes.LOGIN_ALL, getLogins, api),
    takeLatest(LoginTypes.LOGIN_CREATE, postLogin, api),
    takeLatest(LoginTypes.LOGIN_UPDATE, updateLogin, api),
    takeLatest(LoginTypes.LOGIN_REMOVE, removeLogin, api),
    // end Ignite-Entity-Login

    takeLatest(StartupTypes.STARTUP, startup, api)
    // some sagas receive extra parameters in addition to an action
    // takeLatest(UserTypes.USER_REQUEST, getUserAvatar, api)
  ])
}