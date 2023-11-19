import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
//import { FindPlanet } from "../API/getPlanets";
import { FindPlanetResponse } from "../../App";
import "./detailedPost.css";
//import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { planetsAPI } from "../API/getPlanets";
//import { fetchPlanets } from "../store/redusers/actionCreators";

const DetailedPost = () => {
  //const dispatch = useAppDispatch();
  //const {posts, isLoading, error} = useAppSelector(state => state.postsReducer);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();
  const name = query.get("post");

  const [post, setPost] = useState<FindPlanetResponse[]>();
  const [, setSearchParams] = useSearchParams();
  const [showComponent, setShowComponent] = useState(true);
  const { data: Searchposts, isLoading } =
    planetsAPI.useFetchSearchPlanetsQuery(name);

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
        if (Searchposts) {
          setPost(Searchposts.results);
        }
        setShowComponent(true);
      }
    };
    start();
  }, [name, Searchposts]);
  return (
    <section className="DetailedPost">
      {showComponent && (
        <div className="DetailedPostWrapper">
          {post && post.length != 0 ? (
            <div>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : (
                <div>
                  <button onClick={() => delQuery()}>Close</button>
                  <h1>{post[0].name}</h1>
                  <h1>Terrain: {post[0].terrain}</h1>
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
