export function EventParse(activity: ghEventApi) {
  let repoURL = activity.repo.url.replace("api", "www").replace("/repos", "");
  let repoAnchor = `<a href="${repoURL}">${activity.repo.name}</a>`;

  let action = activity.payload.action?.slice(0);

  switch (activity.type) {
    case "PushEvent":
      return `commits in ${repoAnchor}`;

    case "WatchEvent":
      return `Starred ${repoAnchor}`;

    case "CreateEvent": {
      let output = "Created a " + activity.payload.ref_type + " ";
      if (activity.payload.ref_type === "branch") {
        let link = `${repoURL}/tree/${activity.payload.ref}`;
        output += `<a href="${link}">activity.payload.ref</a> in ${repoAnchor}`;
      } else {
        output += repoAnchor;
      }
      return output;
    }

    case "DeleteEvent":
      return `Deleted a ${activity.payload.ref_type} ${activity.payload.ref} from ${repoAnchor}`;

    case "ForkEvent":
      return `Forked a repo ${repoAnchor} to <a href="${activity.payload.forkee.html_url}">${activity.payload.forkee.full_name}</a>`;

    case "PullRequestEvent":
      return `${action} a <a href="${activity.payload.pull_request.html_url}">pull request</a> in ${repoAnchor}`;

    case "PullRequestReviewCommentEvent":
      return `${action} a <a href="${activity.payload.comment.html_url}">comment</a> on their pull request in ${repoAnchor}`;

    case "IssuesEvent":
      return `${action} a <a href="${activity.payload.issue.html_url}">issue</a> in ${repoAnchor}`;

    case "IssueCommentEvent":
      return `${action} <a href="${activity.payload.comment.html_url}">a comment</a> on an issue in ${repoAnchor}`;

    default:
      return `Unknown Event at ${repoAnchor}`;
  }
}
