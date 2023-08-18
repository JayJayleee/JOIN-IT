import React, { useEffect, useState } from 'react';
import './CompleteRecipe.css';
import axios from 'axios';
import MiniRecipeBox from './CompleteRecipe/miniRecipeBox';
import Pagination from './CompleteRecipe/pagination';

function CompleteRecipe(props: any) {

  const [isEmptyArray, setEmptyArray] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);


  useEffect(() => {

    const headers = {
      'context-Type' : 'apllication/json',
      'Authorization' : `Bearer ${localStorage.getItem('access-token')}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }

    const fetchData = async () => {
      const Result = await axios.get(`/api/treatment/patient/complete/${localStorage.getItem('userPk')}`, {headers});
      setPosts(Result.data);

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

  const emptyBox = <div style={{width: '100%', height: '14rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  < p>목록이 없습니다.</p>
  </div>

  return (
    <div className='col complete-ptodayRecipe'>
      <div className='row complete-ptodayRecipe_title'>
        <div className='col complete-nothing'>
          {!isEmptyArray ? emptyBox : <MiniRecipeBox posts={currentPosts(posts)} eventChangeFtn={props.eventChangeFtn} />}
          <Pagination
          itemsPerPage={postsPerPage}
          totalPages={posts.length}
          handlePageChange={handlePageChange}
          currentPage={currentPage} />
        </div>
      </div>
    </div>
  )
}

export default CompleteRecipe