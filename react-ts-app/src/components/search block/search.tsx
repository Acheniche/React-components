import React, { useCallback, useEffect, useState } from "react";
//import "./search.css";
import { FindPlanetResponse } from "../../App";
import Post from "../Posts/PostItem";
//import { useLocation, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { searchSlice } from "../store/redusers/searchSlice";
import { planetsAPI } from "../API/getPlanets";
import { pageSlice } from "../store/redusers/pageSlice";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation"

export default function SearchBlock() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.searchReducer);
  const { setSearch } = searchSlice.actions;

  const { page } = useAppSelector((state) => state.pageReducer);
  const { setPage } = pageSlice.actions;

  const [posts, setPosts] = useState<FindPlanetResponse[]>();
  const { data: Searchpost } = planetsAPI.useFetchSearchPlanetsQuery(search);
  const { data: Pagepost, isLoading, isFetching } = planetsAPI.useFetchPagePlanetsQuery(page);
  //const [, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isButtonNextDisabled, setIsButtonNextDisabled] = useState<boolean>(false);
  const [isButtonPrevDisabled, setIsButtonPrevDisabled] = useState<boolean>(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  // function useQuery() {
  //   const { search } = useLocation();
  //   return React.useMemo(() => new URLSearchParams(search), [search]);
  // }

  //const query = useQuery();
  const searchQuery = searchParams.get("search");

  async function getPosts(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // setSearchParams({
    //   search: `${search}`,
    // });
    router.push(`?` + createQueryString('search', search), null ,{ shallow: true});
    if (Searchpost) {
      setPosts(Searchpost.results);
    }
    localStorage.setItem("request", search as string);
     if(!searchQuery || searchQuery == null || searchQuery == "null") {
      router.push(`?` + createQueryString('page', '1'), undefined ,{ shallow: true });
       handlePageChange(1);
     }
  }

  async function handlePageChange(newPage: number) {
    if (newPage === 6) {
      setIsButtonNextDisabled(true);
    } else if (newPage === 1) {
      setIsButtonPrevDisabled(true);
    } else {
      setIsButtonNextDisabled(false);
      setIsButtonPrevDisabled(false);
    }
    dispatch(setPage(newPage));
    setCurrentPage(newPage);
    // setSearchParams({
    //   page: `${newPage}`,
    // });
    router.push(`?` + createQueryString('page', `${newPage}`), undefined ,{ shallow: true });
    setPosts(Pagepost.results);
  }

  useEffect(() => {
    const start = async () => {
      if (
        localStorage.getItem("request") === null ||
        localStorage.getItem("request") === ""
      ) {
        if (Pagepost) {
          setPosts(Pagepost.results);
        }
      } else {
        const local = localStorage.getItem("request");
        if (local) {
          // setSearchParams({
          //   search: `${local}`,
          // });
          router.push(`?` + createQueryString('search', local), null ,{ shallow: true });
          if (Searchpost) {
            setPosts(Searchpost.results);
          }
        }
      }
    };
    start();
  }, [Searchpost, Pagepost]);

  useEffect(() => {
    const start = async () => {
      if (
        localStorage.getItem("request") === null ||
        localStorage.getItem("request") === ""
      ) {
        if (Pagepost) {
          setPosts(Pagepost.results);
        }
      } else {
        const local = localStorage.getItem("request");
        if (local) {
          // setSearchParams({
          //   search: `${local}`,
          // });
          router.push(`?` + createQueryString('search', local), null ,{ shallow: true });
          if (local) {
            dispatch(setSearch(local));
          }
          if (Searchpost) {
            setPosts(Searchpost.results);
          }
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
            placeholder="Search..."
            type="text"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <input className="searchButton" type="submit" value="send" />
        </form>
      </section>
      {isLoading || isFetching ? (
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
