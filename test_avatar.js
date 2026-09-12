const WP_GRAPHQL_URL = 'https://amaz.quietpupcare.com/graphql';

async function test() {
  const query = `
    query GetAllPosts {
      posts(first: 1) {
        nodes {
          author {
            node {
              avatar {
                url
              }
            }
          }
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
  console.log(json.data.posts.nodes[0].author.node.avatar.url);
}
test();
