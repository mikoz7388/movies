import { useLoaderData } from "react-router-dom";

export function SearchPage() {
  const data = useLoaderData();

  return <div>{JSON.stringify(data)}</div>;
}
