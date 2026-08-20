import { useEffect, useState } from "react";
import { ArrowLeft, Code2, Crown, Megaphone, UsersRound } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { LEADERSHIP } from "../data/leadership";
import BrandHeroHeading from "../components/common/BrandHeroHeading";
import { getLeadershipTeams } from "../services/leadershipService";
import styles from "./LeadershipTeamPage.module.css";
import editorial from "./LeadershipTeamEditorial.module.css";

function Portrait({ person, owner = false }) {
  return (
    <span className={owner ? styles.ownerPortrait : styles.memberPortrait}>
      {person.image ? (
        <img src={person.image} alt={person.name} />
      ) : (
        <b>{person.initials}</b>
      )}
    </span>
  );
}

export default function LeadershipTeamPage() {
  const { teamSlug } = useParams();
  const [teams, setTeams] = useState(LEADERSHIP);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let active = true;
    getLeadershipTeams()
      .then((items) => {
        if (active && items?.length)
          setTeams(
            items.map((item) => ({
              ...item,
              icon: item.slug === "business" ? Megaphone : Code2,
            })),
          );
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);
  const team = teams.find((entry) => entry.slug === teamSlug);
  if (!team && !loaded) return <main className={styles.page} />;
  if (!team) return <Navigate to="/about" replace />;

  const Icon = team.icon;
  return (
    <main className={`${styles.page} ${styles[team.tone]}`}>
      <section className={`${styles.hero} container`}>
        <Link className={styles.back} to="/about#org-title">
          <ArrowLeft size={17} /> Back to our people
        </Link>
        <div className={styles.heroGrid}>
          <div className={styles.copy}>
            <p>LEADERSHIP / {team.department.toUpperCase()}</p>
            <BrandHeroHeading
              text={team.owner.statement || team.owner.bio}
              highlightWords={3}
            />
            <span>{team.summary}</span>
          </div>
          <div className={styles.ownerPanel}>
            <div className={styles.orbits} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <Portrait person={team.owner} owner />
            <div className={styles.ownerMeta}>
              <small>
                <Crown size={13} /> OWNER / DIRECTOR
              </small>
              <h2>{team.owner.name}</h2>
              <p>{team.owner.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.teamSection} container`}>
        <header>
          <div>
            <span>
              <Icon size={20} />
            </span>
            <div>
              <small>DEPARTMENT</small>
              <h2>{team.department}</h2>
            </div>
          </div>
          <p>
            <UsersRound size={17} /> {team.members.length} team members
          </p>
        </header>
        <div className={styles.connector} aria-hidden="true">
          <i />
        </div>
        <div className={`${styles.grid} ${editorial.grid}`}>
          {team.members.map((member, index) => (
            <article key={`${member.role}-${index}`}>
              <div className={editorial.portraitFrame}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                <Portrait person={member} />
                <span aria-hidden="true">PRIME / PEOPLE</span>
              </div>
              <div className={editorial.memberCopy}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span>{member.bio}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
