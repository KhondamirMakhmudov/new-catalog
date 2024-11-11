import { useState } from "react";
import { Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { CounterProvider } from "@/context/counter";
import NextNProgress from "nextjs-progressbar";
import reactQueryClient from "@/config/react-query";

import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = useState(() => reactQueryClient);
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps?.dehydratedState}>
          <NextNProgress />
          <CounterProvider>
            <Component {...pageProps} />
          </CounterProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
