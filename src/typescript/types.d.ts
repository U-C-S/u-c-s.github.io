type payload = {
  action: string;
  ref: string;
  ref_type: string;
  forkee: {
    html_url: string;
    full_name: string;
  };
  issue: { html_url: string };
  comment: { html_url: string };
  pull_request: { html_url: string };
};

interface ghEventApi {
  created_at: string;
  repo: { name: string; url: string };
  type: string;
  payload: payload;
}
