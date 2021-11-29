import { FC } from "react"

import Page from "../Page"


type UserPageProps = {
  title: string
  onSubmit?: (data: any) => void
}

const UserPage: FC<UserPageProps> = ({ title, onSubmit, children }) => {
  const Container = onSubmit ? "form" : "div"

  return (
    <Page className="max-w-[36rem] mx-auto py-12 px-8 md:px-12 bg-gray-100 text-gray-700 rounded-md space-y-8 grid place-content-center children:w-[clamp(16rem,50vw,24rem)]">
      <h1 className="text-center text-4xl font-semibold">{title}</h1>

      <Container className="space-y-8" onSubmit={onSubmit}>
        {children}
      </Container>
    </Page>
  )
}

export default UserPage
