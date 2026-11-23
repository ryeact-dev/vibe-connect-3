/** Parse "[text](url)" markup into parts. Shared by React and the prerender plugin. */
export type InlinePart = { text: string; href?: string };

export function parseInline(s: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) parts.push({ text: s.slice(last, m.index) });
    parts.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < s.length) parts.push({ text: s.slice(last) });
  return parts;
}
