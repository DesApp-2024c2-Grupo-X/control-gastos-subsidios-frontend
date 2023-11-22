export default function getEnvironment() {
  return process.env.REACT_APP_API_URL || process.REACT_APP_API_URL;
}
