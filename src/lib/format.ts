export function getInitials(name: string): string {
  if (!name.trim()) return '';

  const words = name.trim().split(/\s+/);
  const firstInitial = words[0]?.charAt(0) || '';
  const lastInitial =
    words.length > 1 ? words[words.length - 1]?.charAt(0) : '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
}
