export function slugify(text: string) {
  if (text === undefined) return ''
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function formatDate(date: number) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC'
  })
}

export function formatBlogPosts(
  posts: any[],
  { filterOutDrafts = true, filterOutFuturePosts = true, sortByDate = true, limit = 10 } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter

    if (filterOutDrafts && draft) return acc

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc

    // add post to acc
    acc.push(post)

    return acc
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort(
      (a: any, b: any) =>
        (new Date(b.frontmatter.date) as any) - (new Date(a.frontmatter.date) as any)
    )
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === 'number') {
    return filteredPosts.slice(0, limit)
  }
  
  return filteredPosts
}
