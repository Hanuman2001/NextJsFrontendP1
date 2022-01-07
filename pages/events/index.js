import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import EventItem from "@/components/EventItem";
import qs from "qs";
import Pagination from "@/components/Pagination";
import { PER_PAGE } from "@/config/index";
export default function Eventspage({ events, page, total }) {
  return (
    <Layout>
      {" "}
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events Found </h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify({
    populate: "*",
    pagination: {
      start: +page === 1 ? 0 : (+page - 1) * PER_PAGE,
      limit: PER_PAGE,
    },
  });

  const res = await fetch(`${API_URL}/api/events?${query}`);

  const events = await res.json();

  return {
    props: {
      events: events.data,
      page: +page,
      total: events.meta.pagination.total,
    },
  };
}
