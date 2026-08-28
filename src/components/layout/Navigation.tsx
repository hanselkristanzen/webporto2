import { useEffect, useState } from "react";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useSmoothScroll } from "../../lib/SmoothScrollContext";
import styles from "./Navigation.module.css";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const { direction, pastThreshold } = useScrollDirection(80);
  const active = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const { scrollTo } = useSmoothScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    scrollTo(`#${id}`, { offset: id === "home" ? 0 : -24 });
  };

  const hidden = pastThreshold && direction === "down" && !menuOpen;

  return (
    <>
      <nav
        className={styles.nav}
        data-visible={pastThreshold || menuOpen}
        data-hidden={hidden}
        aria-label="Primary"
      >
        <a
          href="#home"
          className={styles.mark}
          onClick={(event) => {
            event.preventDefault();
            handleNavigate("home");
          }}
        >
          HK
        </a>
        <ul className={styles.links}>
          {NAV_ITEMS.slice(1).map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.link}
                data-active={active === item.id}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-overlay"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        id="mobile-nav-overlay"
        className={styles.overlay}
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <button
          type="button"
          className={styles.overlayClose}
          onClick={() => setMenuOpen(false)}
        >
          Close ×
        </button>
        <ul className={styles.overlayLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={styles.overlayLink}
                data-active={active === item.id}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavigate(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.overlayMeta}>Computer Science × Design — Jakarta, ID</p>
      </div>
    </>
  );
}
