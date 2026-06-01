export const getErrorMessage = (err, defaultMessage) => {
  if (err.response?.data?.detail) {
    if (typeof err.response.data.detail === 'string') {
      return err.response.data.detail;
    }
    if (Array.isArray(err.response.data.detail)) {
      return err.response.data.detail[0]?.msg || defaultMessage;
    }
  }
  return defaultMessage;
};
