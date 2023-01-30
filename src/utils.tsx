export function getMetadataValue<T>(
  metadata: any,
  key: string,
  alternateValue?: string | number
): string | null {
  if (metadata) {
    const metaValue = metadata?.filter(
      (meta: { key: string }) => meta?.key === key
    )[0]?.value;
    if (!metaValue && alternateValue !== undefined && alternateValue !== null)
      return alternateValue.toString();
    return metaValue;
  }
  return null;
}

export const parseJson = (value: any) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
