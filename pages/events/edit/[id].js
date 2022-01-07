import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Image from "next/image";
import styles from "@/styles/Form.module.css";
import { FaImage } from "react-icons/fa";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ evt }) {
  let [values, setValues] = useState({
    name: evt.attributes.name,
    performers: evt.attributes.performers,
    venue: evt.attributes.venue,
    address: evt.attributes.address,
    date: evt.attributes.date,
    time: evt.attributes.time,
    description: evt.attributes.description,
  });
  const [showModal, setShowModal] = useState(false);
  //evt.attributes.image.data.attributes.formats.thumbnail.url
  const [imagePreview, setImagePreview] = useState(
    evt.attributes.image.data
      ? evt.attributes.image.data.attributes.formats.thumbnail.url
      : null
  );

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyValues = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyValues) {
      toast.error("Please fill all fields");
    }

    const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: values }),
    });
    if (!res.ok) {
      toast.error(data.message);
    } else {
      const evt = await res.json();

      console.log(evt);
      router.push(`/events/${evt.data.attributes.slug}`);
    }

    // console.log(values);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/events/${evt.id}?populate=*`);
    const singleEvt = await res.json();
    console.log(singleEvt);
    {
      singleEvt.data.attributes.image.data &&
        setImagePreview(
          singleEvt.data.attributes.image.data.attributes.formats.thumbnail.url
        );
    }

    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>

      <h1>Edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("yyyy-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <div>
        <h2>Event Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} width={170} height={100} />
        ) : (
          <div>
            <p>No Image uploaded</p>
          </div>
        )}
      </div>
      <div>
        <button onClick={() => setShowModal(true)} className="btn-secondary">
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);

  const evt = await res.json();

  return {
    props: {
      evt: evt.data,
    },
  };
}
