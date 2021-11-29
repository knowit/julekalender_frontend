import { FC } from "react"
import { Redirect, Route, Switch } from "react-router"

import AdminHeader from "../components/Admin/AdminHeader"

import Doors from "./admin/Doors"
import EditDoor from "./admin/EditDoor"
import EditServiceMessage from "./admin/EditServiceMessage"
import NewDoor from "./admin/NewDoor"
import NewServiceMessage from "./admin/NewServiceMessage"
import ServiceMessages from "./admin/ServiceMessages"
import Page from "./Page"


// TODO: Deleted posts? User list? Ban users?
const Admin: FC = () => (
  <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md space-y-8">
    <AdminHeader />

    <Switch>
      <Route exact path="/admin/doors" component={Doors} />
      <Route path="/admin/doors/new" component={NewDoor} />
      <Route path="/admin/doors/:door/edit" component={EditDoor} />

      <Route exact path="/admin/service_messages" component={ServiceMessages} />
      <Route path="/admin/service_messages/new" component={NewServiceMessage} />
      <Route path="/admin/service_messages/:uuid/edit" component={EditServiceMessage} />

      <Redirect to="/admin/doors" />
    </Switch>
  </Page>
)

export default Admin
