export default function (error: unknown) {
  if (error instanceof Error) return error.message;
}
