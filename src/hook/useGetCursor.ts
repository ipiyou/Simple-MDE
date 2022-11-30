import { useState } from "react";
import { start } from "repl";
import useFocus from "./useFocus";

interface CursorType {
  line: { start: number; end: number };
  pos: { start: number; end: number };
}

const NumZeroTO = (str: string | null): number => (str ? str.length : 0);

const useGetCursor = () => {
  const [cursor, setCursor] = useState<CursorType>({
    line: {
      start: 0,
      end: 0,
    },
    pos: {
      start: 0,
      end: 0,
    },
  });

  const initial_setCursor = (parent: HTMLElement) => {
    const cur = useFocus();
    if (!cur) return;

    let lineNum = 0;
    const line = { start: 0, end: 0 };
    const pos = { start: 0, end: 0 };
    if (parent.hasChildNodes()) {
      let currentNode = null;
      let childNode = null;
      for (let i = 0; i < parent.childNodes.length; i++) {
        // parent의 자식
        currentNode = parent.childNodes[i] as HTMLElement;
        if (currentNode.innerHTML === "<br>") {
          if (currentNode === cur.anchorNode) line.start = i;
          else if (currentNode === cur.focusNode) line.end = i;
          continue;
        }
        if (currentNode.childNodes) {
          for (let c = 0; c < currentNode.childNodes.length; c++) {
            // 마크다운 파싱으로 변환되었을 경우 자식 노드들
            childNode = currentNode.childNodes[c];
            if (currentNode === cur.anchorNode) {
              pos.start = lineNum + cur.anchorOff;
            } else if (currentNode === cur.focusNode)
              pos.end = lineNum + cur.focusOff;
            else lineNum += NumZeroTO(childNode.textContent);
          }
          lineNum = 0;
        } else if (currentNode === cur.anchorNode) pos.start = cur.anchorOff;
        else if(currentNode === cur.focusNode) pos.end = cur.focusOff;
      }
    } else {
      // 여기는 안 들어오지 않을까?
    }
  };

  const local_setCursor = (cur: string, change: string) => {
    const pastBr = cur.replace(/(<div><br><\/div>)/g, "1");
    const futureBr = change.replace(/(<div><br><\/div>)/g, "2");
    const pastReplace = pastBr.replace(/(<([^>]+)>)/g, "");
    const futrueReplace = futureBr.replace(/(<([^>]+)>)/g, "");
    setCursor(futrueReplace.length - pastReplace.length);
  };

  return { cursor, initial_setCursor, local_setCursor };
};

export default useGetCursor;
