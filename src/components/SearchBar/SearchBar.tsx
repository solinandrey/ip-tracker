import { useState } from "react";
import styles from "./SearchBar.module.scss";

interface IProps {
  submitSearch: (text: string) => void
}

export const SearchBar = ({submitSearch}: IProps) => {
  const [address, setAddress] = useState('');
  const submitAddress = (event: any) => {
    event.preventDefault();
    if (address) { submitSearch(address) }
  }

  const onChange = (ev: any) => {
    setAddress(ev.target.value);
  }
  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={submitAddress}>
        <input placeholder="Search for ip address" className={styles.input} onChange={onChange}/>
        <button className={styles.button}>{'>'}</button>
      </form>
    </div>
  );
};
