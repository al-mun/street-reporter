async function loadIssueDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    console.error("No issue ID provided");
    return;
  }

  const issueDetailsContainer = document.getElementById(
    "issue-details-container"
  );

  try {
    const response = await fetch(`/api/issues/${id}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const issue = await response.json();
    const data = issue.issue
    issueDetailsContainer.innerHTML = `
  <h2>${data.title}</h2>
  <p>${data.description}</p>
  <div class="issue-meta">
    <span class="issue-meta-label">Category:</span>
    <span class="issue-meta-value">${data.category}</span>
    <span class="issue-meta-label">Status:</span>
    <span class="issue-meta-value">${data.status}</span>
    <span class="issue-meta-label">Created:</span>
    <span class="issue-meta-value">${new Date(data.createdAt).toLocaleString()}</span>
  </div>
`;
  } catch (error) {
    console.error(error.message);
    issueDetailsContainer.innerHTML = `<p class="error">Failed to load issue details</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadIssueDetails);