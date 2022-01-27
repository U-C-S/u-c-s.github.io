import { createSignal, For, JSX } from "solid-js";
import { render } from "solid-js/web";

import GhEventsComponent from "./gh-events";
import { TabMain } from "./main-content";

export const TabContents: { heading: string; isJSX: boolean; Content: JSX.Element | HTMLElement }[] = [
  {
    heading: "github",
    isJSX: true,
    Content: GhEventsComponent,
  },
  {
    heading: "blog",
    isJSX: false,
    Content: document.getElementById("content-blog"),
  },
  {
    heading: "about",
    isJSX: false,
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
      <TabMain activetab={activeTab()} />
    </>
  );
};

render(App, document.getElementById("main-content") as HTMLDivElement);
