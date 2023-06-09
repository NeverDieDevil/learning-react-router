import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

function EventsPage() {
  // const events = useLoaderData();
  const {events} = useLoaderData();
 
  return (
  <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
  <Await resolve={events}>
    {(loadedEvents)=> <EventsList events={loadedEvents}/>}
  </Await>
  </Suspense>)
}

export default EventsPage;

const loadEvents = async () => {
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
    const resData = await response.json();
    return resData.events
  }
}

export const loader = () => {
 return defer({
    events:loadEvents()
  })
};
