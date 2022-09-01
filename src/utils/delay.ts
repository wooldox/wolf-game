/**
 * Delay script execution
 * @param ms miliseconds to wait
 */
export const delay = (ms: number) => {
  new Promise((resolve) => setTimeout(resolve, ms));
};
