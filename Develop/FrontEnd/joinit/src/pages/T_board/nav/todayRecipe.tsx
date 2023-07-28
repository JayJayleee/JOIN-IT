import React, { useEffect, useState } from 'react';
import './todayRecipe.css';
import axios from 'axios';
import MiniRecipeBox from './todayRecipe/miniRecipeBox';

function TodayRecipe() {

  const [isEmptyArray, setEmptyArray] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);


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

  console.log(posts)


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (posts: Array<Object>) => {
    let currentPosts: object[] = [];
    currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    return currentPosts
  }

  console.log(currentPosts(posts))

  return (
    <div className='col todayRecipe'>
      <div className='row todayRecipe_title'>
        <div className='todayRecipe_title_text'>
          <p>Today</p>
        </div>
        <div className='todayRecipe_title_button'>
          <p>button</p>
        </div>
      </div>
      {!isEmptyArray ? <p>오늘의 치료 일정이 없어요.</p> : <MiniRecipeBox posts={currentPosts(posts)} />}
    </div>
  )
}

export default TodayRecipe