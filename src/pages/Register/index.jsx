import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

import Button from "../../components/Button";

const RegisterPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-md shadow-lg">
      <h1 className="text-4xl font-bold">Cadastre-se</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <label className="flex border border-black rounded-sm">
          <span className="flex justify-center items-center bg-black text-white w-22">
            Nome:
          </span>
          <input
            className="flex-1 p-2 outline-none focus:ring-0 focus:outline-none"
            type="text"
            name="displayName"
            required
            placeholder="Nome do usuário"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label className="flex border border-black rounded-sm">
          <span className="flex justify-center items-center bg-black text-white w-22">
            E-mail:
          </span>
          <input
            className="flex-1 p-2 outline-none focus:ring-0 focus:outline-none"
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
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
            placeholder="Insira a senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label className="flex border border-black rounded-sm">
          <span className="flex justify-center items-center bg-black text-white w-22">
            Senha:
          </span>
          <input
            className="flex-1 p-2 outline-none focus:ring-0 focus:outline-none"
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </label>
        {!loading && <Button className="" type="submit">Entrar</Button>}
        {loading && (
          <Button className="" disabled>
            Aguarde...
          </Button>
        )}
        {error && (
          <p className="error bg-red-200 border border-red-500 rounded-sm p-1">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
