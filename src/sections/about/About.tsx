import { Reveal } from "../../components/ui/Reveal";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.left}>
          <div className={styles.stickyWrap}>
            <Reveal variant="fade">
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span className="mono eyebrow">01</span>
                <span className="eyebrow">About</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="about-heading" className={styles.headline}>
                A computer science student who likes to build things.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <dl className={styles.metaList}>
                <div className={styles.metaItem}>
                  <dt className={styles.metaLabel}>Born</dt>
                  <dd className={styles.metaValue}>Purwokerto, Indonesia</dd>
                </div>
                <div className={styles.metaItem}>
                  <dt className={styles.metaLabel}>Based in</dt>
                  <dd className={styles.metaValue}>Jakarta, Indonesia</dd>
                </div>
                <div className={styles.metaItem}>
                  <dt className={styles.metaLabel}>Studying at</dt>
                  <dd className={styles.metaValue}>BINUS University</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <div className={styles.right}>
          <Reveal>
            <p className={styles.paragraph}>
              Hansel Kristanzen is a computer science student and designer. Born in
              Purwokerto, he moved to Jakarta in 2024 to attend{" "}
              <strong>BINUS University</strong>.
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p className={styles.paragraph}>
              He's drawn to the space where technology meets real-world problems, and
              stays curious about whatever he doesn't understand yet. Hansel likes
              taking on new challenges, working closely with others, and turning loose
              ideas into things that actually work.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p className={styles.paragraph}>
              One of his academic projects, <strong>StairsLife</strong>, set out to
              connect university students with small businesses looking for digital
              help. Beyond coding, organizational and event work has also shaped how he
              collaborates — sharpening his teamwork, leadership, and problem-solving
              along the way.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className={styles.paragraph}>
              Right now, Hansel is focused on one thing: growing as a software engineer.
            </p>
          </Reveal>
          <Reveal delay={220} variant="clip">
            <p className={styles.settle}>
              NEVER <span className={styles.settleAccent}>SETTLE.</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
