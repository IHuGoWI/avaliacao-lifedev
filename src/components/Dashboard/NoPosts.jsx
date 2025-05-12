
import { Link } from 'react-router-dom'

const NoPosts = () => {
  return (
    
    <div className=''>
        <p>Publicações não encontradas!</p>
        <Link to="/post/new" className=''>
            Criar Publicação
        </Link>
    </div>

  )
}

export default NoPosts