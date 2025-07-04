document.addEventListener("DOMContentLoaded", () => {
  const youtubeUrlInput = document.getElementById("youtubeUrl");
  const extractBtn = document.getElementById("extractBtn");
  const loadingDiv = document.getElementById("loading");
  const errorDiv = document.getElementById("error");
  const metadataResultDiv = document.getElementById("metadataResult");

  const titleSpan = document.getElementById("title");
  const descriptionSpan = document.getElementById("description");
  const keywordsSpan = document.getElementById("keywords");
  const tagsSpan = document.getElementById("tags");
  const thumbnailImg = document.getElementById("thumbnail");
  const downloadBtn = document.getElementById("downloadBtn");
  const downloadThumbnailBtn = document.getElementById("downloadThumbnailBtn");

  extractBtn.addEventListener("click", async (e) => {
    // Open affiliate link in new tab
    window.open(
      "https://www.profitableratecpm.com/k1dpx687p4?key=e0e9a4901c8c23b25d71804a3ebf8c01",
      "_blank"
    );

    const youtubeUrl = youtubeUrlInput.value.trim();

    // Clear previous results and errors
    metadataResultDiv.classList.add("hidden");
    errorDiv.classList.add("hidden");
    errorDiv.textContent = "";
    downloadBtn.classList.add("hidden"); // Hide download button initially
    downloadThumbnailBtn.classList.add("hidden");

    if (!youtubeUrl) {
      errorDiv.textContent = "Please enter a YouTube URL.";
      errorDiv.classList.remove("hidden");
      return;
    }

    loadingDiv.classList.remove("hidden");

    try {
      const response = await fetch("/extract-metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        titleSpan.textContent = data.title || "N/A";
        descriptionSpan.textContent = data.description || "N/A";
        keywordsSpan.textContent = data.keywords.join(", ") || "N/A";
        tagsSpan.textContent = data.tags.join(", ") || "N/A";
        if (data.thumbnailUrl) {
          thumbnailImg.src = data.thumbnailUrl;
          thumbnailImg.alt = data.title || "Video Thumbnail";
        } else {
          thumbnailImg.src = "";
          thumbnailImg.alt = "";
        }
        metadataResultDiv.classList.remove("hidden");
        downloadBtn.classList.remove("hidden"); // Show download button on success
        downloadThumbnailBtn.classList.remove("hidden");
        // Ensure downloadBtn has correct metadata
        downloadBtn.dataset.metadata = JSON.stringify(data);
      } else {
        errorDiv.textContent = data.error || "An unknown error occurred.";
        errorDiv.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      errorDiv.textContent =
        "Failed to connect to the server. Please try again later.";
      errorDiv.classList.remove("hidden");
    } finally {
      loadingDiv.classList.add("hidden");
    }
  });

  downloadBtn.addEventListener("click", () => {
    // Open affiliate link in new tab
    window.open(
      "https://www.profitableratecpm.com/k1dpx687p4?key=e0e9a4901c8c23b25d71804a3ebf8c01",
      "_blank"
    );
    const metadata = JSON.parse(downloadBtn.dataset.metadata);
    const filename = "youtube_metadata.txt";
    const txtContent = `Title: ${metadata.title || "N/A"}
Description: ${metadata.description || "N/A"}
Keywords: ${
      metadata.keywords && metadata.keywords.length > 0
        ? metadata.keywords.join(", ")
        : "N/A"
    }
Tags: ${
      metadata.tags && metadata.tags.length > 0
        ? metadata.tags.join(", ")
        : "N/A"
    }
`;
    const blob = new Blob([txtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  downloadThumbnailBtn.addEventListener("click", () => {
    // Open affiliate link in new tab
    window.open(
      "https://www.profitableratecpm.com/k1dpx687p4?key=e0e9a4901c8c23b25d71804a3ebf8c01",
      "_blank"
    );
    const thumbnailUrl = thumbnailImg.src;
    if (thumbnailUrl) {
      const a = document.createElement("a");
      a.href = thumbnailUrl;
      a.download = "thumbnail.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  });
});
