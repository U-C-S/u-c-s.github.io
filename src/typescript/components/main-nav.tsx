import { createEffect, createSignal, For, JSX } from "solid-js";
import { render } from "solid-js/web";

import GhEventsComponent from "./gh-events";
import URLparams from "../utils/url-params";

// solid-tabs
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
  let [activeTab, __setActiveTab] = createSignal(URLparams.get("tab") || DEFAULT_TAB);

  function setActiveTab(name: string) {
    URLparams.add("tab", name);
    __setActiveTab(name);
  }

  function wheelEvent() {
    let ci = TabContents.findIndex((tab) => tab.tabname === activeTab());
    if (ci === -1) return;
    // console.log(ci, TabContents.length);

    TabContents.length == ci + 1 ? setActiveTab(TabContents[0].tabname) : setActiveTab(TabContents[ci + 1].tabname);
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
            <button class={`tabs tab-${item.tabname}`} onClick={[setActiveTab, item.tabname]}>
              {item.tabname}
            </button>
          )}
        </For>
      </div>
      <div class="main-content" onWheel={wheelEvent}>
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
