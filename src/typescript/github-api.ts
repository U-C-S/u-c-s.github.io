interface ghEventApi {
  repo: { name: string; url: string };
  type: string;
  payload: { action: string; ref: string; ref_type: string };
}

function unnamed(activity: ghEventApi) {
  let output;
  let repoURL;
  switch (activity.type) {
    case "PushEvent":
      output = `commits in ${repoURL}`;
      break;

    case "WatchEvent":
      output = `Starred a repo ${repoURL}`;
      break;

    case "CreateEvent":
      output = "Created a " + activity.payload.ref_type + " ";
      if (activity.payload.ref_type === "branch") {
        output +=
          '<a href="' +
          this.cleanURL(activity.repo.url) +
          "/tree/" +
          activity.payload.ref +
          '">' +
          activity.payload.ref +
          "</a>" +
          " in " +
          repoURL;
      } else {
        output += repoURL;
      }
      break;

    case "DeleteEvent":
      output = `Deleted a ${activity.payload.ref_type} ${activity.payload.ref} from ${repoURL}`;
      break;

    case "ForkEvent":
      output =
        "Forked a repo " +
        repoURL +
        " to " +
        '<a href="' +
        activity.payload.forkee.html_url +
        '">' +
        activity.payload.forkee.full_name +
        "</a>";
      break;

    case "PullRequestEvent":
      output =
        activity.payload.action.charAt(0).toUpperCase() +
        activity.payload.action.slice(1) +
        " a " +
        '<a href="' +
        activity.payload.pull_request.html_url +
        '">' +
        " pull request " +
        "</a>" +
        " in " +
        repoURL;
      break;

    case "PullRequestReviewCommentEvent":
      output =
        activity.payload.action.charAt(0).toUpperCase() +
        activity.payload.action.slice(1) +
        " a " +
        '<a href="' +
        activity.payload.comment.html_url +
        '">' +
        "comment" +
        "</a>" +
        " on their pull request in " +
        repoURL;
      break;

    case "IssuesEvent":
      output =
        activity.payload.action.charAt(0).toUpperCase() +
        activity.payload.action.slice(1) +
        " an " +
        '<a href="' +
        activity.payload.issue.html_url +
        '">' +
        " issue " +
        "</a>" +
        " in " +
        repoURL;
      break;

    case "IssueCommentEvent":
      output =
        activity.payload.action.charAt(0).toUpperCase() +
        activity.payload.action.slice(1) +
        " " +
        '<a href="' +
        activity.payload.comment.html_url +
        '">' +
        "a comment" +
        "</a>" +
        " on an issue in " +
        repoURL;
      break;

    default:
      return false;
  }
}
