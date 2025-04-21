// src/hooks.ts

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

// This file is used to create typed versions of useDispatch and useSelector hooks
// for better type safety in the application.
// It imports the RootState and AppDispatch types from the store file and uses them
// to create typed versions of the useDispatch and useSelector hooks.

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
