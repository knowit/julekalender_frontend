import { VFC } from "react"
import { Switch, Route, Redirect } from "react-router"

import EditUser from "./users/EditUser"
import LostPassword from "./users/LostPassword"
import ResetPassword from "./users/ResetPassword"
import SignIn from "./users/SignIn"
import SignUp from "./users/SignUp"


const Users: VFC = () => (
  <Switch>
    <Route path="/users/edit" component={EditUser} />
    <Route path="/users/sign_in" component={SignIn} />
    <Route path="/users/sign_up" component={SignUp} />
    <Route path="/users/lost_password" component={LostPassword} />
    <Route path="/users/password/edit" component={ResetPassword} />

    <Redirect to="/users/edit" />
  </Switch>
)

export default Users
