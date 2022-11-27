import styled from "@emotion/styled";
import { RefObject } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

interface PropsType {
  value: string;
  onChange: (e: ContentEditableEvent) => void;
  Ref: RefObject<HTMLTextAreaElement>;
}

function EditInput({ value, onChange, Ref }: PropsType) {
  return (
    <_Wrapper>
      <ContentEditable
        className="HelloEditor"
        html={value}
        innerRef={Ref}
        onChange={onChange}
      />
    </_Wrapper>
  );
}

const _Wrapper = styled.div`
  opacity: 100;
  border: none;
  font-size: 18px;
`;

export default EditInput;
