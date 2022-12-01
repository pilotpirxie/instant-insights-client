import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError() as Error;
  if (isRouteErrorResponse(error)) {
    // eslint-disable-next-line no-console
    console.error(error);

    return (
      <div className="text-center mt-5">
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }

  return <div>Something went wrong</div>;
}
