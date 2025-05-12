import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams } from "react-router-dom";
import { useCheckPermission } from "../../hooks/useCheckPermission";
import { Link } from "react-router-dom";

import Button from "../../components/Button";

const EditPostPage = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { updateDocument, response } = useUpdateDocument("posts");
  const { hasPermission, loading: permissionLoading } = useCheckPermission(
    "posts",
    id
  );

  useEffect(() => {
    if (!post) return;

    const populateFormFields = ({ title, image, content, tags }) => {
      setTitle(title);
      setImage(image);
      setContent(content);
      setTags(tags.join(", "));
    };

    populateFormFields(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!title || !image || !content || !tags) {
      setFormError("Por favor, preencha todos os campos!");
      return;
    }

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL válida!");
      return;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    const post = {
      title,
      image,
      content,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    console.log(tagsArray);
    console.log(post);

    updateDocument(id, post);
    navigate("/");
  };

  if (permissionLoading) {
    return <p>Verificando permissões...</p>;
  }

  if (!hasPermission) {
    return (
      <>
        <p className="">Você não tem permissão para editar esta publicação!</p>

        <div style={{ textAlign: "center" }}>
          <Link to="/" className="">
            Voltar
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="mx-auto text-center">
      <div className="py-6 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-center">Edite sua publicação</h2>
        <p className="mt-2 text-gray-600">Editando Publicação: {post.title}</p>
      </div>

      {post && (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <label className="flex border border-black bg-white rounded-sm shadow-lg">
          <span className="p-2 flex justify-center items-center bg-black text-white w-22">Titulo:</span>
            <input
            className="px-2 flex-1 outline-none focus:ring-0"
              type="text"
              name="title"
              placeholder="Dê um título envolvente ao seu post"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          <label className="flex border border-black bg-white rounded-sm shadow-lg">
          <span className="p-2 flex justify-center items-center bg-black text-white w-22">Conteúdo:</span>
            <textarea
              className="px-2 py-2 flex-1 min-h-36 outline-none focus:ring-0"
              name="content"
              placeholder="Dê um conteúdo envolvente ao seu post"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              required
            />
          </label>

          <label className="flex border border-black bg-white rounded-sm shadow-lg">
          <span className="p-2 flex justify-center items-center bg-black text-white w-22">Imagem: </span>
            <input
              className="px-2 flex-1 outline-none focus:ring-0"
              type="text"
              name="image"
              placeholder="Dê uma imagem ao seu post"
              onChange={(e) => setImage(e.target.value)}
              value={image}
              required
            />
          </label>

          <label className="flex border border-black bg-white rounded-sm shadow-lg">
          <span className="p-2 flex justify-center items-center bg-black text-white w-22">Tags: </span>
            <input
              className="px-2 flex-1 outline-none focus:ring-0"
              type="text"
              name="tags"
              placeholder="Digite as tags separadas por vírgula (ex: JavaScript, React, UI)"
              onChange={(e) => setTags(e.target.value)}
              value={tags}
              required
            />
          </label>

          <p className="mt-4 text-center text-gray-600">Pré visualização da imagem:</p>
          <img className="w-full max-w-md rounded-lg mx-auto shadow-lg" src={post.image} alt={post.title}/>

          {!response.loading && <Button className="mt-4 shadow-lg" type='submit'>Editar Post</Button>}
          {response.loading && (
            <Button className="mt-4 shadow-lg" type='submit' disabled>Aguarde...</Button>
          )}
          {(response.error || formError) && (
            <p className="error">{response.error || formError}</p>
          )}
        </form>
      )}
    </div>
  );
};

export default EditPostPage;
