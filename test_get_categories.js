const WP_GRAPHQL_URL = 'https://amaz.quietpupcare.com/graphql';

async function test() {
  const query = `
    query GetAllPosts {
      posts(first: 3) {
        nodes {
          title
          categories {
            nodes {
              slug
              name
            }
          }
        }
      }
    }
  `;
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT)'
    },
    body: JSON.stringify({ query })
  });
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}
test();
