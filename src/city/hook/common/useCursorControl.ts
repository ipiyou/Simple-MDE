import { useRef } from "react";

const useCursorControl = () => {
  const setCursorRange = (
    RefNode: HTMLElement | null,
    range: Range,
    stat: { pos: number; done: boolean }
  ) => {
    if (!RefNode) return;

    const currentText = RefNode.textContent && RefNode.innerText;
    if (stat.done) return range;
    if (RefNode.innerHTML == "<br>") {
      if (!--stat.pos) {
        range.setStart(RefNode, 0);
        stat.done = true;
      }
    }
    if (!currentText) return range;

    let currentNode = null;
    if (RefNode.childNodes.length == 0) {
      if (currentText.length >= stat.pos) {
        range.setStart(RefNode, stat.pos);
        stat.done = true;
      } else {
        stat.pos = stat.pos - currentText.length;
      }
    } else {
      for (var i = 0; i < RefNode.childNodes.length && !stat.done; i++) {
        currentNode = RefNode.childNodes[i] as HTMLElement;
        setCursorRange(currentNode, range, stat);
      }
    }

    return range;
  };

  const setCursor = (
    RefNode: HTMLElement | null,
    stat: { pos: number; done: boolean }
  ) => {
    const sel = window.getSelection();
    console.log(stat);
    const Range = setCursorRange(RefNode, document.createRange(), stat);
    if (!sel || !Range) return;

    console.log(Range);
    sel.removeAllRanges();
    sel.addRange(Range);
  };

  return setCursor;
};

export default useCursorControl;
