import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import EventItem from "@/components/EventItem";
export default function Home({ events }) {
  return (
    <Layout>
      {" "}
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events Found </h3>}
      {events.map((evt) => (
        <EventItem id={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href={`/events`}>
          <a className="btn-secondary">View All</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&_limit=1`);

  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
