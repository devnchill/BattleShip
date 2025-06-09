import bgAudio from "../audio/bg.mp3";
class DomController {
  private speakerIcon?: HTMLElement | null;
  private audio?: HTMLAudioElement;

  constructor() {
    this.speakerIcon = document.querySelector(".music-toggle-icon");
    this.audio = new Audio(bgAudio);
    this.audio.loop = true;

    this.attachMusicToggle();
  }

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

  toggleMusic(): void {
    if (!this.audio || !this.speakerIcon) return;

    if (this.audio.paused) {
      this.audio.play();
      this.speakerIcon.classList.remove("fa-volume-xmark");
      this.speakerIcon.classList.add("fa-volume-high");
    } else {
      this.audio.pause();
      this.speakerIcon.classList.remove("fa-volume-high");
      this.speakerIcon.classList.add("fa-volume-xmark");
    }
  }

  private attachMusicToggle(): void {
    if (!this.speakerIcon) {
      throw new Error("speakerIcon not found");
    }
    this.speakerIcon?.addEventListener("click", () => this.toggleMusic());
  }
}
export default DomController;
