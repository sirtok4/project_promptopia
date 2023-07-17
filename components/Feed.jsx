'use client'
import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => {
        return <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      })}
    </div>
  )
}
const Feed = () => {
  const 
  [searchText, setsearchText] = useState('')
  , [posts, setPosts] = useState([])
  , handleSearchChange = (e) => {

  }
  useEffect(() => {
    const fetchPosts = async (e) => {
      const response = await fetch('/api/prompt')
          , data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text' placeholder='Search for a tag or a username' required
          value={searchText} onChange={handleSearchChange}
          className='search_input peer'
        />
      </form>
      <PromptCardList 
        data={posts} 
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed