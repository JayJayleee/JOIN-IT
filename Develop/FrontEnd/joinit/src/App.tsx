import React from "react";
import "./App.css";
import Nav from "./Components/Nav/Nav";
import { Route, Routes, Link } from "react-router-dom";
import CareCreate from "./pages/T_care/careCreate";
import Home from "./pages/Home";
import CoachCreate from "./pages/T_recipe/coachCreate";
import CoachDetail from "./pages/T_recipe/coachDetail";
import CoachUpdate from "./pages/T_recipe/coachUpdate";
import ExerciseDetail from "./pages/T_recipe/exerciseDetail";
import ExerciseList from "./pages/T_recipe/exerciseList";
import ExerciseSelect from "./pages/T_recipe/exerciseSelect";
import ExerciseUpdate from "./pages/T_recipe/exerciseUpdate";
import MeetCreate from "./pages/T_recipe/meetCreate";
import MeetDetail from "./pages/T_recipe/meetDetail";
import MeetUpdate from "./pages/T_recipe/meetUpdate";
import RecipeSelect from "./pages/T_recipe/recipeSelect";
import CareUpdate from "./pages/T_care/careUpdate";
import AD_Board from "./pages/AD_board/AD_nav";

function App() {
  // 특정 페이지에서 헤더 보이지 않도록 처리(ex 관리자)
  const Header: any = () => {
    if (window.location.pathname === "/AD_Board") return null;
    return <Nav />;
  };
  return (
    <div>
      {/* <div className="navdiv"> */}
      {Header}
      {/* </div> */}
      {/* <Home /> */}
      {/* <CareCreate /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CareCreate" element={<CareCreate />} />
        <Route path="/CareUpdate" element={<CareUpdate />} />
        <Route path="/CoachCreate" element={<CoachCreate />} />
        <Route path="/CoachUpdate" element={<CoachUpdate />} />
        <Route path="/CoachDetail" element={<CoachDetail />} />
        <Route path="/ExerciseDetail" element={<ExerciseDetail />} />
        <Route path="/ExerciseList" element={<ExerciseList />} />
        <Route path="/ExerciseSelect" element={<ExerciseSelect />} />
        <Route path="/ExerciseUpdate" element={<ExerciseUpdate />} />
        <Route path="/RecipeSelect" element={<RecipeSelect />} />
        <Route path="/MeetCreate" element={<MeetCreate />} />
        <Route path="/MeetDetail" element={<MeetDetail />} />
        <Route path="/MeetUpdate" element={<MeetUpdate />} />
        <Route path="/AD_Board" element={<AD_Board />} />
      </Routes>
    </div>
  );
}

export default App;
