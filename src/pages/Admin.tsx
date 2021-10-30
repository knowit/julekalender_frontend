import { FC } from "react"
import { Redirect, Route, Switch } from "react-router"

import AdminHeader from "../components/Admin/AdminHeader"

import Doors from "./admin/Doors"
import EditDoor from "./admin/EditDoor"
import Page from "./Page"


const Admin: FC = () => (
  <Page className="py-12 px-8 md:px-12 mx-4 md:mx-8 bg-gray-100 text-gray-700 rounded-md space-y-8">
    <AdminHeader />

    <Switch>
      <Route path="/admin/doors" component={Doors} />
      <Route path="/admin/edit" component={EditDoor} />

      <Redirect to="/admin/doors" />
    </Switch>
  </Page>
)

export default Admin
