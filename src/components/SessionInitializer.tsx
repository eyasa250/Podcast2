// components/SessionInitializer.tsx
import React, { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { restoreSession } from "@/store/slices/authSlice";

const SessionInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return null;
};

export default SessionInitializer;
