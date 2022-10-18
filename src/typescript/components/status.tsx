import { createResource, Show } from "solid-js";
import { render } from "solid-js/web";

interface IComment {
  html_url: string;
  created_at: string;
  body: string;
}

const IssueNum = 24; //prev 10, now changed to 24 to prevent bad response

const StatusLoading = () => (
  <div id="status-loading">
    <p class="status-content">Fetching Status with GitHub API....</p>
  </div>
);

const App = () => {
  const [commentsAPI] = createResource<IComment[]>(async () => {
    let statusStore = sessionStorage.getItem("status");

    if (statusStore) {
      return JSON.parse(statusStore);
    }

    let res = await fetch(`https://api.github.com/repos/U-C-S/u-c-s.github.io/issues/${IssueNum}/comments`);
    return res.json();
  });

  return (
    <>
      <Show when={commentsAPI()?.slice(-1)[0]} fallback={<StatusLoading />}>
        {(status) => {
          sessionStorage.setItem("status", JSON.stringify(commentsAPI()));
          return (
            <>
              {/* <p class="status-content">{status.body}</p> */}
              <p>A new v3 site is currently being developed. It might take some time. Check my github profile for more info</p>
              <div class="status-meta">
                <p>
                  <a href={status.html_url}>Dynamic_Status</a> - Updated On: {status.created_at.substring(0, 10)}
                </p>
              </div>
            </>
          );
        }}
      </Show>
    </>
  );
};

render(App, document.getElementById("dynamic-status") as HTMLElement);
