import { GlobalStyles } from "@/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Account,
  Bookings,
  Cabins,
  Dashboard,
  Login,
  NotFound,
  Settings,
  Users,
} from "@/pages";
import { AppLayout, Toast } from "@/ui";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="cabins" element={<Cabins />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
          <Route path="account" element={<Account />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    <Toast />
  </QueryClientProvider>
);
