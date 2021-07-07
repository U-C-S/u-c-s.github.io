export function EventParse(activity) {
    var _a, _b;
    let dayOfEvent = ` <span>(${EventTimeInfo(activity.created_at)})<span>`;
    let repoURL = activity.repo.url.replace("api", "www").replace("/repos", "");
    let post_Info = Ahref(repoURL, activity.repo.name) + dayOfEvent;
    let action = ((_a = activity.payload.action) === null || _a === void 0 ? void 0 : _a.charAt(0).toUpperCase()) + ((_b = activity.payload.action) === null || _b === void 0 ? void 0 : _b.slice(1));
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
            }
            else {
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
function Ahref(link, text) {
    return `<a href="${link}">${text}</a>`;
}
function EventTimeInfo(t) {
    let eventTime = new Date(t);
    let now = new Date();
    let timeSinceEvent = now.getTime() - eventTime.getTime();
    let timeSinceToday = now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
    let days = timeSinceEvent / 86400000;
    let todayCondition = timeSinceEvent <= timeSinceToday;
    if (todayCondition)
        return "Today";
    else if (!todayCondition && days < 2)
        return "Yesterday";
    else if (days > 60)
        return Math.floor(days / 30) + " Months ago";
    else
        return days + " Days ago";
}
