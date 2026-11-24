import SectionHeading from "@/components/ui/SectionHeading/SectionHeading.jsx";
import Skeleton from "@/components/ui/Skeleton/Skeleton.jsx";
import StatusMessage from "@/components/ui/StatusMessage/StatusMessage.jsx";
import TeamCard from "@/components/ui/TeamCard/TeamCard.jsx";
import useAsyncData from "@/hooks/useAsyncData.js";
import { loadTeam } from "@/data/api.js";
import { contact } from "@/data/navigation.js";
import styles from "./Team.module.scss";

export default function Team() {
  const { status, data, retry } = useAsyncData(loadTeam);

  return (
    <section id="team" className={styles.section} aria-labelledby="team-title" tabIndex={-1}>
      <div className={styles.inner}>
        <SectionHeading id="team-title" title="The people you work with">
          No account managers and no handovers. You talk to the designers and developers directly.
        </SectionHeading>

        {status === "loading" && (
          <div role="status" aria-busy="true">
            <p className="visually-hidden">Loading team</p>
            <div className={styles.grid}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div key={index} className={styles.item}>
                  <Skeleton className={styles.placeholderPhoto} />
                  <Skeleton className={styles.placeholderLine} />
                </div>
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <StatusMessage variant="error" title="The team list didn't load" actionLabel="Try again" onAction={retry}>
            Check your connection, then try again.
          </StatusMessage>
        )}

        {status === "empty" && (
          <StatusMessage title="Team profiles are being updated">
            To reach someone at the studio in the meantime, email {contact.email}.
          </StatusMessage>
        )}

        {status === "success" && (
          <ul className={styles.grid}>
            {data.map((member) => (
              <li key={member.id} className={styles.item}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
