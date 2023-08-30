"use client";

import {useState, useEffect} from 'react';

import Image from 'next/image';

import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const matchSearch = (post, value) => {
    const username = post.creator.username;
    const prompt = post.prompt;
    const tag = post.tag;
    const valueList = value.split(',').map(item => item.trim()).filter(item => item !== '');

    if (username === value) return true;
    if (prompt.toLowerCase().includes(value.toLowerCase())) return true;
    for (const valueItem of valueList) {
      if (tag.includes(valueItem)) return true;
    }
    return false;
  }

  const handleSearchChange = (value) => {
    setSearchText(value);
    setPosts(allPosts.filter(post => matchSearch(post, value)));
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for tag, username, or content'
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          required
          className='search_input peer'
        />
        { searchText && (
          <div className='clear_btn ml-3 cursor-pointer opacity-40' 
            onClick={() => {
              setSearchText('');
              setPosts(allPosts);
            }}
            title='Clear Input'
          >
            <Image 
              src='/assets/icons/x.svg'
              width={12}
              height={12}
              alt='x_icon'
            />
          </div>
        )}
      </form>
      {
        searchText === '' ? (
          <PromptCardList
            data={posts}
            handleTagClick={(tag) => {handleSearchChange(tag)}}
          />
        ) : (
          <div className='mt-16'>
            <span className='font-inter text-md text-gray-500'>{
              posts.length === 0
              ? "No results matching, try a different search text"
              : "Loading..."
            }</span>
          </div>
        )
      }
      
    </section>
  )
}

export default Feed