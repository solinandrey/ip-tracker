import styles from './Title.module.scss';

export const Title = ({text}: {text: string}) => {
  return <div className={styles.title}>{text}</div>
}