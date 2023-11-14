import React, { useEffect, useState } from "react";
import "./search.css";
import { FindPlanet, getPage } from "../API/getPlanets";
import { FindPlanetResponse } from "../../App";
import Post from "../Posts/PostItem";
import { useLocation, useSearchParams } from "react-router-dom";
import { usePostsContext, useSearchContext } from "../constext/context";

export default function SearchBlock() {
  const { posts, setPosts } = usePostsContext();
  const { search, setSearch } = useSearchContext();

  const [isPostsLoading, setIsPostsLoading] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isButtonNextDisabled, setIsButtonNextDisabled] =
    useState<boolean>(false);
  const [isButtonPrevDisabled, setIsButtonPrevDisabled] =
    useState<boolean>(true);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();
  const searchQuery = query.get("search");

  async function getPosts(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPostsLoading(true);
    setSearchParams({
      search: `${search}`,
    });
    const res = await FindPlanet([search as string]);
    localStorage.setItem("request", search as string);
    setPosts(res);
    setIsPostsLoading(false);
  }

  async function handlePageChange(newPage: number) {
    setIsPostsLoading(true);
    if (newPage === 6) {
      setIsButtonNextDisabled(true);
    } else if (newPage === 1) {
      setIsButtonPrevDisabled(true);
    } else {
      setIsButtonNextDisabled(false);
      setIsButtonPrevDisabled(false);
    }
    setCurrentPage(newPage);
    const res = await getPage(newPage);
    setPosts(res);
    setSearchParams({
      page: `${newPage}`,
    });
    setIsPostsLoading(false);
  }

  useEffect(() => {
    const start = async () => {
      if (
        localStorage.getItem("request") === null ||
        localStorage.getItem("request") === ""
      ) {
        setIsPostsLoading(true);
        const res = await getPage(1);
        setPosts(res);
        setIsPostsLoading(false);
      } else {
        const local = localStorage.getItem("request");
        if (local) {
          setIsPostsLoading(true);
          const res = await FindPlanet([local]);
          setPosts(res);
          setIsPostsLoading(false);
        }
      }
    };
    start();
  }, []);

  return (
    <div className="SearchBlock">
      <section className="Search">
        <form onSubmit={getPosts}>
          <input
            className="searchInput"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input className="searchButton" type="submit" value="send" />
        </form>
      </section>
      {isPostsLoading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="Results">
          {posts ? (
            posts.length != 0 ? (
              posts.map((name: FindPlanetResponse) => (
                <Post
                  name={name.value?.name ? name.value?.name : name.name}
                  description={
                    name.value?.terrain ? name.value?.terrain : name.terrain
                  }
                  key={name.value?.name ? name.value?.name : name.name}
                />
              ))
            ) : (
              <h1>No Data About Your Search</h1>
            )
          ) : (
            <h1>No data</h1>
          )}
          {(() => {
            if (!searchQuery || searchQuery == null || searchQuery == "null") {
              console.log(searchQuery);
              return (
                <div className="Pagination">
                  <button
                    className="prevButton"
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                    }}
                    disabled={isButtonPrevDisabled}
                  >
                    Prev
                  </button>
                  <h1>{currentPage}</h1>
                  <button
                    className="nextButton"
                    onClick={() => {
                      handlePageChange(currentPage + 1);
                    }}
                    disabled={isButtonNextDisabled}
                  >
                    Next
                  </button>
                </div>
              );
            }
          })()}
        </section>
      )}
    </div>
  );
}
