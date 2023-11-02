export default function Post(props: { name: string; description: string }) {
  return (
    <div className="PostItem">
      <div className="PostContent">
        <strong>{props.name}</strong>
        <div>Terrain: {props.description}</div>
      </div>
    </div>
  );
}
