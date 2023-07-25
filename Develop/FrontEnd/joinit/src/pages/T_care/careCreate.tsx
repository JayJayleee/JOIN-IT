import { useState } from "react";
import "./careCreate.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function CareCreate() {
  return (
    <div className="background">
      <div className="container">
        <h3>치료를 시작해볼까요?</h3>

        <div className="patientInfo1">
          <div className="patientName">
            <p>환자 이름</p>
            <input type="text" />
          </div>
          <div className="patientPain">
            <p>환부</p>
            <select name="bodypart" id="">
              <option value="choose">옵션을 선택해주세요.</option>
              <option value="neck">목</option>
              <option value="back">등</option>
            </select>
          </div>
        </div>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}

export default CareCreate;
