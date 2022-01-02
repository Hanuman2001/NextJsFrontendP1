import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import EventItem from "@/components/EventItem";
export default function Eventspage({ events }) {
  console.log(events);
  return (
    <Layout>
      {" "}
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events Found </h3>}
      {events.map((evt) => (
        <EventItem id={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);

  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
