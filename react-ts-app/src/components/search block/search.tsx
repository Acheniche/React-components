import React from "react";
import "./search.css";
import { FindPlanet } from "../API/getPlanets";
import { FindPlanetResponse } from "../../App";

interface SearchBlockProps {
  handleSearch: (data: FindPlanetResponse[]) => void;
  setLoading: (isLoading: boolean) => void;
}

interface SearchBlockState {
  value: string;
}

class SearchBlock extends React.Component<SearchBlockProps, SearchBlockState> {
  state: { value: string };

  constructor(props: SearchBlockProps) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.setLoading(true);
    const res = await FindPlanet.FindPlanet([this.state.value]);
    localStorage.setItem("request", this.state.value);
    this.props.handleSearch(res);
    this.props.setLoading(false);
  }

  async componentDidMount() {
    if (
      localStorage.getItem("request") === null ||
      localStorage.getItem("request") === ""
    ) {
      this.props.setLoading(true);
      const res = await FindPlanet.FindPlanet([this.state.value]);
      this.props.handleSearch(res);
      this.props.setLoading(false);
    } else {
      const local = localStorage.getItem("request");
      if (local) {
        this.state.value = local;
        this.props.setLoading(true);
        const res = await FindPlanet.FindPlanet([local]);
        this.props.handleSearch(res);
        this.props.setLoading(false);
      }
    }
  }

  render() {
    return (
      <div className="SearchBlock">
        <form onSubmit={this.handleSubmit}>
          <input
            className="searchInput"
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input className="searchButton" type="submit" value="send" />
        </form>
      </div>
    );
  }
}
export default SearchBlock;
