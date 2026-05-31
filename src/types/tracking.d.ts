/**
 * Meta Pixel (fbq) global type declarations
 */
interface Window {
  fbq: (
    command: string,
    action: string,
    options?: Record<string, unknown>,
  ) => void;
  _fbq?: unknown;
}
