export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

export function addModuleVersion(content: string, rev?: string) {
  // Add selected version to cliffy module imports.
  if (rev) {
    return content
      .replace(
        /https:\/\/deno\.land\/x\/cliffy\//g,
        `https://deno.land/x/cliffy@${rev}/`,
      )
      .replace(
        /https:\/\/deno\.land\/x\/cliffy@<version>\//g,
        `https://deno.land/x/cliffy@${rev}/`,
      )
      .replace(
        /https:\/\/x\.nest\.land\/cliffy@<version>\//g,
        `https://x.nest.land/cliffy@${rev}/`,
      )
      .replace(
        /https:\/\/raw\.githubusercontent\.com\/c4spar\/deno-cliffy\/<version>\//g,
        `https://raw.githubusercontent.com/c4spar/deno-cliffy/${rev}/`,
      );
  }

  return content;
}
