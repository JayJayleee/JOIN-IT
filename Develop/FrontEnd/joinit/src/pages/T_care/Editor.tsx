import React from "react";
// import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface CustomCKEditorProps {
  data: string;
  onChange: (newData: string) => void;
}

const Editor = ({ data, onChange }: CustomCKEditorProps) => {
  return (
    <div className="CKEditorBox" style={{ width: "100%", fontSize: '1.6rem' }}>
      <CKEditor
        editor={ClassicEditor}
        config={{
          // 여기에 config 입력
          toolbar: [
            "undo",
            "redo",
            "heading",
            "|",
            "bold",
            "italic",
            "bulletedList",
            "blockQuote",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
          ],
          placeholder: "코멘트를 입력해주세요.",
        }}
        data={data}
        onReady={(editor) => {
        }}
        onChange={(event, editor) => {
          const inputdata = editor.getData();
          onChange(inputdata);
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
      />
    </div>
  );
};

export default Editor;
