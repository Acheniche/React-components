import React from 'react';
import './App.css';
import Post from './components/Posts/PostItem';
import SearchBlock from './components/search block/search';

interface AppState {
  name: FindPlanetResponse[];
  isLoading: boolean
}

type Planet = {
  name: string;
  terrain:string;
}

export type FindPlanetResponse = {
  value: Planet;

}

class App extends React.Component<{}, AppState> {

constructor(props: {}) {
  super(props);
  this.state = {name: [], isLoading: false};
}
  handleSearch = (data: FindPlanetResponse[]) => {
    this.setState({name: data});
  }

  setLoading = (isLoading: boolean) => {
    this.setState({isLoading});
  }

  render() {
      return (
        <div className='App'>
          <SearchBlock handleSearch = {this.handleSearch} setLoading = {this.setLoading}/>
          {this.state.isLoading ? <h1>Loading...</h1> :
          this.state.name.length === 0 ? <h1>No items</h1> :
          this.state.name.map((name: FindPlanetResponse) =>
          <Post name={name.value.name} description={name.value.terrain} key={name.value.name}/>
          )}
        </div>
      );
  }
}


export default App;