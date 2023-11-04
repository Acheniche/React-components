import React, { useEffect, useState } from "react";
import "./search.css";
import { FindPlanet } from "../API/getPlanets";
import { FindPlanetResponse, Planet } from "../../App";
import Post from "../Posts/PostItem";

export default function SearchBlock() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<FindPlanetResponse[]>();
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  async function getPosts(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPostsLoading(true);
    const res = await FindPlanet([search]);
    localStorage.setItem("request", search);
    setPosts(res);
    setIsPostsLoading(false);
  }

  useEffect(() => {
    const start = async () => {
      if (
        localStorage.getItem("request") === null ||
        localStorage.getItem("request") === ""
      ) {
        setIsPostsLoading(true);
        const res = await FindPlanet([""]);
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
                  name={name.value.name}
                  description={name.value.terrain}
                  key={name.value.name}
                />
              ))
            ) : (
              <h1>No Data About Your Search</h1>
            )
          ) : (
            <h1>No data</h1>
          )}
        </section>
      )}
    </div>
  );
}
