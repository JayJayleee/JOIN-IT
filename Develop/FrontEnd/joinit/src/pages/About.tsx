import { Link } from 'react-router-dom';

export default function About() {
    return (
      <div>
        <h1>소개</h1>
        <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
        <Link to="/">Home 페이지로 이동하기</Link>
      </div>
    );
  }