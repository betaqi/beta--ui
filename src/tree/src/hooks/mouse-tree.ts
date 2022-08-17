export function mouseTree() {
  const onMouseover = (e: MouseEvent) => {
    // e.target instanceof HTMLDivElement &&
    //   (e.target.style.backgroundColor = '#eceded')
  }
  const onMouseout = (e: MouseEvent) => {
    // e.target instanceof HTMLDivElement && (e.target.style.backgroundColor = '')
  }
  return {
    onMouseover,
    onMouseout
  }
}
