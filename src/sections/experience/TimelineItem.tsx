import type { ExperienceEntry } from "../../types/content";
import { useInView } from "../../hooks/useInView";
import styles from "./Experience.module.css";

interface TimelineItemProps {
  entry: ExperienceEntry;
}

export function TimelineItem({ entry }: TimelineItemProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      className={styles.item}
      data-visible={inView}
      style={{ opacity: inView ? 1 : 0.45 }}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.date}>
        {entry.start === entry.end ? entry.start : `${entry.start} — ${entry.end}`}
      </span>
      <div>
        <h3 className={styles.role}>{entry.role}</h3>
        <p className={styles.org}>{entry.organization}</p>
      </div>
      <div className={styles.location}>
        <span className={styles.locationText}>{entry.location}</span>
        <span className={styles.locationText}>{entry.mode}</span>
      </div>
    </div>
  );
}
