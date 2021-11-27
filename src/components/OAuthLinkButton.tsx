import { useEffect, useRef, VFC } from "react"

import { csrfToken } from "../axios"

import Button, { ButtonProps } from "./Button"


type OAuthLinkButtonProps = Omit<ButtonProps, "type" | "onClick"> & {
  provider: "github" | "google" | "apple"
}

const OAuthLinkButton: VFC<OAuthLinkButtonProps> = ({ provider, ...buttonProps }) => {
  const formRef = useRef<HTMLFormElement | null>(null)

  useEffect(() => {
    const container = document.querySelector("#dummy-oauth-form-container")
    if (!container) return

    // Create dummy form element <form method="post" action="url..." />
    const form = document.createElement("form")
    form.setAttribute("id", `dummy-oauth-form-${provider}`)
    form.setAttribute("method", "post")
    form.setAttribute("action", `${import.meta.env.VITE_BACKEND_HOST}/users/auth/${provider}`)
    form.hidden = true

    // Create hidden authenticity token field <input name="authenticity_token" value={csrfToken} />
    const authenticityTokenField = document.createElement("input")
    authenticityTokenField.setAttribute("name", "authenticity_token")
    authenticityTokenField.setAttribute("value", csrfToken ?? "")
    form.appendChild(authenticityTokenField)

    formRef.current = form
    container.appendChild(form)

    return () => {
      container.removeChild(form)
    }
  }, [])

  // TODO: Add authenticity token on click to get the freshest token available

  return <Button type="button" onClick={() => formRef.current?.submit()} {...buttonProps} />
}

export default OAuthLinkButton
