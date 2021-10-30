(() => {
  // src/typescript/utils/github-api.ts
  var USER_NAME = "U-C-S";
  (async () => {
    const listElement = document.getElementById("git-events");
    const QUERY_NUM = "5";
    let github_api_url = new URL(`https://api.github.com/users/${USER_NAME}/events/public`);
    github_api_url.searchParams.append("per_page", QUERY_NUM);
    let fetchRes = await fetch(github_api_url.toString());
    let ResponseJson = await fetchRes.json();
    let listElems = "";
    ResponseJson.forEach((x) => listElems += "<li>" + EventParse(x) + "</li>");
    listElement.innerHTML = listElems;
  })();
  (async () => {
    const StatusElement = document.getElementById("my-status");
    let issueApi = await fetch(`https://api.github.com/repos/${USER_NAME}/${USER_NAME.toLowerCase()}.github.io/issues/10/comments`);
    let resJson = await issueApi.json();
    let status = resJson[resJson.length - 1].body;
    console.log(status);
    StatusElement.innerHTML = status;
  })();
  function EventParse(activity) {
    var _a, _b;
    let dayOfEvent = ` <span>(${EventTimeInfo(activity.created_at)})<span>`;
    let repoURL = activity.repo.url.replace("api", "www").replace("/repos", "");
    let post_Info = Ahref(repoURL, activity.repo.name) + dayOfEvent;
    let action = ((_a = activity.payload.action) == null ? void 0 : _a.charAt(0).toUpperCase()) + ((_b = activity.payload.action) == null ? void 0 : _b.slice(1));
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
  function Ahref(link, text) {
    return `<a href="${link}">${text}</a>`;
  }
  function EventTimeInfo(t) {
    let eventTime = new Date(t);
    let now = new Date();
    let timeSinceEvent = now.getTime() - eventTime.getTime();
    let timeSinceToday = now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime();
    let days = timeSinceEvent / 864e5;
    let todayCondition = timeSinceEvent <= timeSinceToday;
    if (todayCondition)
      return "Today";
    else if (!todayCondition && days < 2)
      return "Yesterday";
    else if (days > 60)
      return Math.floor(days / 30) + " Months ago";
    else
      return Math.floor(days) + " Days ago";
  }

  // src/typescript/index.ts
  console.log("site-version: 2.1.0");
  var URLparams = {
    url: new URL(window.location.toString()),
    add: function(key, value) {
      let { url } = this;
      url.searchParams.set(key, value);
      window.history.replaceState({}, document.title, url.toString());
    },
    get: function(key) {
      return this.url.searchParams.get(key);
    }
  };
  (async () => {
    const ACTIVE_TAB = "activetab";
    const AboutTabs = document.getElementsByClassName("tabs");
    const AboutContent = document.getElementById("main-content");
    let def_Tab;
    let param_Tab;
    let tabParam = URLparams.get("tab");
    for (let i = 0; i < AboutTabs.length; i++) {
      const tab = AboutTabs[i];
      let temp_data = tab.dataset.tempid;
      const templ = document.getElementById(`templ-${temp_data}`);
      tab.addEventListener("click", () => {
        var _a;
        if (!tab.classList.contains(ACTIVE_TAB)) {
          (_a = document.getElementsByClassName(ACTIVE_TAB)[0]) == null ? void 0 : _a.classList.remove(ACTIVE_TAB);
          tab.classList.add(ACTIVE_TAB);
          let x = templ.cloneNode(true);
          AboutContent.innerHTML = "";
          AboutContent.appendChild(x);
          URLparams.add("tab", temp_data);
        }
      });
      if (tabParam == temp_data) {
        param_Tab = tab;
      } else if (tab.dataset.defopen) {
        def_Tab = tab;
      }
    }
    if (param_Tab)
      param_Tab.click();
    else
      def_Tab == null ? void 0 : def_Tab.click();
  })();
})();
