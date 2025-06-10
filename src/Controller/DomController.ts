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

  private placeAiBoard(): void {
    if (!DomController.MAIN) {
      throw new Error("Main Not Found");
    }
    DomController.MAIN.appendChild(this.aiDomBoard.createBoard());
    this.aiDomBoard.resetDomBoard();
  }

  private placeHumanBoard(): void {
    if (!DomController.MAIN) {
      throw new Error("Main Not Found");
    }
    DomController.MAIN.appendChild(this.humanDomBoard.createBoard());
    this.humanDomBoard.resetDomBoard();
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

  declareWinner(player: PlayerType): void {
    if (player === PlayerType.HUMAN) {
      // create popup saying human won
    } else {
      // create popup saying ai won
    }
  }
}
export default DomController;
