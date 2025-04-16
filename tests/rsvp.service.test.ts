import { Player, RsvpStatus } from '../src/types';
import { LoggerService } from '../src/services/logger.service';
import { RsvpService } from '../src/services/rsvp.service';

describe('RsvpService', () => {
  let rsvpService: RsvpService;
  let logger: LoggerService;

  beforeEach(() => {
    logger = new LoggerService();
    // Spy on logger methods to avoid console output during tests
    jest.spyOn(logger, 'log').mockImplementation(() => {});
    jest.spyOn(logger, 'info').mockImplementation(() => {});
    jest.spyOn(logger, 'warn').mockImplementation(() => {});
    jest.spyOn(logger, 'error').mockImplementation(() => {});
    
    rsvpService = new RsvpService(logger);
  });

  const createTestPlayer = (id: string, name: string): Player => ({
    id,
    name
  });

  test('should add a new RSVP entry', () => {
    const player = createTestPlayer('1', 'John Doe');
    const entry = rsvpService.addOrUpdateRsvp(player, RsvpStatus.YES);
    
    expect(entry.player).toBe(player);
    expect(entry.status).toBe(RsvpStatus.YES);
    expect(entry.updatedAt).toBeInstanceOf(Date);
  });

  test('should update an existing RSVP entry', () => {
    const player = createTestPlayer('1', 'John Doe');
    rsvpService.addOrUpdateRsvp(player, RsvpStatus.YES);
    const updatedEntry = rsvpService.addOrUpdateRsvp(player, RsvpStatus.NO);
    
    expect(updatedEntry.player).toBe(player);
    expect(updatedEntry.status).toBe(RsvpStatus.NO);
  });

  test('should get confirmed attendees', () => {
    const player1 = createTestPlayer('1', 'John Doe');
    const player2 = createTestPlayer('2', 'Jane Smith');
    const player3 = createTestPlayer('3', 'Bob Johnson');
    
    rsvpService.addOrUpdateRsvp(player1, RsvpStatus.YES);
    rsvpService.addOrUpdateRsvp(player2, RsvpStatus.NO);
    rsvpService.addOrUpdateRsvp(player3, RsvpStatus.YES);
    
    const confirmedAttendees = rsvpService.getConfirmedAttendees();
    
    expect(confirmedAttendees).toHaveLength(2);
    expect(confirmedAttendees).toContain(player1);
    expect(confirmedAttendees).toContain(player3);
    expect(confirmedAttendees).not.toContain(player2);
  });

  test('should get RSVP counts', () => {
    const player1 = createTestPlayer('1', 'John Doe');
    const player2 = createTestPlayer('2', 'Jane Smith');
    const player3 = createTestPlayer('3', 'Bob Johnson');
    const player4 = createTestPlayer('4', 'Alice Brown');
    
    rsvpService.addOrUpdateRsvp(player1, RsvpStatus.YES);
    rsvpService.addOrUpdateRsvp(player2, RsvpStatus.NO);
    rsvpService.addOrUpdateRsvp(player3, RsvpStatus.YES);
    rsvpService.addOrUpdateRsvp(player4, RsvpStatus.MAYBE);
    
    const counts = rsvpService.getRsvpCounts();
    
    expect(counts.total).toBe(4);
    expect(counts.confirmed).toBe(2);
    expect(counts.declined).toBe(1);
    expect(counts.maybe).toBe(1);
  });

  test('should throw error for invalid player', () => {
    expect(() => {
      rsvpService.addOrUpdateRsvp({} as Player, RsvpStatus.YES);
    }).toThrow('Player must have a valid ID');
  });

  test('should get all RSVPs', () => {
    const player1 = createTestPlayer('1', 'John Doe');
    const player2 = createTestPlayer('2', 'Jane Smith');
    
    rsvpService.addOrUpdateRsvp(player1, RsvpStatus.YES);
    rsvpService.addOrUpdateRsvp(player2, RsvpStatus.NO);
    
    const allRsvps = rsvpService.getAllRsvps();
    
    expect(allRsvps).toHaveLength(2);
  });
});