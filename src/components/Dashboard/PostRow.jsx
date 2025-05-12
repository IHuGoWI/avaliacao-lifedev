import { Link } from "react-router-dom";
import Button from "../Button";

const PostRow = ({ post, deleteDocument }) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir esta publicação?"
    );

    if (confirmed) {
      deleteDocument(post.id);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-between h-full rounded-lg w-full text-white bg-white shadow-xl">
      <p className="text-black font-bold text-2xl text-center line-clamp-2 h-[64px]">{post.title}</p>
      <img
        src={post.image}
        alt=""
        className="mt-2 w-full rounded-lg"
      />
      <div className="mt-4 flex gap-2">
        <Button asChild className="flex-1">
          <Link to={`/post/${post.id}`}>Ler</Link>
        </Button>
        <Button asChild className="flex-1">
          <Link to={`/post/edit/${post.id}`}>Editar</Link>
        </Button>
        <Button className="flex-1 bg-red-500" onClick={handleDelete}>
          Excluir
        </Button>
      </div>
    </div>
  );
};

export default PostRow;
