import { createFileRoute } from '@tanstack/react-router'
import { getPost } from '../api/blog/getPost'
import { Postpage } from '../components/templates/Postpage'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const { postId } = params
    return await getPost(postId)
  },
  component: Post
})

function Post() {
  const post = Route.useLoaderData().data

  return (
    <Postpage post={post} />
  )
}