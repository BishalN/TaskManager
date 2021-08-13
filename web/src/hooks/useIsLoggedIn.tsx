import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useMeQuery } from "../generated";

export function useIsLoggedIn() {
  const { data } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (data && data?.me?.email) {
      router.push("/dash");
    } else {
      router.replace("/login");
    }
  }, [data]);
}
