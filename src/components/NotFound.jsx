
import { Link } from 'react-router-dom'
import Button from './Button'

const NotFound = () => {
  return (
    <div className='mt-14 text-center'>
      <h1 className='text-3xl font-bold'>404</h1>
      <p>Página não encontrada</p>
      <Button className='mt-4'>
        <Link to="/">
          Voltar para a página inicial
        </Link>
      </Button>
      
    </div>
  )
}

export default NotFound