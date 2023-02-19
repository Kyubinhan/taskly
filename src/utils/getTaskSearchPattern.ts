/**
 * construct a regular expression for filtering out tasks by given keyword(s)
 *
 * reference: https://levelup.gitconnected.com/use-regex-and-javascript-to-improve-search-results-870932050d08
 *
 * @param search a string that user inputs
 * @returns a RegExp object to be matched against
 */
export const getTaskSearchPattern = (search: string) => {
  const pattern = search
    .split("")
    .map((x) => {
      return `(?=.*${x})`
    })
    .join("")

  return new RegExp(pattern, "gi")
}
