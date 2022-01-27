import { TabContents } from "./main-nav";

const Main = (props: any) => {
  return (
    <div>
      <h2 class="tab-content-heading">{props.heading}</h2>
      {props.children}
    </div>
  );
};

export const TabMain = (props: any) => {
  let x = TabContents.find((item) => item.heading === props.activetab);
  console.log(x?.heading);

  return (
    <div>
      <h2 class="tab-content-heading">{props.activetab}</h2>
      {() => TabContents.find((item) => item.heading === props.activetab)?.Content}
    </div>
  );
};
