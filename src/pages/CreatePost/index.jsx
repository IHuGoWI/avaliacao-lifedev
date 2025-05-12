import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { Timestamp } from "firebase/firestore";

import Button from "../../components/Button";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument("posts");

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
      console.error("URL inválida:", error.message);
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
      createdAt: Timestamp.now(),
    };

    console.log(tagsArray);
    console.log(post);

    insertDocument(post);
    navigate("/");
  };

  return (
    <div className="mx-auto text-center">
      <div className="py-6 bg-white rounded-md shadow-lg">
        <h2 className="mt-2 text-4xl font-bold">Crie seu Post</h2>
        <p>
          Divida seu conhecimento, inspire outras pessoas e faça parte da
          conversa!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex border border-black bg-white rounded-sm shadow-lg">
          <span className="p-2 flex justify-center items-center bg-black text-white w-22">
            Título:{" "}
          </span>
          <input
            className="px-2 flex-1 outline-none focus:ring-0 focus:outline-none"
            type="text"
            name="title"
            placeholder="Dê um título envolvente ao seu post"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label className="flex border border-black bg-white rounded-sm shadow-lg">
        <span className="p-2 flex justify-center items-center bg-black text-white w-22">Conteúdo: </span>
          <textarea
            className="px-2 py-2 flex-1 min-h-36 outline-none focus:ring-0 focus:outline-none"
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
            className="px-2 flex-1 outline-none focus:ring-0 focus:outline-none"
            type="text"
            name="image"
            placeholder="Dê uma imagem ao seu post (URL)"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            required
          />
        </label>

        <label className="flex border border-black bg-white rounded-sm shadow-lg">
        <span className="p-2 flex justify-center items-center bg-black text-white w-22">Tags: </span>
          <input
            className="px-2 flex-1 outline-none focus:ring-0 focus:outline-none"
            type="text"
            name="tags"
            placeholder="Digite as tags separadas por vírgula (ex: JavaScript, React, UI)"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            required
          />
        </label>

        {!response.loading && <Button className="shadow-lg" type='submit'>Enviar Post</Button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
};

export default CreatePostPage;
