import React, { useEffect, useState } from 'react';
import './todayRecipe.css';
import axios from 'axios';
import MiniRecipeBox from './todayRecipe/miniRecipeBox';
import Pagination from './todayRecipe/pagination';

function TodayRecipe() {

  const [isEmptyArray, setEmptyArray] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/prescription/daily/coaching/${localStorage.getItem('userPk')}`);
      setPosts(res.data);
      if (posts.length === 0) {
        setEmptyArray(false);
      } else {
        setEmptyArray(true);
      }
    };
    fetchData();
  }, [posts.length]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (posts: Array<Object>) => {
    let currentPosts: object[] = [];
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    return currentPosts
  }



  return (
    <div className='col todayRecipe'>
      <div className='row todayRecipe_title'>
        <div className='row todayRecipe_title_text'>
          <p>Today</p>
        </div>
        <Pagination
        itemsPerPage={postsPerPage}
        totalPages={posts.length}
        handlePageChange={handlePageChange}
        currentPage={currentPage} />
      </div>
      {!isEmptyArray ? <div className='col mini-recipe-box' style={{color:'black', fontSize: '1.6rem', justifyContent: 'center', alignItems: 'center'}}><p>오늘의 치료 일정이 없어요.</p></div> : <MiniRecipeBox posts={currentPosts(posts)} />}
    </div>
  )
}

export default TodayRecipe