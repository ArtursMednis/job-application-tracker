export function getPropertyIfExists(
  obj: unknown,
  key: string
): unknown | undefined {
  if (typeof obj === "object" && obj !== null && key in obj) {
    return (obj as Record<string, unknown>)[key];
  }
  return undefined;
}

export function getStringPropertyIfExists(
  obj: unknown,
  key: string
): string | undefined {
  if (
    typeof obj === "object" &&
    obj !== null &&
    key in obj &&
    typeof (obj as Record<string, unknown>)[key] === "string"
  ) {
    return (obj as Record<string, unknown>)[key] as string;
  }
  return undefined;
}
