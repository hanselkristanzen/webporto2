import styles from "./Tag.module.css";

interface TagProps {
  children: string;
  tone?: "default" | "accent";
}

export function Tag({ children, tone = "default" }: TagProps) {
  return (
    <span className={styles.tag} data-tone={tone}>
      {children}
    </span>
  );
}
