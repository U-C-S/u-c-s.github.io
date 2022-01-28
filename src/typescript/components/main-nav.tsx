import { createSignal, For, JSX } from "solid-js";
import { render } from "solid-js/web";

import GhEventsComponent from "./gh-events";
// import { TabMain } from "./main-content";

export const TabContents: { heading: string; Content: JSX.Element | HTMLElement }[] = [
  {
    heading: "github",
    Content: <GhEventsComponent />,
  },
  {
    heading: "blog",
    Content: document.getElementById("content-blog"),
  },
  {
    heading: "about",
    Content: document.getElementById("content-about"),
  },
];

const App = () => {
  let [activeTab, setActiveTab] = createSignal("about");

  function TabClick(name: string) {
    setActiveTab(name);
  }

  return (
    <>
      <div class="main-nav">
        <For each={TabContents}>
          {(item) => (
            <button class={`tabs`} onClick={[TabClick, item.heading]}>
              {item.heading}
            </button>
          )}
        </For>
      </div>
      <div>
        <h2 class="tab-content-heading">{activeTab()}</h2>
        {() => TabContents.find((item) => item.heading === activeTab())?.Content}
      </div>
    </>
  );
};

render(App, document.getElementById("main-content") as HTMLDivElement);
