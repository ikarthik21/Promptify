'use client';
import { useState, useEffect } from "react";
import Promptcard from "./Promptcard";
import axios from "axios";


const PromptcardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data?.map((post) => {
          return <Promptcard key={post._id} post={post} handleTagClick={handleTagClick} />
        })
      }
    </div>
  )
}



const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search

    return posts.filter((item) =>
      regex.test(item.creator.username) ||
      item.tags.some((tag) => regex.test(tag)) ||
      regex.test(item.prompt)
    );
  };

  const handleSearch = (e) => {

    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
   
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };


  useEffect(() => {
    (
      async () => {
        try {
          const response = await axios.get('/api/prompt');
          ;
          setPosts(response.data.prompts);
        } catch (error) {
          console.log(error)
        }
      }
    )();
  }, [])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearch}
          required
          className='search_input peer' />
      </form>




      {searchText ? (
        <PromptcardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptcardList data={posts} handleTagClick={handleTagClick} />
      )}



    </section>
  )
}

export default Feed;