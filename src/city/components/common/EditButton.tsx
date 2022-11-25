import styled from "@emotion/styled";

interface PropsType {
  src: string;
  text: string;
  onClick: () => void;
}

function EditButton({ src, text, onClick }: PropsType) {
  return (
    <_EditButton onClick={onClick}>
      <_Image src={src} />
      {text}
    </_EditButton>
  );
}

const _EditButton = styled.div`
  outline: 0;
  border: none;
  padding: 3px 5px;
  :hover {
    background-color: #d4d4d4;
  }
`;

const _Image = styled.img`
  width: 16px;
`;

export default EditButton;
