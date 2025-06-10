import bgAudio from "../audio/bg.mp3";
import { ICell } from "../Types/GameBoard.Types";
import PlayerType from "../Types/Player.Types";
import DomBoard from "../Ui/DomBoard";
class DomController {
  private static MAIN: HTMLElement | null = document.querySelector("main");
  private speakerIcon?: HTMLElement | null;
  private audio?: HTMLAudioElement;
  private humanDomBoard: DomBoard;
  private aiDomBoard: DomBoard;

  constructor() {
    this.speakerIcon = document.querySelector(".music-toggle-icon");
    this.audio = new Audio(bgAudio);
    this.audio.loop = true;
    this.humanDomBoard = new DomBoard(PlayerType.HUMAN);
    this.aiDomBoard = new DomBoard(PlayerType.AI);
    this.attachMusicToggle();
    this.placeHumanBoard();
    this.placeAiBoard();
    this.restartGame();
    this.attachHelpListener();
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

  setName(name: string) {
    const humanLabel = document.querySelector(".human-label");
    if (!humanLabel) {
      throw new Error("Human Label not found in setName in DomController");
    }
    humanLabel.textContent = `${name} (You)`;
  }

  private toggleMusic(): void {
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

  private placeHumanBoard(): void {
    if (!DomController.MAIN) throw new Error("Main Not Found");
    const wrapper = document.createElement("div");
    wrapper.classList.add("board-wrapper");
    const label = document.createElement("p");
    label.classList.add("player-label");
    label.classList.add("human-label");
    label.textContent = "Captain (You)";
    wrapper.appendChild(this.humanDomBoard.createBoard());
    wrapper.appendChild(label);
    DomController.MAIN.appendChild(wrapper);
    this.humanDomBoard.resetDomBoard();
  }

  private placeAiBoard(): void {
    if (!DomController.MAIN) throw new Error("Main Not Found");
    const wrapper = document.createElement("div");
    wrapper.classList.add("board-wrapper");
    const label = document.createElement("p");
    label.classList.add("player-label");
    label.textContent = "Enemy AI";
    wrapper.appendChild(this.aiDomBoard.createBoard());
    wrapper.appendChild(label);
    DomController.MAIN.appendChild(wrapper);
    this.aiDomBoard.resetDomBoard();
  }

  getClickedCoordinates(board: HTMLDivElement): Promise<[number, number]> {
    return new Promise((resolve) => {
      board.addEventListener(
        "click",
        (e: Event) => {
          const target = e.target as HTMLElement;
          if (!target.classList.contains("grid-cell")) return;
          const xStr = target.dataset.row;
          const yStr = target.dataset.column;
          if (!xStr || !yStr) return;
          const x = parseInt(xStr);
          const y = parseInt(yStr);
          console.log("Clicked DOM Cell:", { x, y });
          console.log("Target Element:", target);
          resolve([x, y]);
        },
        { once: true },
      );
    });
  }

  syncBoards(humanLogicBoard: ICell[][], aiLogicBoard: ICell[][]): void {
    this.humanDomBoard.syncBoard(humanLogicBoard);
    this.aiDomBoard.syncBoard(aiLogicBoard);
  }

  syncHumanBoard(humanLogicBoard: ICell[][]): void {
    this.humanDomBoard.syncBoard(humanLogicBoard);
  }

  syncAiBoard(aiLogicBoard: ICell[][]): void {
    this.aiDomBoard.syncBoard(aiLogicBoard);
  }

  declareWinner(player: PlayerType, name: string): void {
    const dialog = document.getElementById(
      "winner-dialog",
    ) as HTMLDialogElement;
    const text = document.getElementById("winner-text");
    if (!text) {
      throw new Error(
        "Winner text not found when looking to display winner in declareWinner method of DomController",
      );
    }
    if (player === PlayerType.HUMAN) {
      text.textContent = `🏆 Captain ${name}, You Won`;
    } else {
      text.textContent = `💥 AI Conquered the Seas Try Again.`;
    }
    dialog.showModal();
  }

  private restartGame(): void {
    const restartButton = document.getElementById("play-again");
    restartButton?.addEventListener("click", () => window.location.reload());
  }

  private showHelpMenu(): void {
    const helpDialog = document.getElementById(
      "help-dialog",
    ) as HTMLDialogElement;
    const closeBtn = document.getElementById("close-help");
    if (!helpDialog || !closeBtn) {
      throw new Error("Help dialog or close button not found");
    }
    helpDialog.showModal();
    closeBtn.addEventListener(
      "click",
      () => {
        helpDialog.close();
      },
      { once: true },
    );
  }

  attachHelpListener(): void {
    const helpBtn = document.querySelector(".help-icon");
    helpBtn?.addEventListener("click", () => this.showHelpMenu());
  }
}
export default DomController;
