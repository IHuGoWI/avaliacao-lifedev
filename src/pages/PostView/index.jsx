import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link } from "react-router-dom";

import Button from "../../components/Button";

const PostViewPage = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <>
      <article className="bg-white mx-auto px-4 py-8 text-left rounded-xl shadow-xl">
        {post && (
          <>
            <header className="">
              <h1 className="text-3xl font-bold text-center">{post.title}</h1>
              <p className="text-center text-gray-600">Por: {post.createdBy}</p>
              <figure className="">
                <img
                  src={post.image}
                  alt={post.title}
                  className="mt-4 w-full  mx-auto rounded-xl"
                />
              </figure>
            </header>

            <section className="mt-4">
              <p className="text-lg text-gray-600">{post.content}</p>
            </section>

            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <section className="mt-4">
                <h3 className="font-bold">Este post fala sobre:</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-gray-600 bg-gray-200 rounded-full px-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
        <Link to="/" className="">
          <Button className="mt-8 w-full">Voltar</Button>
        </Link>
      </article>
    </>
  );
};

export default PostViewPage;
