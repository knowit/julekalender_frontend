import axios from "axios"
import { merge } from "lodash"


axios.interceptors.request.use((config) => (
  merge(config, {
    url: `${config.url}.json`, // Default to .json format for all endpoints
    baseURL: import.meta.env.VITE_BACKEND_HOST
  })
))
