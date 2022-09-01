import styles from './Header.module.css';
import imgRocket from '../assets/rocket.svg';

export function Header() {
  return(
    <header className={styles.header}>
      <img src={imgRocket} alt="logo" />
      <div>
        <span>to</span>
        <span>do</span>
      </div>
    </header>
  )
}