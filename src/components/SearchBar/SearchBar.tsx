import styles from "./SearchBar.module.scss";

export const SearchBar = () => {
  return (
    <div className={styles.search}>
      <form className={styles.form}>
        <input placeholder="Search for ip address or domain" className={styles.input}/>
        <button className={styles.button}>{'>'}</button>
      </form>
    </div>
  );
};
