import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
//import "./Post.css";
//import { useLocation, useSearchParams } from "react-router-dom";

export default function Post(props: {
  name: string | undefined;
  description: string | undefined;
}) {
  //const [, setSearchParams] = useSearchParams();

  // function useQuery() {
  //   const { search } = useLocation();
  //   return React.useMemo(() => new URLSearchParams(search), [search]);
  // }

  // const query = useQuery();
  // const searchQuery = query.get("search");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("post");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div
      className="PostItem"
      id={props.name}
       onClick={() =>
        router.push(`?` + createQueryString('post', props.name), null ,{ shallow: true })
      //   setSearchParams({
      //     post: `${props.name}`,
      //     search: `${searchQuery}`,
      //   })
       }
    >
      <div className="PostContent">
        <strong>{props.name}</strong>
        <div>Terrain: {props.description}</div>
      </div>
    </div>
  );
}
