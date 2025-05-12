import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {
    login,
    loginWithGoogle,
    error: authError,
    loading,
  } = useAuthentication();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  const handleGoogleLogin = async () => {
    const user = await loginWithGoogle();

    if (user) {
      console.log("Usuário logado com Google:", user);
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(authError);
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-md shadow-lg">
      <h1 className="text-4xl font-bold">Entrar</h1>
      <p>Faça login em nossa plataforma de desenvolvedores</p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex border border-black rounded-sm">
          <span className="flex justify-center items-center bg-black text-white w-22">
            Email:
          </span>
          <input
            className="flex-1 p-2 outline-none focus:ring-0 focus:outline-none"
            type="email"
            name="email"
            required
            placeholder="usuario@email.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="flex border border-black rounded-sm">
          <span className="flex justify-center items-center bg-black text-white w-22">
            Senha:
          </span>
          <input
            className="flex-1 p-2 outline-none focus:ring-0 focus:outline-none"
            type="password"
            name="password"
            required
            placeholder="******"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {!loading && <Button className="" type='submit'>Entrar</Button>}
        {loading && (
          <Button className="" disabled>
            Aguarde...
          </Button>
        )}

        <p className="">OU</p>

        <button onClick={handleGoogleLogin} disabled={loading} className="flex items-center justify-center gap-2 border border-black rounded-sm p-2 hover:bg-black hover:text-white transition cursor-pointer">
          <FcGoogle className="size-6"/>
          Entrar com Google
        </button>

        <Link to="/recuperar-senha" className="w-fit mx-auto">
          Esqueceu a senha?
        </Link>

        {error && <p className="error bg-red-200 border border-red-500 rounded-sm p-1">{error}</p>}
      </form>
    </div>
  );
};
export default LoginPage;
