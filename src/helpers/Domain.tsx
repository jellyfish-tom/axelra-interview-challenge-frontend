export const getDomain = () => {
  if (isProduction()) {
    // TODO: insert prod url
    return '';
  }
  return 'http://localhost:27017';
};

const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};
