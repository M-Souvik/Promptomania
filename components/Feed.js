'use client'
import {useEffect, useState} from 'react'
import PromptCard from '@/components/PromptCard.js'

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText,setsearchText] =useState('');
  const [posts,setPosts] = useState([]);

  const handleSearchChange=(e)=>{

  }
useEffect(()=>{
  const fetchPosts = async()=>{
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setPosts(data);

  }

  fetchPosts();
},[])
  return (
    <div>
      <section className="feed">
        <form className="relative w-full flex-center">
          <input type="text" required name="Search" value={searchText} onChange={handleSearchChange} placeholder='Search for username or a tag' className='search_input peer' />

        </form>
        <PromptCardList
        data={posts}
        handleTagClick={()=>{}}/>
      </section>
    </div>
  )
}

export default Feed
