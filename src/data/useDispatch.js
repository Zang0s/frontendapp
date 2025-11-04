import { useContext } from "react";
import AppContext from "./AppContext";

function useDispatch(){
  return useContext(AppContext).dispatch;
}

export default useDispatch;


