/**
 * For Parsing the Github REST API's list of user public Events
 * @param activity A Event Object from the list
 * @returns The Event in a sentence
 */
export function EventParse(activity: ghEventApi) {
  let dayOfEvent = ` <span>(${EventTimeInfo(activity.created_at)})<span>`;
  let repoURL = activity.repo.url.replace("api", "www").replace("/repos", "");
  let post_Info = Ahref(repoURL, activity.repo.name) + dayOfEvent;

  let action = activity.payload.action?.charAt(0).toUpperCase() + activity.payload.action?.slice(1);

  //Source: https://github.com/thelittlewonder/gitstalk/blob/master/src/components/Profile.vue#L324
  switch (activity.type) {
    case "PushEvent":
      return `Commits in ${post_Info}`;

    case "WatchEvent":
      return `Starred ${post_Info}`;

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

    case "PullRequestEvent":
      return `${action} ${Ahref(activity.payload.pull_request.html_url, "pull request")} in ${post_Info}`;

    case "PullRequestReviewCommentEvent":
      return `${action} ${Ahref(activity.payload.comment.html_url, "comment")} on a pull request in ${post_Info}`;

    case "IssuesEvent":
      return `${action} ${Ahref(activity.payload.issue.html_url, "issue")} in ${post_Info}`;

    case "IssueCommentEvent":
      return `${action} ${Ahref(activity.payload.comment.html_url, "comment")} on an issue in ${post_Info}`;

    default:
      return `Unknown Event at ${post_Info}`;
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
  else return days + " Days ago";
}
