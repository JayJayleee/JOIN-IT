import React, { useEffect, useState } from 'react';
import './todayRecipe.css';
import axios from 'axios';
import MiniRecipeBox from './todayRecipe/miniRecipeBox';
import Pagination from './todayRecipe/pagination';

function TodayRecipe() {

  const [isEmptyArray, setEmptyArray] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);

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
        <div>
          <Pagination
          itemsPerPage={postsPerPage}
          totalPages={posts.length}
          handlePageChange={handlePageChange}
          currentPage={currentPage} />
        </div>
      </div>
      {!isEmptyArray ? <p>오늘의 치료 일정이 없어요.</p> : <MiniRecipeBox posts={currentPosts(posts)} />}
    </div>
  )
}

export default TodayRecipe