import { createSignal, For, JSX } from "solid-js";
import { render } from "solid-js/web";

import GhEventsComponent from "./gh-events";

export const TabContents: { tabname: string; heading: string; Content: JSX.Element | HTMLElement }[] = [
  {
    tabname: "About",
    heading: "About Me!!",
    Content: document.getElementById("content-about"),
  },
  {
    tabname: "Blogs",
    heading: "Blogs | Journals",
    Content: document.getElementById("content-blog"),
  },
  {
    tabname: "Github",
    heading: "Github Events",
    Content: <GhEventsComponent />,
  },
];

const App = () => {
  let [activeTab, setActiveTab] = createSignal("About");

  function TabClick(name: string) {
    setActiveTab(name);
  }

  return (
    <>
      <div class="main-nav">
        <For each={TabContents}>
          {(item) => (
            <button class={`tabs`} onClick={[TabClick, item.tabname]}>
              {item.tabname}
            </button>
          )}
        </For>
      </div>
      <div class="main-content">
        {() => {
          let x = TabContents.find((item) => item.tabname === activeTab());
          return (
            <>
              <h2 class="tab-content-heading">{x?.heading}</h2>
              {x?.Content}
            </>
          );
        }}
      </div>
    </>
  );
};

render(App, document.getElementById("main-container") as HTMLDivElement);
