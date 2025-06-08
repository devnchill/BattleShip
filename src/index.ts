const dialog = document.querySelector("dialog");
dialog?.showModal();
dialog?.addEventListener("close", () => {
  console.log(
    (document.getElementById("name-input") as HTMLInputElement).value.trim(),
  );
});
