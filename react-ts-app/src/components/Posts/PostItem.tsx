import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useCallback } from "react";

export default function Post(props: {
  name: string | undefined;
  description: string | undefined;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div
      className="PostItem"
      id={props.name}
      onClick={() =>
        router.push(`?` + createQueryString("post", props.name), null, {
          shallow: true,
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
