"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "../store/store";
import { useEffect } from "react";
import { getUser } from "../store/userSlice";
import { getPosts } from "../store/postSlice";

function InitUser({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getPosts())
  }, [dispatch]);

  return children;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <InitUser>{children}</InitUser>
    </Provider>
  );
}
