import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostCard from '../../components/PostCard'
import { useNavigate } from 'react-router-dom'

import Button from '../../components/Button'
import LoadingScreen from '../../components/LoadingScreen'

const Home = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const {documents: posts, loading} = useFetchDocuments('posts')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <>
      <div className='text-center'>

          <h1 className='text-4xl font-bold'>Veja os nossos conteúdos recentes</h1>

          <p className='mt-4'>Fique por dentro do que está acontecendo no mundo da programação</p>

          <form className='mt-8 mb-24 flex justify-between max-w-xl mx-auto bg-white rounded shadow-lg' onSubmit={handleSubmit}>
              <input 
              className='flex-1 ml-4 outline-none  focus:ring-0 focus:outline-none'
              type="text"
              placeholder='Ou busque por tags...'
              onChange={(e) => setQuery(e.target.value)}
              />
              <Button className='ml-2' type='submit'>Pesquisar</Button>
          </form>

          {loading && <LoadingScreen />}

          {posts && posts.length === 0 && (
            <div className=''>
              
              <p>Não foram encontrados posts!</p>
             
            </div>
          )}

          <div className='flex flex-col gap-8'>
            {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>

      </div>
    </>
  )
}

export default Home