import "../../styles/globals.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { setAccessToken } from "../utils/token";

// make request to the request end point for the access token
// and set the access token and attach that access token as the header
// authorization in every request

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
      console.log(accessToken);
      console.log("access token set successfully", accessToken);
    });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
