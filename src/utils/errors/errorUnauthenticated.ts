export class ErrorUnauthenticated extends Error {
  constructor(message?: string) {
    super(message || "Unauthenticated");
  }
}