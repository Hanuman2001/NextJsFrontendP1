import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import { useRouter } from "next/router";
import EventItem from "@/components/EventItem";
import qs from "qs";

export default function Searchpage({ events }) {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">Go Back</Link>{" "}
      <h1>Search results for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events Found </h3>}
      {events.map((evt) => (
        <EventItem id={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    populate: "*",
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          },
        },
        {
          performers: {
            $contains: term,
          },
        },
        {
          venue: {
            $contains: term,
          },
        },
        {
          description: {
            $contains: term,
          },
        },
      ],
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}`);

  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
