import { DependencyList, useEffect, useRef } from "react"
import { forEach } from "lodash"


// Sets syntax highlighting on all pre-blocks contained within the element given
// by the returned ref. Must be given a HTMLElement-subtype matching that of the
// elment you are attaching the ref to.
const useHighlightJs = <T extends HTMLElement>(dependencies: DependencyList = []) => {
  const hlRef = useRef<T>(null)

  useEffect(() => {
    import("highlight.js").then((hljs) => {
      if (!hlRef.current) return

      forEach(hlRef.current.querySelectorAll<HTMLElement>("pre > code"), (block) => {
        hljs.highlightBlock(block)
      })
    })
  }, dependencies)

  return hlRef
}

export default useHighlightJs
