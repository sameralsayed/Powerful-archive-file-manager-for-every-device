// Set current year in footer
$(function () {
  const yearSpan = $("#year");
  const now = new Date();
  yearSpan.text(now.getFullYear());
});

// Smooth scroll for internal links
$(document).on("click", 'a[href^="#"]', function (e) {
  const targetId = $(this).attr("href");
  if (targetId.length > 1 && $(targetId).length) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $(targetId).offset().top - 72
      },
      600
    );
  }
});

// Simulated archive actions
function buildSummary(action, files, level) {
  const list = files
    .split(",")
    .map((f) => f.trim())
    .filter((f) => f.length > 0);

  if (!list.length) {
    return "Please enter at least one file name to simulate an action.";
  }

  const count = list.length;
  let ratioHint = "No compression (store).";
  if (level === "fast") ratioHint = "Fast compression, good for speed.";
  if (level === "normal") ratioHint = "Balanced compression for daily use.";
  if (level === "max") ratioHint = "Maximum compression, may take longer.";

  return [
    `Action: ${action}`,
    `Files: ${count}`,
    `Compression level: ${level}`,
    `Hint: ${ratioHint}`,
    "",
    "Sample list:",
    list.slice(0, 5).join(", ")
  ].join("\n");
}

$("#demoCompressBtn").on("click", function () {
  const files = $("#demoFiles").val();
  const level = $("#demoLevel").val();
  const resultBox = $("#demoResult");

  const summary = buildSummary("Create archive", files, level);
  resultBox
    .text(summary)
    .removeClass("text-warning")
    .addClass("text-success");
});

$("#demoExtractBtn").on("click", function () {
  const files = $("#demoFiles").val();
  const level = $("#demoLevel").val();
  const resultBox = $("#demoResult");

  const summary = buildSummary("Extract archive", files, level);
  resultBox
    .text(summary)
    .removeClass("text-warning")
    .addClass("text-success");
});
