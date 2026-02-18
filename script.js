const year = document.querySelector("#year");
const copyEmailButton = document.querySelector("[data-copy-email]");
const contactEmail = "hello@lokeshphotos.com";

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (copyEmailButton) {
  const defaultLabel = copyEmailButton.textContent;
  copyEmailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      copyEmailButton.textContent = "Email Copied";
      setTimeout(() => {
        copyEmailButton.textContent = defaultLabel;
      }, 1400);
    } catch (error) {
      window.location.href = `mailto:${contactEmail}`;
    }
  });
}
