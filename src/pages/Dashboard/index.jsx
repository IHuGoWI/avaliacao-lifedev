import NoPosts from '../../components/Dashboard/NoPosts'
import PostRow from '../../components/Dashboard/PostRow'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useAuthValue } from '../../context/AuthContext'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'
import LoadingScreen from '../../components/LoadingScreen'

const DashboardPage = () => {
  const { user } = useAuthValue()
  const uid = user.uid
  const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid)
  const hasPosts = posts?.length > 0
  const { deleteDocument } = useDeleteDocument('posts')

  if (loading) return <LoadingScreen />
  if (error) return <p className="error">{error}</p>

  return (
    <div className=''>
      <div className='py-8 px-4 text-center bg-white rounded-md shadow-lg mb-10'>
        <h2 className='text-4xl font-bold'>Dashboard</h2>
        <p className='text-gray-600'>Gerencie suas publicações aqui!</p>
      </div>

      {!hasPosts ? (
        <NoPosts />
      ) : (
        <>
          <div className='grid gap-4 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]'>
            {posts.map((post) => (
              <PostRow key={post.id} post={post} deleteDocument={deleteDocument} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
export default DashboardPage