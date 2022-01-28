import { createResource, Show } from "solid-js";
import { render } from "solid-js/web";

interface IComment {
  html_url: string;
  created_at: string;
  body: string;
}

const App = () => {
  const [commentsAPI] = createResource<IComment[]>(async () => {
    let statusStore = sessionStorage.getItem("status");

    if (statusStore) {
      return JSON.parse(statusStore);
    }

    let res = await fetch(`https://api.github.com/repos/U-C-S/u-c-s.github.io/issues/10/comments`);
    return res.json();
  });

  return (
    <>
      <Show when={commentsAPI()?.slice(-1)[0]} fallback={<p>Getting Status...</p>}>
        {(status) => {
          sessionStorage.setItem("status", JSON.stringify(commentsAPI()));
          return (
            <>
              <p class="status-content">{status.body}</p>
              <div class="status-meta">
                <a href={status.html_url}>Dynamic_Status</a>
                <p>Updated On: {status.created_at.substring(0, 10)}</p>
              </div>
            </>
          );
        }}
      </Show>
    </>
  );
};

render(App, document.getElementById("dynamic-status") as HTMLElement);
