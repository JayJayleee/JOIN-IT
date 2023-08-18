import { createSlice } from "@reduxjs/toolkit";

const ImageSave = createSlice({
  name: "ImageSave",
  initialState: {
    captureImg: false,
    captureImgList: [],
  },
  reducers: {
    capture(state) {
      state.captureImg = true;
      console.log("리얼트루임", state.captureImg);
    },
    //캡처 -> 끝난 뒤 이미지 저장?
    // true로 값 변경 -> 이미지 저장 -> 다시 false ->
    // DB에 저장 -> 빈 리스트로 변경함.
  },
});
export default ImageSave;
export const { capture } = ImageSave.actions;
