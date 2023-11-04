import React, {
  ReactComponentElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { getByName } from "../API/getPlanets";
import { FindPlanetResponse } from "../../App";
import './detailedPost.css'

const DetailedPost = () => {
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery();
  const name = query.get("post");

  const [post, setPost] = useState<FindPlanetResponse[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showComponent, setShowComponent] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  function delQuery() {
    setSearchParams((params) => {
      params.delete("post");
      setShowComponent(false);
      return params;
    });
  }

  useEffect(() => {
    const start = async () => {
      if (name) {
        setIsPostsLoading(true);
        const res = await getByName([name]);
        setPost(res);
        setIsPostsLoading(false);
        setShowComponent(true);
      }
    };
    start();
  }, [name]);

  return (
    <section className="DetailedPost">
      {showComponent && (
        <div className="DetailedPostWrapper">
          {post ? (
            <div>
              {isPostsLoading ? (
                <h1>Loading...</h1>
              ) : (
                <div>
                  <button onClick={() => delQuery()}>x</button>
                  <h1>{post[0].value.name}</h1>
                  <h1>Terrain: {post[0].value.terrain}</h1>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
};
export default DetailedPost;
