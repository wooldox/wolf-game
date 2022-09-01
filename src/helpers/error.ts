/* eslint-disable no-console */
import axios, { AxiosError } from 'axios';

/**
 * Handle request error gracefully
 * @param error received error
 */
export const handleError = (error: AxiosError | Error | string) => {
  if (axios.isAxiosError(error)) {
    console.log('error message: ', error.message);
    return null;
  } else {
    console.log('unexpected error: ', error);
    return null;
  }
};
