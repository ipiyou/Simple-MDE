import { useRef } from "react";

const useCursorControl = () => {
  const setCursorRange = (
    RefNode: HTMLElement | null,
    range: Range,
    offZero: boolean,
    stat: { pos: number; done: boolean }
  ) => {
    if (!RefNode) return;

    if (stat.done) return range;
    if (!RefNode.textContent) return range;

    let currentNode = null;
    if (RefNode.childNodes.length == 0) {
      if (RefNode.textContent.length >= stat.pos) {
        range.setStart(RefNode, stat.pos);
        stat.done = true;
      } else {
        stat.pos = stat.pos - RefNode.textContent.length;
      }
    } else {
      for (var i = 0; i < RefNode.childNodes.length && !stat.done; i++) {
        currentNode = RefNode.childNodes[i] as HTMLElement;
        if (currentNode.innerHTML == "<br>") {
          if (!--stat.pos) {
            range.setStart(currentNode, 0);
            stat.done = true;
          }
          continue;
        }
        setCursorRange(currentNode, range, offZero, stat);

        if (!offZero && stat.done) range.setStart(RefNode.childNodes[i + 1], 0);
      }
    }

    return range;
  };

  const setCursor = (
    RefNode: HTMLElement | null,
    stat: { pos: number; done: boolean }
  ) => {
    const sel = window.getSelection();
    const off = sel?.focusOffset;

    const Range = setCursorRange(
      RefNode,
      document.createRange(),
      off ? true : false,
      stat
    );
    if (!sel || !Range) return;

    console.log(Range);
    sel.removeAllRanges();
    sel.addRange(Range);
  };

  return setCursor;
};

export default useCursorControl;
