import { create } from "zustand";

export const useData = create(set => ({
 data: "",
 setData:  (data) => {
  set({data});
 }
}))