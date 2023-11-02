import React, { useEffect, useState } from "react";
import "./search.css";
import { FindPlanet } from "../API/getPlanets";
import { FindPlanetResponse } from "../../App";
import Post from "../Posts/PostItem";

//interface SearchBlockProps {
//handleSearch: (data: FindPlanetResponse[]) => void;
//setLoading: (isLoading: boolean) => void;
//}

//interface SearchBlockState {
//  value: string;
//}

// export default class SearchBlock extends React.Component<SearchBlockProps, SearchBlockState> {
//   state: { value: string };

//   constructor(props: SearchBlockProps) {
//     super(props);
//     this.state = { value: "" };

//     // this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   // handleChange(event: React.ChangeEvent<HTMLInputElement>) {
//   //   this.setState({ value: event.target.value });
//   // }

//   async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     //this.props.setLoading(true);
//     const res = await FindPlanet([this.state.value]);
//     localStorage.setItem("request", this.state.value);
//     this.props.handleSearch(res);
//     //this.props.setLoading(false);
//   }

//   async componentDidMount() {
//     if (
//       localStorage.getItem("request") === null ||
//       localStorage.getItem("request") === ""
//     ) {
//       //this.props.setLoading(true);
//       const res = await FindPlanet([this.state.value]);
//       this.props.handleSearch(res);
//       //this.props.setLoading(false);
//     } else {
//       const local = localStorage.getItem("request");
//       if (local) {
//         this.setState({ value: local });
//         //this.props.setLoading(true);
//         const res = await FindPlanet([local]);
//         this.props.handleSearch(res);
//         //this.props.setLoading(false);
//       }
//     }
//   }

//   // render() {
//   //   return (
//   //     <div className="SearchBlock">
//   //       <form onSubmit={this.handleSubmit}>
//   //         <input
//   //           className="searchInput"
//   //           type="text"
//   //           value={this.state.value}
//   //           onChange={this.handleChange}
//   //         />
//   //         <input className="searchButton" type="submit" value="send" />
//   //       </form>
//   //     </div>
//   //   );
//   // }
// }

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
      {/* <section className="Results">
        {posts ? (
          posts.map((name: FindPlanetResponse) => (
            <Post
              name={name.value.name}
              description={name.value.terrain}
              key={name.value.name}
            />
          ))
        ) : (
          <h1>no</h1>
        )}
      </section> */}
    </div>
  );
}
