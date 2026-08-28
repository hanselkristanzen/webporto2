import { nlpResearch } from "../../data/research";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Tag } from "../../components/ui/Tag";
import { Reveal } from "../../components/ui/Reveal";
import { ModelComparison } from "./ModelComparison";
import styles from "./Research.module.css";

export function Research() {
  const { dataset } = nlpResearch;

  return (
    <section
      id="research"
      className={styles.research}
      data-dark
      aria-labelledby="research-heading"
    >
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.headerLeft}>
            <SectionHeading
              index="03"
              eyebrow="Research / Experiments"
              headline={
                <span id="research-heading">Comparing how machines understand Indonesian.</span>
              }
              wide
              kicker="A benchmark of five intent-classification approaches on messy, real Indonesian customer-service queries — not a lab-clean dataset."
            />
          </div>

          <Reveal delay={100} className={styles.headerRight}>
            <p className={styles.datasetLabel}>{nlpResearch.venue} · {nlpResearch.status}</p>
            <p className={styles.paperTitle}>{nlpResearch.title}</p>
            <div className={styles.datasetStats}>
              <div className={styles.datasetStat}>
                <span className={styles.datasetStatValue}>
                  {dataset.size.toLocaleString("en-US")}
                </span>
                <span className={styles.datasetStatLabel}>Queries</span>
              </div>
              <div className={styles.datasetStat}>
                <span className={styles.datasetStatValue}>{dataset.intentCategories}</span>
                <span className={styles.datasetStatLabel}>Intent categories</span>
              </div>
            </div>
            <div className={styles.characteristics}>
              {dataset.characteristics.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ModelComparison models={nlpResearch.models} />
        </Reveal>

        <div className={styles.insights}>
          <Reveal delay={0}>
            <div className={styles.insight}>
              <p className={styles.insightValue}>100.00%</p>
              <p className={styles.insightLabel}>
                IndoBERT reached perfect accuracy on the clean test set.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className={styles.insight}>
              <p className={styles.insightValue}>~33× faster</p>
              <p className={styles.insightLabel}>
                TF-IDF + Linear SVM answers in 0.57 ms per query versus IndoBERT's 18.77 ms.
              </p>
              <p className={styles.insightMeta}>Derived from reported latency figures</p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className={styles.insight}>
              <p className={styles.insightValue}>5.11 vs 7.56 pp</p>
              <p className={styles.insightLabel}>
                Under noisy, informal input, TF-IDF's accuracy drop was smaller than
                IndoBERT's — narrowing the gap between them.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
