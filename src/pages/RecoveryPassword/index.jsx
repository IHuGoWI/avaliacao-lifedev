
import { useAuthentication } from '../../hooks/useAuthentication'
import { useState } from 'react'

import Button from '../../components/Button'

const RecoverPasswordPage = () => {

    const [resetEmail, setResetEmail] = useState("")
    const [resetMessage, setResetMessage] = useState("")
    const [error, setError] = useState("")
    const { resetPassword, error: authError } = useAuthentication()

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    const handleResetPassword = async (e) => {

        e.preventDefault()
        setResetMessage("")
        setError("")
        
        if (!resetEmail) {

            setError("Por favor, informe um e-mail para recuperação.")

            return
        }

        if (!isValidEmail(resetEmail)) {

            setError("Formato de e-mail inválido.")
            
            return
        }
        
        try {

          await resetPassword(resetEmail)
          setResetMessage("E-mail de recuperação enviado com sucesso.")
          setResetEmail("")

        } catch (err) {

          console.error("Erro ao enviar e-mail de recuperação:", err)
          setError("Ocorreu um erro ao enviar o e-mail de recuperação.")

        }
    }

  return (
    
    <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-md shadow-lg">
      <form onSubmit={handleResetPassword} className="mt-6 flex flex-col gap-4">
          <h2 className='text-4xl font-bold'>Recuperar Senha</h2>
          <label className="flex border border-black rounded-sm">
              <span className="flex justify-center items-center bg-black text-white w-22">E-mail:</span>
              <input
                  className="flex-1 p-2 outline-none focus:ring-0 focus:outline-none"
                  type='email'
                  name='resetEmail'
                  placeholder='Digite seu e-mail'
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
              />
          </label>
          <Button className='' type='submit'>Enviar link de recuperação</Button>
          {resetMessage && <p className='bg-green-200 border border-green-500 rounded-sm p-1'>{resetMessage}</p>}
          {error && <p className=" bg-red-200 border border-red-500 rounded-sm p-1">{error}</p>}
      </form>
    </div>

  )
}

export default RecoverPasswordPage