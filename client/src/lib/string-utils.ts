// Adapted from https://stackoverflow.com/questions/20070158/string-format-not-work-in-typescript
export function interpolate(
  inputString: string,
  ...replacements: string[]
): string {
  // Regex: capture instancees of "{#}", then change to corresponding replacement
  return inputString.replace(/{(\d+)}/g, function (match, number) {
    return typeof replacements[number] != 'undefined'
      ? replacements[number]
      : match;
  });
}
