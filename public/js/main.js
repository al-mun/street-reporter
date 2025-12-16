async function getIssues() {
  const url = "/api/issues";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const issuesContainer = document.getElementById("issues-container");

    for (let i = 0; i < result.length; i++) {
      const card = document.createElement("div");
      card.classList.add("issue-card");
      issuesContainer.append(card);
      const id = result[i].id;
      card.setAttribute("data-id", id);
      card.addEventListener("click", (e) => {
        window.location.href = `/issue.html?id=${id}`;
      });
      const status = result[i].status;
      card.innerHTML = `<h3>${result[i].title}</h3>
      <p>${result[i].description}</p>
      <p class='status ${status.toLowerCase()}'>${status}</p>`;
    }
  } catch (error) {
    console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getIssues();
});
