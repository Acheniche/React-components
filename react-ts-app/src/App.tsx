import React from "react";
import "./App.css";
import Post from "./components/Posts/PostItem";
import SearchBlock from "./components/search block/search";

interface AppState {
  name: FindPlanetResponse[];
  isLoading: boolean;
  isError: boolean;
}

type Planet = {
  name: string;
  terrain: string;
};

export type FindPlanetResponse = {
  value: Planet;
};

class App extends React.Component<NonNullable<unknown>, AppState> {
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
}

export default App;
