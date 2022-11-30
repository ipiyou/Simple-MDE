const useFocus = () => {
  let sel = window.getSelection();
  let focusNode = sel?.focusNode;
  let anchorNode = sel?.anchorNode;
  let focusOff = sel?.focusOffset;
  let anchorOff = sel?.anchorOffset;

  if (sel && focusNode && anchorNode && focusOff && anchorOff)
    return { sel, focusNode, anchorNode, focusOff, anchorOff };
};

export default useFocus;
