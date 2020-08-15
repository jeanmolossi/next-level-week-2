export default function convertMinutesToHourString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const minutesRest = minutes % 60;

  const hoursString = `${hours.toString().padStart(2, '0')}`;
  const minutesString = `${minutesRest.toString().padStart(2, '0')}`;

  return `${hoursString}:${minutesString}`;
}
