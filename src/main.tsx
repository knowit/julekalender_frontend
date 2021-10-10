import { createRoot } from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react"

import "../assets/css/base.scss"
import "../assets/css/syntax_highlight.scss"

import "./axios"
import App from "./App"
import AuthContext from "./AuthContext"
import TokenRefreshHandler from "./components/TokenRefreshHandler"


const Index = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked",
        refetchOnMount: false
      }
    }
  })

  return (
    <BrowserRouter>
      <Auth0Provider
        domain="knowit-konkurranser.eu.auth0.com"
        clientId="6TmycgoSWgFT8EU6COixHKne9JmLx5F4"
        redirectUri={window.location.origin} // TODO: Redirect back to luke
        audience="https://knowit-konkurranser.eu.auth0.com/api/v2/"

        cacheLocation="localstorage"
        useRefreshTokens
      >
        <AuthContext>
          <QueryClientProvider client={queryClient}>
            <TokenRefreshHandler />

            <App />
          </QueryClientProvider>
        </AuthContext>
      </Auth0Provider>
    </BrowserRouter>
  )
}

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<Index />)
}
