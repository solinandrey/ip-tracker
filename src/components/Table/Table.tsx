import { useCallback } from "react";
import styles from "./Table.module.scss";

interface IProps {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
}

export const Table = ({ ip, location, timezone, isp }: IProps) => {
  const formTable = useCallback(() => {
    return [
      { title: "ip address", value: ip },
      { title: "location", value: location },
      { title: "timezone", value: timezone },
      { title: "isp", value: isp },
    ];
  }, [ip]);


  return (
    <div className={styles.table}>
      {formTable().map((item) => {
        return (
          <div className={styles.cell} key={item.title}>
            <div className={styles.cellTitle}>{item.title}</div>
            <div className={styles.cellContent}>{item.value}</div>
          </div>
        );
      })}
    </div>
  );
};
