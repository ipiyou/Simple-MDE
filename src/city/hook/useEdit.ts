import { useRef, useState } from "react";
import { ContentEditableEvent } from "react-contenteditable";
import useCursorControl from "./common/useCursorControl";
import useCursorMove from "./common/useCursorMove";
import useSetMark from "./common/useSetMark";

const useEdit = () => {
  const [change, setText] = useState<string>("");
  const [cursor, changeCursor, getCursor] = useCursorMove();
  const setCursor = useCursorControl();
  const Ref = useRef<HTMLElement | null>(null);

  const onEditChange = (e: ContentEditableEvent) => {
    const { value } = e.target;
    setText(value);
    console.log(change, e.target.value);
  };

  const onClickText = () => {
    if (!Ref.current) return;
    const pos = getCursor(Ref.current, { pos: 0, done: false });
    setCursor(Ref.current, pos); // range가 안 먹음
  };

  return { change, onEditChange, Ref, onClickText };
};

export default useEdit;
