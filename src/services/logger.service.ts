/**
 * Interface for logger service
 */
export interface ILoggerService {
  log(message: string): void;
  error(message: string, error?: Error): void;
  warn(message: string): void;
  info(message: string): void;
}

/**
 * Implementation of logger service
 */
export class LoggerService implements ILoggerService {
  log(message: string): void {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string, error?: Error): void {
    console.error(`[ERROR]: ${message}`, error || '');
  }

  warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  info(message: string): void {
    console.info(`[INFO]: ${message}`);
  }
}