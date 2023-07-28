import { configureStore, createSlice } from '@reduxjs/toolkit'
// import reducer from './store/modules/counter';

const initialState = {
  name : 'calendar'
}

const pageChange = createSlice({
  name : "pageChanger",
  initialState,
  reducers: {
    changeCalendarList : (state, action) => ({...state, name: 'calendar'}),
		changeMyCareList : (state, action) => ({...state, name: 'carelist'}),
		changeMyPatientList : (state, action) => ({...state, name: 'patientlist'}),
		changePatientProfileDetail : (state, action) => ({...state, name: 'patientprofile'}),
		changeCareDetail : (state, action) => ({...state, name: 'caredetail'}),
  }
})

export const { changeCalendarList, changeMyCareList, changeMyPatientList, changePatientProfileDetail, changeCareDetail } = pageChange.actions;

export default configureStore({
  reducer: {
    page : pageChange.reducer
  }
}) 