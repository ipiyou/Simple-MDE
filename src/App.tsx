import styled from "@emotion/styled";
import { useState, useRef } from "react";
import EditInput from "./components/edit/EditInput";
import EditPreview from "./components/edit/EditPreview";
import useEditEvent from "./hook/useEditEvent";
import useInputChange from "./hook/useInputChange";

function App() {
  const { value, onChange } = useInputChange();
  const {Ref,Click_Focus} = useEditEvent();

  return (
    <_Wrapper>
      <EditInput value={value} onChange={onChange} Ref={Ref} />
      <EditPreview Text={value} Click_Focus={Click_Focus} />
    </_Wrapper>
  );
}

const _Wrapper = styled.div``;

export default App;
