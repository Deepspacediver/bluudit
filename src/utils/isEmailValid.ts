export default function isEmailValid(email: string = "") {
  const emailRegex = new RegExp(`[a-z0-9]+@[a-z]+.[a-z]{2,3}`);
  return emailRegex.test(email);
}
