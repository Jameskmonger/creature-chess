import * as fs from "fs";
import * as path from "path";
import { log } from "@creature-chess/shared/log";

type GameMetric = {
  startTimeMs: number;
  players: {
    id: string;
    name: string;
    isBot: boolean;
  }[];
  round: number;
  winner: string;
  durationMs: number;
};

// flush metrics every 5mins
const METRIC_FLUSH_FREQUENCY_MS = 5 * 60 * 1000;

export class Metrics {
  private unflushedGames: GameMetric[] = [];
  private metricFolder: string;

  constructor() {
    const { METRIC_FOLDER } = process.env;

    if (!METRIC_FOLDER) {
      log(`METRIC_FOLDER not set, not logging metrics`);
      return;
    }

    log(`Storing metrics in: ${METRIC_FOLDER}`);
    this.metricFolder = METRIC_FOLDER;

    setInterval(() => {
      this.flush();
    }, METRIC_FLUSH_FREQUENCY_MS);

    this.flush();
  }

  public addGame(metric: GameMetric) {
    this.unflushedGames.push(metric);
  }

  public async flush() {
    await this.createMetricsFolderIfRequired(this.metricFolder);

    const metricPath = path.join(this.metricFolder, `${this.getCurrentDate()}.json`);

    try {
      const existingMetrics = await this.getExistingMetrics(metricPath);

      while (this.unflushedGames.length > 0) {
        const game = this.unflushedGames.pop();

        existingMetrics.push(game);
      }

      fs.writeFile(metricPath, JSON.stringify(existingMetrics), (err3) => {
        if (err3) {
          console.error("Error when writing metric file", metricPath);
          console.error(err3);
          return;
        }

        log("Metrics written successfully.");
      });
    } catch (e) {
      console.error("Error flushing metrics", e, metricPath);
    }
  }

  private getCurrentDate() {
    const date = new Date();
    const month = date.getMonth().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${date.getFullYear()}-${month}-${day}`;
  }

  private createMetricsFolderIfRequired(folderPath: string) {
    return new Promise<void>((resolve, reject) => {
      fs.mkdir(folderPath, 0o766, err => {
        if (err) {
          if (err.code === "EEXIST") {
            // ignore the error if the folder already exists
            resolve();
            return;
          }

          reject(err);
          return;
        }

        log(`Metrics folder created ${folderPath}`);
        resolve();
      });
    });
  }

  private getExistingMetrics(metricPath: string): Promise<GameMetric[]> {
    return new Promise<GameMetric[]>((resolve, reject) => {
      fs.access(metricPath, fs.constants.F_OK, (err) => {
        if (err) {
          if (err.code === "ENOENT") {
            log(`No metrics file found at ${metricPath}`);
            resolve([]);
            return;
          }

          reject(err);
          return;
        }

        fs.readFile(metricPath, "utf-8", (err2, data) => {
          if (err2) {
            reject(err2);
            return;
          }

          const existingMetrics: GameMetric[] = JSON.parse(data);
          resolve(existingMetrics);
        });
      });
    });
  }
}
