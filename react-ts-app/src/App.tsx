import React from 'react';
import './App.css';
import Post from './components/Posts/PostItem';
import SearchBlock from './components/search block/search';

interface AppState {
  name: [];
}

type Planet = {
  name: string;
  terrain:string;

}

type FindPlanetResponse = {
  value: Planet;

}

class App extends React.Component<{}, AppState> {

constructor(props: {}) {
  super(props);
  this.state = {name: []};
}
  handleSearch = (data: []) => {
    this.setState({name: data});
  }

  render() {
    return (
      <div className='App'>
        <SearchBlock handleSearch = {this.handleSearch}/>
        {this.state.name.map((name: FindPlanetResponse) =>
        <Post name={name.value.name} description={name.value.terrain} key={name.value.name}/>
        )}
        {/* <Post name='pe pe pe' description='axaxax'/> */}
        {/* <h1>{this.state.name[0]?.name}</h1> */}
      </div>
    );
  }
}


export default App;


/*
// ParentComponent.tsx
import React, { Component } from 'react';
import ChildComponent from './ChildComponent';

interface ParentState {
  dataFromChild: string;
}

class ParentComponent extends Component<{}, ParentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      dataFromChild: '',
    };
  }

  handleDataFromChild = (data: string) => {
    this.setState({ dataFromChild: data });
  }

  render() {
    return (
      <div>
        <p>Data from Child: {this.state.dataFromChild}</p>
        <ChildComponent sendDataToParent={this.handleDataFromChild} />
      </div>
    );
  }
}

export default ParentComponent;

// ChildComponent.tsx
import React, { Component } from 'react';

interface ChildProps {
  sendDataToParent: (data: string) => void;
}

interface ChildState {
  childData: string;
}

class ChildComponent extends Component<ChildProps, ChildState> {
  constructor(props: ChildProps) {
    super(props);
    this.state = {
      childData: 'Data from Child',
    };
  }

  sendDataToParent = () => {
    this.props.sendDataToParent(this.state.childData);
  }

  render() {
    return (
      <div>
        <button onClick={this.sendDataToParent}>Send Data to Parent</button>
      </div>
    );
  }
}

export default ChildComponent;*/