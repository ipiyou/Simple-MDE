import styled from "@emotion/styled";
import useSetMark from "../../hook/useSetMark";

interface PropsType {
  Text: string;
  Click_Focus: () => void;
}

function EditPreview({ Text, Click_Focus }: PropsType) {
  const [Marked, DisableMark] = useSetMark();

  const html = { __html: DisableMark(Text) };
  return html.__html ? (
    <_Preview onClick={Click_Focus} dangerouslySetInnerHTML={html} />
  ) : (
    <_Preview>
      <_Nothing onClick={Click_Focus}>내용을 입력해 주세요...</_Nothing>
    </_Preview>
  );
}

const _Preview = styled.div`
  position: absolute;
  top: 0;
  z-index: 0;
  font-size: 18px;
  em {
    font-style: italic;
  }
  code {
    border-radius: 5px;
    font-size: 16px;
    padding: 0 5px;
    background-color: #d4d4d4;
  }
  blockquote {
    padding-left: 25px;
    border-left: 5px solid blue;
    background-color: #d4d4d4;
  }
  a {
    color: #d4d4d4;
  }
  hr {
    border-bottom: 1px solid #d4d4d4;
  }
  img {
    width: 100%;
  }
  > p {
    display: inline-block;
  }
`;

const _Nothing = styled.span`
  color: gray;
`;

export default EditPreview;
