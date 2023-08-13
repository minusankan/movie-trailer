 //Number formating for votes
 export function formatVoteCount(count) {
  if (count < 1_000) return `${count}`;
  if (count < 1_000_000) return `${(count / 1_000).toFixed(1)}K`;
  return `${(count / 1_000_000).toFixed(2)}M`;
}