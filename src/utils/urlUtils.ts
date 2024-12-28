export const getLastElementUrl = (url: string) => {
  // URLをスラッシュ（/）で分割して最後の要素を取得
  const parts = url.split('/').filter(Boolean); // 空の要素を除外
  return parts[parts.length - 1];
}