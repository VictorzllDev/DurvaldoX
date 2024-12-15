export function parse2D(data: number[], blockCountPerRow: number) {
  const rows = []
  for (let i = 0; i < data.length; i += blockCountPerRow) {
    rows.push(data.slice(i, i + blockCountPerRow))
  }
  return rows
}
