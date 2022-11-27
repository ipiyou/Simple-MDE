import { useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

const useEditEvent = () => {
  const Ref = useRef<HTMLTextAreaElement>(null);
  const [cursor, setCursor] = useState<number>(0);

  const Click_Focus = () => {
    Ref.current?.focus();
    const sel = window.getSelection();
    if (!sel) return;
    
    console.log(sel.focusOffset);
    setCursor(sel.focusOffset);
  };

  return { Ref, Click_Focus };
};

export default useEditEvent;
