import * as authActions from './authActions'
import * as blogPostsActions from './blogPostsActions'
import * as usersActions from './usersActions'

export default {
  ...authActions,
  ...blogPostsActions,
  ...usersActions
}