const WP_GRAPHQL_URL = 'https://amaz.quietpupcare.com/graphql';

async function test() {
  const query = `
    query GetAllPosts {
      posts(first: 10) {
        nodes {
          id
          slug
          title
        }
      }
    }
  `;
  const res = await fetch(WP_GRAPHQL_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    },
    body: JSON.stringify({ query })
  });
  
  const json = await res.json();
  console.log(JSON.stringify(json, null, 2));
}

test();
