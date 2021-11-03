import { JSX } from "solid-js";

/**
 * For Parsing the Github REST API's list of user public Events
 * @param activity A Event Object from the list
 */
export function EventParse(activity: ghEventApi): JSX.Element {
  let repoURL = activity.repo.url.replace("api", "www").replace("/repos", "");

  let post_Info = (
    <>
      {Ahref(repoURL, activity.repo.name)}
      <span> ({EventTimeInfo(activity.created_at)})</span>
    </>
  );

  let action = activity.payload.action?.charAt(0).toUpperCase() + activity.payload.action?.slice(1);

  // https://github.com/thelittlewonder/gitstalk/blob/master/src/components/Profile.vue#L324
  // Ordered according to https://docs.github.com/en/developers/webhooks-and-events/events/github-event-types

  let EventType: Record<string, () => JSX.Element> = {
    CreateEvent: () => (
      <>
        Created a {activity.payload.ref_type} {post_Info}
      </>
    ),

    DeleteEvent: () => (
      <>
        Deleted {activity.payload.ref_type} {activity.payload.ref} from {post_Info}
      </>
    ),

    ForkEvent: () => (
      <>
        Forked {Ahref(activity.payload.forkee.html_url, activity.payload.forkee.full_name)} from {post_Info}
      </>
    ),

    IssueCommentEvent: () => (
      <>
        {action} {Ahref(activity.payload.comment.html_url, "comment")} on an issue in {post_Info}
      </>
    ),

    IssuesEvent: () => (
      <>
        {action} {Ahref(activity.payload.issue.html_url, "issue")} in {post_Info}
      </>
    ),

    PublicEvent: () => <>{post_Info} is made public</>,

    PullRequestEvent: () => (
      <>
        {action} {Ahref(activity.payload.pull_request.html_url, "pull request")} in {post_Info}
      </>
    ),

    PullRequestReviewCommentEvent: () => (
      <>
        {action} {Ahref(activity.payload.comment.html_url, "comment")} on a pull request in {post_Info}
      </>
    ),

    PushEvent: () => <>Commits in {post_Info}</>,

    ReleaseEvent: () => (
      <>
        Released {activity.payload.release.tag_name} in {post_Info}
      </>
    ),

    WatchEvent: () => <>Starred {post_Info}</>,

    _default: () => <>Some event at {post_Info}</>,
  };

  return (EventType[activity.type] || EventType._default)();
}

function Ahref(link: string, text: string) {
  return <a href={link}>{text}</a>;
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
