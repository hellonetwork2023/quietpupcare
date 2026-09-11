const WP_GRAPHQL_URL = 'https://amaz.quietpupcare.com/graphql';

async function test() {
  const query = `
    query GetAllPosts {
      posts(first: 1) {
        nodes {
          title
          content
        }
      }
    }
  `;
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
    body: JSON.stringify({ query })
  });
  
  const json = await res.json();
  const content = json.data.posts.nodes[0].content;
  console.log("Title:", json.data.posts.nodes[0].title);
  
  // Extract all img tags
  const imgMatches = content.match(/<img[^>]+>/g);
  if (imgMatches) {
    imgMatches.forEach(img => console.log(img));
  } else {
    console.log("No images found in content.");
  }
}
test();
