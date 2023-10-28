import React from "react";
import './search.css';
import { Planets } from "swapi-ts";

class SearchBlock extends React.Component{

  state: { value: string; };

  constructor(props: string) {
    super(props)
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event:  React.FormEvent<HTMLFormElement>) {
    console.log('Запрос: ' + this.state.value);
    event.preventDefault();
   Planets.getPage(1).then((data) => {
    console.log(data);
   });
  }

  render() {
    return (
      <div className="SearchBlock">
        <form onSubmit={this.handleSubmit}>
            <input className="searchInput" type='text' value={this.state.value} onChange={this.handleChange}/>
            <input className="searchButton" type="submit" value='send'/>
        </form>
      </div>
    );
  }
}
export default SearchBlock;