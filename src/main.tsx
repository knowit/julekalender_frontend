import { createRoot } from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter } from "react-router-dom"
import { ReactQueryDevtools } from "react-query/devtools"

import "../assets/css/base.scss"
import "../assets/css/syntax_highlight.scss"

import "./axios"
import App from "./App"
import AuthContext from "./AuthContext"
import TokenRefreshHandler from "./components/TokenRefreshHandler"


const Main = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        notifyOnChangeProps: "tracked"
      }
    }
  })

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <ReactQueryDevtools />
          <TokenRefreshHandler />

          <App />
        </AuthContext>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<Main />)
}
