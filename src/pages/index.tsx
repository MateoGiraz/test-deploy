import { GetServerSideProps } from 'next'

const POSTS_API = 'https://jsonplaceholder.typicode.com/posts'

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface HomeProps {
  posts: Post[]
}

export const getServerSideProps = (async () => {
  const posts = await fetch(POSTS_API)
  const parsedPosts = await posts.json() as Post[]

  return {
    props: {
      posts: parsedPosts,
    },
  }
}) satisfies GetServerSideProps<HomeProps>

export default function Home({ posts }: HomeProps): JSX.Element {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-gray-600">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
