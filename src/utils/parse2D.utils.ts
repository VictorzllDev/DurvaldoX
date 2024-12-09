export function parse2D(data: number[]) {
  const rows = []
  for (let i = 0; i < data.length; i += 16) {
    rows.push(data.slice(i, i + 16))
  }
  return rows
}
