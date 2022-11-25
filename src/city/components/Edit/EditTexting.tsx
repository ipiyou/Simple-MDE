import ContentEditable from "react-contenteditable";
import { useEffect, useRef } from "react";
import useEdit from "../../hook/useEdit";
import useSetMark from "../../hook/common/useSetMark";
import useCursorOff from "../../hook/common/useCursorMove";
import useCursorControl from "../../hook/common/useCursorControl";

function EditText() {
  const { change, onEditChange, Ref, onClickText } = useEdit();
  const [Marked, DisableMark] = useSetMark();

  //focusNode는 Br을 인식함
  useEffect(() => {
    Ref.current?.addEventListener("click", onClickText);
    return () => Ref.current?.removeEventListener("click", onClickText);
  }, []);

  return (
    <>
      <ContentEditable
        contentEditable="true"
        html={change} // DisableMark랑 onchagne랑 <br/>은 차이가 거의 없음
        innerRef={Ref} // 1 Ref도 Br인식함 childs는 첫번째는 #text 나머지는 div
        onChange={onEditChange} // 2 #text는 textContent가 있고 div는 textContent가 없음(innerText 있음)
      />
      <button>테스팅</button>
    </>
  );
}

export default EditText;
