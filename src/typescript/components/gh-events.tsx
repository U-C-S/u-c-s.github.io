import { createResource, Index, Show } from "solid-js";
import { EventParse } from "../utils/gh-event-parser";

const fetchData = async (): Promise<ghEventApi[]> => {
  let temp = sessionStorage.getItem("gh-events");

  if (temp == null || temp === "undefined" || temp == undefined) {
    // console.log("Fetching Github Events");
    // sessionStorage.setItem("gh-fetch-time", new Date().toString());
    let res = await fetch(`https://api.github.com/users/U-C-S/events/public?per_page=5`);
    return res.json();
  } else {
    // console.log("Using cached data");
    return Promise.resolve(JSON.parse(temp as string));
  }
};

const GhEventsComponent = () => {
  let [eventsAPI] = createResource(fetchData);

  return (
    <Show when={eventsAPI()} fallback={<h2>Getting Github Events....</h2>}>
      {(events) => {
        sessionStorage.setItem("gh-events", JSON.stringify(events));
        return <Index each={events}>{(item) => <li>{EventParse(item())}</li>}</Index>;
      }}
    </Show>
  );
};

export default GhEventsComponent;
