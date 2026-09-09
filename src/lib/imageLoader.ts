export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith('/')) return src;
  const urlWithoutProtocol = src.replace(/^https?:\/\//, '');
  return `https://wsrv.nl/?url=${encodeURIComponent(urlWithoutProtocol)}&w=${width}&q=${quality || 75}&output=webp`;
}
