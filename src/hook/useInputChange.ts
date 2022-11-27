import { useState } from "react";
import { ContentEditableEvent } from "react-contenteditable";

const useInputChange = () => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: ContentEditableEvent) => {
    const { value } = e.target;
    setValue(value);
  };

  return { value, onChange };
};

export default useInputChange;
