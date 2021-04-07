import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import styles from "./search.module.css";

export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(false);
  const [results, setResults] = useState([]);

  const searchEndpoint = (query) => {
    let searchString = query.replace(" ", "+");
    return `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${searchString}`
  };

  const onChange = useCallback((event) => {
    const query = event.target.value;
    setQuery(query);
    if (query.length) {
      console.log(searchEndpoint(query))
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res);
        });
    } else {
      setResults([]);
    }
  }, []);

  const onFocus = useCallback((event) => {
    setActive(true);
    window.addEventListener("click", onClick);
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false);
      window.removeEventListener("click", onclick);
    }
  }, []);

  return (
    <div className={styles.container} ref={searchRef}>
      <input
        className={styles.search}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="Search Characters"
        type="text"
        value={query}
      />
      {active && results.length > 0 && (
        <ul className={styles.results}>
          {results.map((char) => (
            <li className={styles.result} key={char.char_id}>
              <Link href="/characters/[id]" as={`/characters/${char.char_id}`}>
                <a>{char.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
