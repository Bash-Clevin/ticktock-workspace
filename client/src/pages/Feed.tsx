import { useEffect, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useQuery } from '@apollo/client';
import { GetPostsDocument, Post } from '../gql/generated';
import PostFeed from '../components/PostFeed';

const Feed = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, fetchMore } = useQuery(GetPostsDocument, {
    variables: { skip: 0, take: 2 },
  });

  const loadMorePosts = async () => {
    try {
      await fetchMore({
        variables: {
          skip: data?.getPosts.length || 0,
          take: 2,
        },
        // updateQuery: (prev, { fetchMoreResult }) => {
        //   if (!fetchMoreResult) return prev;
        //   const newPosts = fetchMoreResult.getPosts.filter(
        //     (newPost) => !prev.getPosts.some((post) => post.id === newPost.id),
        //   );
        //   return {
        //     getPosts: [...prev.getPosts, ...newPosts],
        //   };
        // },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 1 },
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMorePosts]);
  return (
    <MainLayout>
      <div className="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
        {data?.getPosts.map((post: Post) => (
          <PostFeed key={post.id} post={post} />
        ))}
        <div className="h-20" ref={loadMoreRef}></div>
      </div>
    </MainLayout>
  );
};

export default Feed;
