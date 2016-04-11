export default function invariant(assertion, msg) {
    if (!assertion)
        throw new Error(msg);
}
