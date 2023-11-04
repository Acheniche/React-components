import "./Post.css";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Post(props: { name: string; description: string }) {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div
      className="PostItem"
      id={props.name}
      onClick={
        () =>
          setSearchParams({
            post: `${props.name}`,
          }) /*navigate(`/post/${props.name}`)*/
      }
    >
      <div className="PostContent">
        <strong>{props.name}</strong>
        <div>Terrain: {props.description}</div>
      </div>
    </div>
  );
}
