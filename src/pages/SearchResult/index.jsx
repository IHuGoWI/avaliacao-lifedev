
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { Link } from 'react-router-dom'
import PostCard from '../../components/PostCard'

import Button from '../../components/Button'
import LoadingScreen from '../../components/LoadingScreen'

const SearchResultPage = () => {


  const query = useQuery()
  const rawSearch = query.get('q') || ''
  const isTagSearch = rawSearch.includes(' ')
  const searchTags = isTagSearch ? rawSearch.split(',').map(tag => tag.trim()) : null
  const searchText = isTagSearch ? '' : rawSearch

  const { documents: posts, loading, error } = useFetchDocuments('posts', searchTags, null, searchText)

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <div>Ocorreu um erro: {error.message}</div>
  }

  return (
    <div className=''>
      
      <header className='text-center text-lg font-semibold mb-4 bg-white rounded-md shadow-lg py-4 px-6'>
        <h1 className=''>
          Resultados para: <span className=''>{searchText || searchTags}</span>
        </h1>
      </header>

      <main className=''>

        {posts && posts.length === 0 ? (
          <div className='text-center'>

            <p className=''>
              Não foram encontrados resultados para: <span className=''>{searchText || searchTags}</span>
            </p>


            <Button className='mt-4'>
            <Link to="/">
              Voltar
            </Link>
            </Button>
          </div>
        ) : (

          <div className=''>
            {posts && posts.map((post) => (
              <div key={post.id} className=''>
                
                <PostCard key={post.id} post={post} />

              </div>
            ))}
          </div>

        )}

      </main>


    </div>  
  )
}

export default SearchResultPage