import { useContext } from "react";
import AppContext from "./AppContext";

function useData(){
  return useContext(AppContext).items;
}

export default useData;


