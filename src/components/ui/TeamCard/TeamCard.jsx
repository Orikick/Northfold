import ParallaxImage from "@/components/ui/ParallaxImage/ParallaxImage.jsx";
import styles from "./TeamCard.module.scss";

export default function TeamCard({ member }) {
  return (
    <article>
      <ParallaxImage
        photoId={member.photo}
        alt={`Portrait of ${member.name}`}
        ratio={4 / 5}
        focus="faces"
        amount={6}
        widths={[320, 480, 768]}
        sizes="(min-width: 768px) 30vw, 46vw"
      />
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{member.role}</p>
    </article>
  );
}
