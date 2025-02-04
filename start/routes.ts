const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
const EnrollementsController = () => import('#controllers/enrollements_controller')
const EventsController = () => import('#controllers/events_controller')
const HistoriesController = () => import('#controllers/histories_controller')

import router from '@adonisjs/core/services/router'

router.post('session', [SessionController, 'store'])
router.resource('user', UsersController).apiOnly()
router.resource('enrollement', EnrollementsController).apiOnly()
router.resource('event', EventsController).apiOnly()
router.resource('history', HistoriesController).apiOnly()
router.get('enrollement/user/:userId', [EnrollementsController, 'userEnrollements'])