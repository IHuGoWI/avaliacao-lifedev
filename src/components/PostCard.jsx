import { Link } from "react-router-dom";
import Button from "./Button";

const PostCard = ({ post }) => {
  return (
    <article className="bg-white w-full max-w-2xl mx-auto p-4 text-left rounded-xl shadow-xl">
      <img src={post.image} alt={post.title} className="w-full max-w-2xl mx-auto rounded-xl" />

      <header className="mt-4">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <p className="mt-2 text-gray-600">Por: {post.createdBy}</p>
      </header>

      <footer>
        <div className="mt-4 flex gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <span key={tag} className="text-gray-600 bg-gray-200 rounded-full px-2">
              #{tag}
            </span>
          ))}
        </div>

        <Link to={`/post/${post.id}`}>
          <Button className="mt-8 w-full">Ver</Button>
        </Link>
      </footer>
    </article>
  );
};

export default PostCard;
