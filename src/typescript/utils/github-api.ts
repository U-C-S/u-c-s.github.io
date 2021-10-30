const USER_NAME = "U-C-S";

// For the showing a list of my recent Github public events
(async () => {
  //In Future, Place this div somewhere. For Ex: (In a new Nav-Section: Updates) or (Bottom of About)
  const listElement = <HTMLElement>document.getElementById("git-events");
  const QUERY_NUM = "5";

  let github_api_url = new URL(`https://api.github.com/users/${USER_NAME}/events/public`);
  github_api_url.searchParams.append("per_page", QUERY_NUM);

  let fetchRes = await fetch(github_api_url.toString());
  let ResponseJson: ghEventApi[] = await fetchRes.json();
  let listElems = "";

  ResponseJson.forEach((x) => (listElems += "<li>" + EventParse(x) + "</li>"));

  listElement.innerHTML = listElems;

  //End of IIFE
})();

// Status Feature
(async () => {
  const StatusElement = <HTMLDivElement>document.getElementById("my-status");

  let issueApi = await fetch(`https://api.github.com/repos/${USER_NAME}/${USER_NAME.toLowerCase()}.github.io/issues/10/comments`);
  let resJson = await issueApi.json();
  let status = resJson[resJson.length - 1].body;

  // let markdownApi = await fetch(`https://api.github.com/markdown`, {
  //   method: "POST",
  //   body: JSON.stringify({ text: status }),
  // });
  // let markdownRes = await markdownApi.text();

  console.log(status);
  StatusElement.innerHTML = status;
})();

/**
 * For Parsing the Github REST API's list of user public Events
 * @param activity A Event Object from the list
 * @returns The Event in a sentence
 */
function EventParse(activity: ghEventApi) {
  let dayOfEvent = ` <span>(${EventTimeInfo(activity.created_at)})<span>`;
  let repoURL = activity.repo.url.replace("api", "www").replace("/repos", "");
  let post_Info = Ahref(repoURL, activity.repo.name) + dayOfEvent;

  let action = activity.payload.action?.charAt(0).toUpperCase() + activity.payload.action?.slice(1);

  // https://github.com/thelittlewonder/gitstalk/blob/master/src/components/Profile.vue#L324
  // Ordered according to https://docs.github.com/en/developers/webhooks-and-events/events/github-event-types
  switch (activity.type) {
    case "CreateEvent": {
      let output = "Created a " + activity.payload.ref_type + " ";

      if (activity.payload.ref_type === "branch") {
        let link = `${repoURL}/tree/${activity.payload.ref}`;
        output += `${Ahref(link, activity.payload.ref)} in ${post_Info}`;
      } else {
        output += post_Info;
      }
      return output;
    }

    case "DeleteEvent":
      return `Deleted ${activity.payload.ref_type} ${activity.payload.ref} from ${post_Info}`;

    case "ForkEvent":
      return `Forked ${Ahref(activity.payload.forkee.html_url, activity.payload.forkee.full_name)} from ${post_Info}`;

    case "IssueCommentEvent":
      return `${action} ${Ahref(activity.payload.comment.html_url, "comment")} on an issue in ${post_Info}`;

    case "IssuesEvent":
      return `${action} ${Ahref(activity.payload.issue.html_url, "issue")} in ${post_Info}`;

    case "PublicEvent":
      return `${post_Info} is made public`;

    case "PullRequestEvent":
      return `${action} ${Ahref(activity.payload.pull_request.html_url, "pull request")} in ${post_Info}`;

    case "PullRequestReviewCommentEvent":
      return `${action} ${Ahref(activity.payload.comment.html_url, "comment")} on a pull request in ${post_Info}`;

    case "PushEvent":
      return `Commits in ${post_Info}`;

    case "ReleaseEvent":
      return `Released ${activity.payload.release.tag_name} in ${post_Info}`;

    case "WatchEvent":
      return `Starred ${post_Info}`;

    default:
      return `Some event at ${post_Info}`;
  }
}

function Ahref(link: string, text: string) {
  return `<a href="${link}">${text}</a>`;
}

function EventTimeInfo(t: string) {
  //ref1: https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
  //ref2: https://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
  //ref3: https://stackoverflow.com/questions/10944396/how-to-calculate-ms-since-midnight-in-javascript

  let eventTime = new Date(t);
  let now = new Date();
  let timeSinceEvent = now.getTime() - eventTime.getTime();
  let timeSinceToday = now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
  //console.log(timeSinceEvent, timeSinceToday);

  let days = timeSinceEvent / 86400000;
  let todayCondition = timeSinceEvent <= timeSinceToday;

  if (todayCondition) return "Today";
  else if (!todayCondition && days < 2) return "Yesterday";
  else if (days > 60) return Math.floor(days / 30) + " Months ago";
  else return Math.floor(days) + " Days ago";
}
