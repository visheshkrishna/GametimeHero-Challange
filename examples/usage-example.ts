import { LoggerService } from "../src/services/logger.service";
import { RsvpService } from "../src/services/rsvp.service";
import { RsvpStatus } from "../src/types";

// Create a logger instance
const logger = new LoggerService();

// Create the RSVP service with dependency injection
const rsvpService = new RsvpService(logger);

// Sample players
const players = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
  { id: '3', name: 'Bob Johnson' },
  { id: '4', name: 'Alice Brown' }
];

// Add RSVPs for players
console.log('Adding RSVPs for players...');
rsvpService.addOrUpdateRsvp(players[0], RsvpStatus.YES);
rsvpService.addOrUpdateRsvp(players[1], RsvpStatus.NO);
rsvpService.addOrUpdateRsvp(players[2], RsvpStatus.YES);
rsvpService.addOrUpdateRsvp(players[3], RsvpStatus.MAYBE);

// Get confirmed attendees
console.log('\nConfirmed Attendees:');
const confirmedAttendees = rsvpService.getConfirmedAttendees();
confirmedAttendees.forEach(player => {
  console.log(`- ${player.name} (ID: ${player.id})`);
});

// Get RSVP counts
console.log('\nRSVP Counts:');
const counts = rsvpService.getRsvpCounts();
console.log(`Total RSVPs: ${counts.total}`);
console.log(`Confirmed: ${counts.confirmed}`);
console.log(`Declined: ${counts.declined}`);
console.log(`Maybe: ${counts.maybe}`);

// Get all RSVPs
console.log('\nAll RSVPs:');
const allRsvps = rsvpService.getAllRsvps();
allRsvps.forEach(rsvp => {
  console.log(`- ${rsvp.player.name}: ${rsvp.status} (Updated: ${rsvp.updatedAt.toLocaleString()})`);
});

// Update an RSVP
console.log('\nUpdating an RSVP...');
rsvpService.addOrUpdateRsvp(players[1], RsvpStatus.YES);

// Get updated confirmed attendees
console.log('\nUpdated Confirmed Attendees:');
const updatedConfirmedAttendees = rsvpService.getConfirmedAttendees();
updatedConfirmedAttendees.forEach(player => {
  console.log(`- ${player.name} (ID: ${player.id})`);
});

// Get updated RSVP counts
console.log('\nUpdated RSVP Counts:');
const updatedCounts = rsvpService.getRsvpCounts();
console.log(`Total RSVPs: ${updatedCounts.total}`);
console.log(`Confirmed: ${updatedCounts.confirmed}`);
console.log(`Declined: ${updatedCounts.declined}`);
console.log(`Maybe: ${updatedCounts.maybe}`);