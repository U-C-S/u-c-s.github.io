import { createResource, For } from "solid-js";
import { render } from "solid-js/web";
import { EventParse } from "./gh-event-parser";

const App = () => {
  const [eventsAPI] = createResource<ghEventApi[]>(async () => {
    let res = await fetch(`https://api.github.com/users/U-C-S/events/public?per_page=5`);
    return res.json();
  });

  return (
    <>
      <For each={eventsAPI()} fallback={<h2>Getting Github Events....</h2>}>
        {(item) => <li>{EventParse(item)}</li>}
      </For>
    </>
  );
};

render(App, document.getElementById("git-events") as HTMLUListElement);