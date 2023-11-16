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
import { AppLayout } from "./ui";

export const App = () => {
  return (
    <>
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
    </>
  );
};
