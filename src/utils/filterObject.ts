export function filterObject<T extends object, S extends keyof T>(
  obj: T,
  schemaKeys: S[],
): Pick<T, S> {
  return schemaKeys.reduce(
    (acc, key) => {
      if (obj[key] !== undefined) {
        acc[key] = obj[key]
      }
      return acc
    },
    {} as Pick<T, S>,
  )
}
