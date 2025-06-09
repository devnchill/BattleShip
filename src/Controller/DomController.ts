class DomController {
  async getName(): Promise<string> {
    const dialog = document.querySelector("dialog");
    return new Promise((resolve) => {
      dialog?.addEventListener(
        "close",
        () => {
          const input = document.getElementById(
            "name-input",
          ) as HTMLInputElement;
          resolve(input?.value.trim());
          document.querySelector("form")?.reset();
        },
        { once: true },
      );
      dialog?.showModal();
    });
  }
}

export default DomController;
