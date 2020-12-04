import { useEffect, useRef } from "react";
import hljs from 'highlight.js';


// Sets syntax highlighting on all pre-blocks contained within the element given
// by the returned ref. Must be given a HTMLElement-subtype matching that of the
// elment you are attaching the ref to.
const useHighlightJs = <T extends HTMLElement>() => {
  const hlRef = useRef<T>(null);

  useEffect(() => {
    if (!hlRef.current) return;

    hlRef.current.querySelectorAll('pre').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  return hlRef;
};

export default useHighlightJs;
