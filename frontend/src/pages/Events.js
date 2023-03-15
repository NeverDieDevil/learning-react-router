import EventsList from "../components/EventsList";
import { json, useLoaderData } from "react-router-dom";

function EventsPage() {
  // const events = useLoaderData();
  const data = useLoaderData();
  const events = data.events;
  console.log(events);
  if(data.isError){
    return <p>{data.message}</p>
  }
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return {isError: true, message: 'Couls not fetch events'};
    // throw {message: "could not fetch events."}
    // throw new Response(JSON.stringify({message: ' could not fetch events.'}), {status: 500})
    return json({message: ' could not fetch events.'},{
      status: 500,
    })
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
};
