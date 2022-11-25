import { useRef } from "react";

const useCursorMove = () => {
  const cursor = useRef<number>(0);

  const getFocusOff = (
    parent: HTMLElement,
    node: Node,
    offset: number,
    stat: { pos: number; done: boolean }
  ) => {
    const currentText = parent.textContent && parent.innerText;

    if (stat.done) return stat;
    if (parent.innerHTML === "<br>") {
      stat.pos++;
      return stat;
    } else if (!currentText) return stat; // innerHTML도 포함해서

    let currentNode = null;
    if (parent.hasChildNodes()) {
      for (let i = 0; i < parent.childNodes.length; i++) {
        currentNode = parent.childNodes[i] as HTMLElement; // br 확인시 pos+1에 문자열에 <br/>추가
        if (currentNode == node) {
          stat.pos = stat.pos + offset;
          stat.done = true;
          return stat;
        } else getFocusOff(currentNode, node, offset, stat);
      }
    } else stat.pos += currentText.length;
    return stat;
  };

  const getCursor = (
    parent: HTMLElement,
    stat: { pos: number; done: boolean }
  ) => {
    const sel = window.getSelection();
    const FocusNode = sel?.focusNode;
    const off = sel?.focusOffset;
    if (!sel || !FocusNode || typeof off !== "number") return stat;
    const pos = getFocusOff(parent, FocusNode, off, stat);
    
    pos.done = false;
    return pos;
  };

  const setOffOnChange = (past: string, future: string) => {
    const pastBr = past.replace(/(<div><br><\/div>)/g, "1");
    const futureBr = future.replace(/(<div><br><\/div>)/g, "2");
    const pastReplace = pastBr.replace(/(<([^>]+)>)/g, "");
    const futrueReplace = futureBr.replace(/(<([^>]+)>)/g, "");
    return futrueReplace.length - pastReplace.length;
  };
  // focus했을 시 위치를 구하는 함수와 onChange시 길이를 비교하여 로컬 커서를 조정
  return [cursor, setOffOnChange, getCursor] as const;
};

export default useCursorMove;