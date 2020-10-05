import Link from "next/link";
import Mobiledoc from "./Mobiledoc";

export default function Post({ post }) {
  if (post === "undefined") return null;
  return (
    <>
    <article>
    <h1>{post.title}</h1>
    <Mobiledoc mobiledoc={JSON.parse(post.mobiledoc)} />
    </article>
      <style jsx>{`
        article {
          width: 100%;
          max-width: 1200px;
        }
        h1 {
          font-size: 3rem;
        }
        h3 {
          font-size: 2rem;
        }
        .hero {
          width: 100%;
        }
        .back {
          width: 100%;
          max-width: 1200px;
          color: #00a395;
        }
      `}</style>
    </>
  );
}
