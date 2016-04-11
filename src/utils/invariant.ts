export default function invariant (assertion: any, msg: string): void {
  if (!assertion) throw new Error(msg);
}
