const form = document.getElementById("report-form");
const photoInput = document.getElementById("photoInput");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  let base64Image = null;

  // Convert image to base64 if provided
  if (photoInput.files.length > 0) {
    const file = photoInput.files[0];
    base64Image = await convertToBase64(file);
  }

  const newIssue = {
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    status: "Submitted",
    photo: base64Image,
    createdAt: new Date(),
  };

  await fetch("/api/issues", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newIssue),
  });

  window.location.href = "/"; // go back to homepage
});

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}