const fs = require('fs');

const files = [
  'src/app/page.tsx',
  'src/app/article/[slug]/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find avatar line
  const regex = /avatar: wpPost\.author\?\.node\?\.avatar\?\.url \|\| 'https:\/\/images\.unsplash\.com\/photo-1594824461971-05d9c362140a\?auto=format&fit=crop&q=80&w=150&h=150',/g;
  
  content = content.replace(regex, `avatar: (wpPost.author?.node?.avatar?.url && !wpPost.author.node.avatar.url.includes('d=mm')) ? wpPost.author.node.avatar.url : 'https://images.unsplash.com/photo-1594824461971-05d9c362140a?auto=format&fit=crop&q=80&w=150&h=150',`);
  
  fs.writeFileSync(file, content);
  console.log('Patched avatar in', file);
});
