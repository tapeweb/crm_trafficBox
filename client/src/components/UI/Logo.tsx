import {Fragment} from "react";
import styles from "../../styles/components/UI/Logo.module.scss"

export function Logo() {
  return (
    <Fragment>
      <div className={styles.LogoStructure}>
        <span className={styles.FirstPartLogotype}>
          B
        </span>
        <span className={styles.SecondPartLogotype}>
          A
        </span>
      </div>
    </Fragment>
  );
}