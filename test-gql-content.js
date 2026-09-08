async function run() {
  const query = `
    query GetPostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        content
      }
    }
  `;
  const res = await fetch('https://amaz.quietpupcare.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: "dog-separation-anxiety-training-program-what-to-look-for", idType: "SLUG" } })
  });
  const json = await res.json();
  console.log(json.data.post.content);
}
run();
