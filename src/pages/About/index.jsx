const AboutPage = () => {
  return (
    <div className="py-14 px-4 text-center bg-white rounded-md shadow-lg">
      <h1 className="text-4xl font-bold">Sobre o Mini DevBlog</h1>
      <p className="mt-4 text-gray-600">
        O Mini DevBlog é uma plataforma desenvolvida para que desenvolvedores possam compartilhar suas experiências, conhecimentos e histórias. 
        Nosso objetivo é criar uma comunidade onde todos possam aprender e crescer juntos.
      </p>

      <section className="mt-8 text-left">
        <h2 className="px-4 py-1 bg-black w-fit text-white text-2xl font-bold">Funcionalidades</h2>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li>Criação de postagens com título, conteúdo, imagem e tags.</li>
          <li>Busca de postagens por palavras-chave ou tags.</li>
          <li>Dashboard para gerenciar suas publicações.</li>
          <li>Autenticação de usuários com suporte a login via Google.</li>
          <li>Proteção de rotas para garantir acesso seguro às funcionalidades.</li>
        </ul>
      </section>

      <section className="mt-8 text-left">
        <h2 className="px-4 py-1 bg-black w-fit text-white text-2xl font-bold">Tecnologias Utilizadas</h2>
        <ul className="list-disc list-inside mt-4 text-gray-600">
          <li><strong>React:</strong> Biblioteca para construção da interface do usuário.</li>
          <li><strong>Firebase:</strong> Utilizado para autenticação, banco de dados e hospedagem.</li>
          <li><strong>React Router:</strong> Gerenciamento de rotas e navegação.</li>
          <li><strong>Tailwind CSS:</strong> Estilização rápida e responsiva.</li>
          <li><strong>Vite:</strong> Ferramenta para desenvolvimento e build do projeto.</li>
        </ul>
      </section>

      <footer className="mt-20 text-gray-500">
        <p>Projeto desenvolvido como parte da avaliação DW3 - Life Dev.</p>
        <p>&copy; 2025 Icoma Education</p>
      </footer>
    </div>
  );
}

export default AboutPage;