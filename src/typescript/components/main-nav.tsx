import { createEffect, createSignal, For, JSX } from "solid-js";
import { render } from "solid-js/web";

import GhEventsComponent from "./gh-events";
import URLparams from "../utils/url-params";

const DEFAULT_TAB = "About";
const TabContents: { tabname: string; heading: string; Content: JSX.Element | HTMLElement }[] = [
  {
    tabname: DEFAULT_TAB,
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
  let [activeTab, setActiveTab] = createSignal(URLparams.get("tab") || DEFAULT_TAB);

  function TabClick(name: string) {
    URLparams.add("tab", name);
    setActiveTab(name);
  }

  createEffect(() => {
    const A_T = "activetab";
    document.getElementsByClassName(A_T)[0]?.classList.remove(A_T);
    document.getElementsByClassName(`tab-${activeTab()}`)[0]?.classList.add(A_T);
  });

  return (
    <>
      <div class="main-nav">
        <For each={TabContents}>
          {(item) => (
            <button class={`tabs tab-${item.tabname}`} onClick={[TabClick, item.tabname]}>
              {item.tabname}
            </button>
          )}
        </For>
      </div>
      <div class="main-content">
        {() => {
          let x =
            TabContents.find((item) => item.tabname === activeTab()) ||
            TabContents.find((item) => item.tabname === DEFAULT_TAB);
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
