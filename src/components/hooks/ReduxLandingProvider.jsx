"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { getFrontendPosts } from "../store/postSlice";

function InitUser({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFrontendPosts())
  }, [dispatch]);

  return children;
}

export default function ReduxLandingProvider({ children }) {
  return (
    <Provider store={store}>
      <InitUser>{children}</InitUser>
    </Provider>
  );
}
