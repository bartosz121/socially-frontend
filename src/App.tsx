import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./services/auth.serivce";

import Layout from "./pages/Layout/Layout";
import RequireAuth from "./routes/RequireAuth/RequireAuth";

import Auth from "./pages/Auth/Auth";

import SignInForm from "./components/SignInForm/SignInForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";

import { Home } from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { NotFound } from "./pages/NotFound/NotFound";

type Props = {};
const App = (props: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="protected"
              element={
                <RequireAuth>
                  <About />
                </RequireAuth>
              }
            />
            <Route path="/auth" element={<Auth />}>
              <Route path="signin" element={<SignInForm />} />
              <Route path="signup" element={<SignUpForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
