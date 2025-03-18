export function emailValidator(email: string): string {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Please fill in this field.";
  if (!re.test(email)) return "Please enter a valid email address!";
  return "";
}