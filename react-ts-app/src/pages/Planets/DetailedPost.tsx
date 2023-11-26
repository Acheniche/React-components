import React, { useCallback, useEffect, useState } from "react";
import { FindPlanetResponse } from "../../App";
import { useFetchSearchPlanetsQuery } from "../../components/API/getPlanets";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";

const DetailedPost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams ? searchParams.get("post") : null;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const [post, setPost] = useState<FindPlanetResponse[]>();
  const [showComponent, setShowComponent] = useState(true);

  const result = useFetchSearchPlanetsQuery(
    typeof name === "string" ? name : skipToken,
    {
      skip: router.isFallback,
    },
  );

  const { isLoading, isFetching, data: Searchposts } = result;

  function delQuery() {
    router.push(`?` + createQueryString("post", ""), null, { shallow: true });
    setShowComponent(false);
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
