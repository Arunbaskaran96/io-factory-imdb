import { useEffect, useState } from "react";

function useDebounce(producer) {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    let timeout = setTimeout(() => {
      setSearchTerm(producer);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [producer]);
  return searchTerm;
}

export default useDebounce;
