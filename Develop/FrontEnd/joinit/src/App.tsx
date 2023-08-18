import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CareCreate from "./pages/T_care/careCreate";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import CoachCreate from "./pages/T_recipe/coachCreate";
import CoachUpdate from "./pages/T_recipe/coachUpdate";
import ExerciseList from "./pages/T_recipe/exerciseList";
import ExerciseSelect from "./pages/T_recipe/exerciseSelect";
import ExerciseUpdate from "./pages/T_recipe/exerciseUpdate";
import MeetCreate from "./pages/T_recipe/meetCreate";
import MeetUpdate from "./pages/T_recipe/meetUpdate";
import RecipeSelect from "./pages/T_recipe/recipeSelect";
import CareUpdate from "./pages/T_care/careUpdate";
import CareCreateSuccess from "./pages/T_care/careCreateSuccess";

import AdBoard from "./pages/AdBoard";
import ExerciseCreate from "./pages/AD_board/AD_exercise/exerciseCreate";
import AdExerciseDetail from "./pages/AD_board/AD_exercise/exerciseDetail";
import AdExerciseUpdate from "./pages/AD_board/AD_exercise/exerciseUpdate";
import AdPatientList from "./pages/AD_board/AD_Patient/patientList";

import TBoard from "./pages/TBoard";
import Login from "./pages/Login";
import FindId from "./pages/FindId";
import ChangePw from "./pages/ChangePw";
import SignUpSelect from "./pages/SignUpSelect";
import TSignUp from "./pages/TSignUp";
import PSignUp from "./pages/PSignUp";
import AdLogin from "./pages/AdLogin";
import PBoard from "./pages/PBoard";
import UserWithdrawal from "./pages/UserWithdrawal";
import TherapistProfile from "./pages/TherapistProfile";
import CoachDetailPage from "./pages/CoachDetailPage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import PatientProfile from "./pages/PatientProfile";

import PrivateRoute from "./routes/PrivateRoute";
import TherapistRoute from "./routes/TherapistRoute";
import PatientRoute from "./routes/PatientRoute";
import AnyRoute from "./routes/AnyRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";

import DoCoachingToPatient from "./pages/P_active/DoCoachingToPatient";
import DoCoachingToTherapist from "./pages/T_active/DoCoachingToTherapist";
import DoExercise from "./pages/P_active/DoExercise";
import BeforeCheck from "./Components/Check/beforeCheck";

function App() {
  return (
    <React.Fragment>
      <Routes>
        {/* 로그인과 비로그인 상태 모두에서 접근 가능한 페이지 목록 */}
        <Route element={<AnyRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/ChangePw" element={<ChangePw />} />
          <Route path="/AdLogin" element={<AdLogin />} />
          <Route
            path="/patient/coaching/:prescriptionId"
            element={<DoCoachingToPatient />}
          />
          <Route
            path="/therapist/coaching/:prescriptionId"
            element={<DoCoachingToTherapist />}
          />
          <Route
            path="/patient/exercise/:prescriptionId"
            element={<DoExercise />}
          />
          <Route
            path="/patient/survey/:type/:prescriptionId"
            element={<BeforeCheck />}
          />
        </Route>
        {/* 로그인 상태에서만 접근 가능한 페이지 목록 */}
        <Route element={<PrivateRoute />}>
          <Route path="/UserWithdrawal" element={<UserWithdrawal />} />
          <Route
            path="/CoachDetailPage/:prescriptionId"
            element={<CoachDetailPage />}
          />
          <Route
            path="/ExerciseDetailPage/:prescriptionId"
            element={<ExerciseDetailPage />}
          />
        </Route>
        {/* 로그인 상태(환자)에서만 접근 가능한 페이지 목록 */}
        <Route element={<PatientRoute />}>
          <Route path="/Pboard" element={<PBoard />} />
          <Route path="/PProfile" element={<PatientProfile />} />
        </Route>
        {/* 로그인 상태(치료사)에서만 접근 가능한 페이지 목록 */}
        <Route element={<TherapistRoute />}>
          <Route path="/Tboard" element={<TBoard />} />

          {/* <Route path="/CareCreateSuccess" element={<CareCreateSuccess />} /> */}
          <Route path="/CareCreate" element={<CareCreate />} />
          <Route path="/CareUpdate/:careId" element={<CareUpdate />} />
          <Route path="/CoachCreate/:treatmentId" element={<CoachCreate />} />
          <Route path="/CoachUpdate/:careId" element={<CoachUpdate />} />
          <Route
            path="/ExerciseSelect/:treatmentId"
            element={<ExerciseSelect />}
          />
          <Route
            path="/ExerciseUpdate/:PrescriptionId"
            element={<ExerciseUpdate />}
          />
          <Route path="/RecipeSelect" element={<RecipeSelect />} />
          <Route path="/MeetCreate/:treatmentId" element={<MeetCreate />} />
          <Route path="/MeetUpdate/:PrescriptionId" element={<MeetUpdate />} />
          <Route path="/TProfile" element={<TherapistProfile />} />
          <Route path="/ExerciseList" element={<ExerciseList />} />
        </Route>
        {/* 비로그인 상태에서만 접근 가능한 페이지 목록 */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/SignUp" element={<SignUpSelect />} />
          <Route path="/SignUp/therapist" element={<TSignUp />} />
          <Route path="/SignUp/patient" element={<PSignUp />} />
        </Route>
        {/* 관리자 계정 로그인으로 접근 가능한 페이지 목록 */}
        <Route element={<AdminRoute />}>
          <Route path="/AdExerciseCreate" element={<ExerciseCreate />} />
          <Route path="/Adboard" element={<AdBoard />} />

          <Route path="/adpatientlist" element={<AdPatientList />} />
          <Route
            path="/AdExerciseDetail/:trainingId"
            element={<AdExerciseDetail />}
          />
          <Route
            path="/AdExerciseUpdate/:trainingId"
            element={<AdExerciseUpdate />}
          />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
