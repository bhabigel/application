const API_BASE = 'https://api.cassini-org.info';

export function getImageUrl(path: string): string {
  if (!path) return '';
  
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Remove any leading slashes
  const cleanPath = path.replace(/^\/+/, '');
  
  return `${API_BASE}/uploads/${cleanPath}`;
}