export function parse2D(data: number[], blockCountPerRow: number) {
  const rows: number[][] = []
  for (let i = 0; i < data.length; i += blockCountPerRow) {
    rows.push([1, ...data.slice(i, i + blockCountPerRow), 1])
  }
  rows.push([...Array(blockCountPerRow).fill(1)])
  rows.unshift([...Array(blockCountPerRow).fill(1)])

  return rows
}
