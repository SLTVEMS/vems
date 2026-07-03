export function muiIcon(iconModule) {
  return iconModule?.default?.default || iconModule?.default || iconModule
}
