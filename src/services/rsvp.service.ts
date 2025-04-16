import { Player, RsvpEntry, RsvpStatus, RsvpCounts } from '../types';
import { ILoggerService } from './logger.service';

/**
 * Interface for RSVP service
 */
export interface IRsvpService {
  addOrUpdateRsvp(player: Player, status: RsvpStatus): RsvpEntry;
  getConfirmedAttendees(): Player[];
  getRsvpCounts(): RsvpCounts;
  getAllRsvps(): RsvpEntry[];
}

/**
 * Service for managing player RSVPs
 */
export class RsvpService implements IRsvpService {
  private rsvpEntries: Map<string, RsvpEntry> = new Map();
  
  constructor(private logger: ILoggerService) {
    this.logger.info('RSVP Service initialized');
  }

  /**
   * Add a new RSVP or update an existing one
   * @param player The player to add/update
   * @param status The RSVP status
   * @returns The created or updated RSVP entry
   */
  addOrUpdateRsvp(player: Player, status: RsvpStatus): RsvpEntry {
    if (!player || !player.id) {
      this.logger.error('Invalid player provided');
      throw new Error('Player must have a valid ID');
    }

    if (!Object.values(RsvpStatus).includes(status)) {
      this.logger.error(`Invalid RSVP status: ${status}`);
      throw new Error(`Invalid RSVP status. Must be one of: ${Object.values(RsvpStatus).join(', ')}`);
    }

    const entry: RsvpEntry = {
      player,
      status,
      updatedAt: new Date()
    };

    this.rsvpEntries.set(player.id, entry);
    this.logger.info(`RSVP ${this.rsvpEntries.has(player.id) ? 'updated' : 'added'} for player ${player.name}`);
    
    return entry;
  }

  /**
   * Get a list of all players who have confirmed attendance
   * @returns Array of players with "Yes" RSVP status
   */
  getConfirmedAttendees(): Player[] {
    return Array.from(this.rsvpEntries.values())
      .filter(entry => entry.status === RsvpStatus.YES)
      .map(entry => entry.player);
  }

  /**
   * Get counts of RSVPs by status
   * @returns Object with total, confirmed, declined, and maybe counts
   */
  getRsvpCounts(): RsvpCounts {
    const entries = Array.from(this.rsvpEntries.values());
    
    return {
      total: entries.length,
      confirmed: entries.filter(entry => entry.status === RsvpStatus.YES).length,
      declined: entries.filter(entry => entry.status === RsvpStatus.NO).length,
      maybe: entries.filter(entry => entry.status === RsvpStatus.MAYBE).length
    };
  }

  /**
   * Get all RSVP entries
   * @returns Array of all RSVP entries
   */
  getAllRsvps(): RsvpEntry[] {
    return Array.from(this.rsvpEntries.values());
  }
}