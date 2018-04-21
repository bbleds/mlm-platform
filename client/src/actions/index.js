import * as authActions from './authActions'
import * as blogPostsActions from './blogPostsActions'
import * as usersActions from './usersActions'
import * as navActions from './navActions'

export default {
  ...authActions,
  ...blogPostsActions,
  ...usersActions,
  ...navActions
}