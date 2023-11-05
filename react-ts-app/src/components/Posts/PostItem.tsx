import React from "react";
import "./Post.css";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Post(props: {
  name: string | undefined;
  description: string | undefined;
}) {
  const [, setSearchParams] = useSearchParams();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const query = useQuery();
  const searchQuery = query.get("search");

  return (
    <div
      className="PostItem"
      id={props.name}
      onClick={() =>
        setSearchParams({
          post: `${props.name}`,
          search: `${searchQuery}`,
        })
      }
    >
      <div className="PostContent">
        <strong>{props.name}</strong>
        <div>Terrain: {props.description}</div>
      </div>
    </div>
  );
}
