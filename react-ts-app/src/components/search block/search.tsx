import React from "react";
import './search.css';
import GetPlanets, { FindPlanet } from "../API/getPlanets";

interface SearchBlockProps {
  handleSearch: (data: any) => void;
}

interface SearchBlockState {
  value: string;
}

class SearchBlock extends React.Component<SearchBlockProps,SearchBlockState>{

  state: { value: string; };

  constructor(props: SearchBlockProps) {
    super(props)
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event:  React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Запрос: ' + this.state.value);
    const res = await FindPlanet.FindPlanet([this.state.value]);
    localStorage.setItem('request', this.state.value);
    //const res = await GetPlanets.GetPlanets();
    this.props.handleSearch(res);
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