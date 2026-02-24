export function randomCode(): string {
  return String(Math.floor(Math.random() * (999999 - 100000) + 100000));
}
