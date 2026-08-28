import { contactChannels } from "../../data/contact";
import { Reveal } from "../../components/ui/Reveal";
import { MagneticButton } from "../../components/ui/MagneticButton";
import styles from "./Contact.module.css";

export function Contact() {
  const email = contactChannels.find((c) => c.id === "email");

  return (
    <section id="contact" className={styles.contact} data-dark aria-labelledby="contact-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.container}`}>
        <Reveal variant="fade">
          <div className={styles.eyebrowRow}>
            <span className={styles.index}>09</span>
            <span className="eyebrow eyebrow--on-dark">Contact</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 id="contact-heading" className={styles.headline}>
            LET'S BUILD SOMETHING.
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.sub}>Have an idea, project, or problem worth solving?</p>
        </Reveal>

        {email ? (
          <Reveal delay={200}>
            <div className={styles.ctaRow}>
              <MagneticButton href={email.href} variant="solid">
                Say Hello
              </MagneticButton>
            </div>
          </Reveal>
        ) : null}

        <div className={styles.channels}>
          {contactChannels.map((channel, i) => (
            <Reveal key={channel.id} delay={260 + i * 50}>
              <a
                href={channel.href}
                className={styles.channel}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer noopener" : undefined}
                data-cursor="interactive"
              >
                <span className={styles.channelLabel}>{channel.label}</span>
                <span className={styles.channelValue}>{channel.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
