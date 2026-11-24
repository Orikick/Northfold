import AnchorLink from "@/components/ui/AnchorLink/AnchorLink.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import ParallaxImage from "@/components/ui/ParallaxImage/ParallaxImage.jsx";
import SplitLines from "@/components/ui/SplitLines/SplitLines.jsx";
import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <SplitLines as="h1" id="hero-title" className={styles.title}>
          We give good companies a shape people remember.
        </SplitLines>

        <div className={styles.lower}>
          <div>
            <p className={styles.lede}>
              Northfold is a six-person studio in Copenhagen. We design brand identities, websites and digital
              products, and we build what we design.
            </p>
            <div className={styles.actions}>
              <Button href="#work">See selected projects</Button>
              <AnchorLink className={styles.textLink} href="#contact">
                Start a project
              </AnchorLink>
            </div>
          </div>

          <ParallaxImage
            photoId="photo-1497366216548-37526070297c"
            alt="Inside the Northfold studio: a long open room with glass partitions and a polished concrete floor."
            ratio={3 / 2}
            sizes="(min-width: 1024px) 62vw, 100vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
