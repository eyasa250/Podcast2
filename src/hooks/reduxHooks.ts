// src/hooks/reduxHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

// Custom hook pour dispatcher avec typage
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook pour sélectionner avec typage
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
