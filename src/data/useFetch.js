import { useEffect, useState } from "react";

function useFetch(url){
  const [data, setData] = useState([]);
  useEffect(() => {
    let isActive = true;
    fetch(url)
      .then((res) => res.json())
      .then((json) => { if (isActive) setData(json); });
    return () => { isActive = false; };
  }, [url]);
  return [data];
}

export default useFetch;


