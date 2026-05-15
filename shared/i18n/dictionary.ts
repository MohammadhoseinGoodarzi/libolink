import en from "@/messages/en.json";

type Messages = typeof en;
type Namespace = keyof Messages;

// Matches next-intl's getTranslations() signature exactly.
// When adding next-intl, replace this file's body with:
//   export { getTranslations as getDictionary } from "next-intl/server";
export async function getDictionary<N extends Namespace>(namespace: N) {
  const section = en[namespace];
  return <K extends keyof typeof section>(key: K): string =>
    String(section[key]);
}
