import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://jsonplaceholder.typicode.com/posts?_limit=5';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

export function PostsReactQuery() {
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    retry: false,
  });

  if (isError) {
    return (
      <div className="rounded border border-red-400 bg-red-100 p-4 text-red-800">
        <h2 className="font-bold">Failed to load posts</h2>
        <p className="mt-2">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <button
          onClick={() => refetch()}
          className="mt-4 rounded border border-red-600 px-4 py-2 hover:bg-red-200"
        >
          Try again
        </button>
      </div>
    );
  }

  if (isLoading || !data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Posts</h1>

      {data.map((post) => (
        <article key={post.id} className="rounded border p-4">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="mt-2">{post.body}</p>
        </article>
      ))}
    </div>
  );
}