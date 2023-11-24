import React, { useCallback, useEffect, useState } from "react";
//import { useLocation, useSearchParams } from "react-router-dom";
import { FindPlanetResponse } from "../../App";
//import "./detailedPost.css";
import { planetsAPI } from "../API/getPlanets";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";

const DetailedPost = () => {
  // function useQuery() {
  //   const { search } = useLocation();
  //   return React.useMemo(() => new URLSearchParams(search), [search]);
  // }

  // const query = useQuery();
  // const name = query.get("post");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get("post");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const [post, setPost] = useState<FindPlanetResponse[]>();
  //const [, setSearchParams] = useSearchParams();
  const [showComponent, setShowComponent] = useState(true);
  const { data: Searchposts, isLoading, isFetching } =
    planetsAPI.useFetchSearchPlanetsQuery(name);

   function delQuery() {
  //   setSearchParams((params) => {
  //     params.delete("post");
      router.push(`?` + createQueryString('post', ''), null ,{ shallow: true});
      setShowComponent(false);
  //     return params;
  //   });
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
              {isLoading || isFetching ? (
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
