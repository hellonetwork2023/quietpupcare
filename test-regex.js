async function run() {
  const query = `
    query GetPostBySlug($id: ID!) {
      post(id: $id, idType: SLUG) {
        content
      }
    }
  `;
  const res = await fetch('https://amaz.quietpupcare.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: "dog-separation-anxiety-training-program" } })
  });
  const json = await res.json();
  const content = json.data.post.content;
  
  // Print the lines containing 'hostinger'
  const lines = content.split('\n');
  lines.forEach((line) => {
    if (line.includes('hostinger')) {
      console.log(line);
    }
  });
}
run();
