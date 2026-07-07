// Handles MUI icon modules across different bundler interop shapes.
export function muiIcon(iconModule) {
  return iconModule?.default?.default || iconModule?.default || iconModule
}
