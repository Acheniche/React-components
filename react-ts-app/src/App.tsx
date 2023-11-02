import React, { useState } from "react";
import "./App.css";
import SearchBlock from "./components/search block/search";

export interface AppState {
  name: FindPlanetResponse[];
  isLoading: boolean;
  isError: boolean;
}

export type Planet = {
  name: string;
  terrain: string;
};

export type FindPlanetResponse = {
  value: Planet;
};

/*class App extends React.Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { name: [], isLoading: false, isError: false };
  }
  handleSearch = (data: FindPlanetResponse[]) => {
    this.setState({ name: data });
  };

  setLoading = (isLoading: boolean) => {
    this.setState({ isLoading });
  };

  handleError = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error("Hey bro, nice error!");
    }
    return (
      <div className="App">
        <button onClick={this.handleError}>Click to error</button>
        <SearchBlock
          handleSearch={this.handleSearch}
          setLoading={this.setLoading}
        />
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : this.state.name.length === 0 ? (
          <h1>No items</h1>
        ) : (
          this.state.name.map((name: FindPlanetResponse) => (
            <Post
              name={name.value.name}
              description={name.value.terrain}
              key={name.value.name}
            />
          ))
        )}
      </div>
    );
  }
}*/

//export default App;

export function App() {
  const [isError, setIsError] = useState(false);

  function setError() {
    setIsError(true);
    console.log(isError);
  }

  if (isError) {
    throw new Error("Hey bro, nice error!");
  }

  return (
    <div className="App">
      <button onClick={setError}>Click to error</button>
      <SearchBlock />
      {/* {posts ? posts.map((name: FindPlanetResponse) => (
            <Post
              name={name.value.name}
              description={name.value.terrain}
              key={name.value.name}
            />
    )) : <h1>no</h1>} */}
      {/* <button onClick={this.handleError}>Click to error</button>
        <SearchBlock
          handleSearch={this.handleSearch}
          setLoading={this.setLoading}
        />
        {this.state.isLoading ? (
          <h1>Loading...</h1>
        ) : this.state.name.length === 0 ? (
          <h1>No items</h1>
        ) : (
          this.state.name.map((name: FindPlanetResponse) => (
            <Post
              name={name.value.name}
              description={name.value.terrain}
              key={name.value.name}
            />
          ))
        )} */}
    </div>
  );
}
