import { format } from 'date-fns';
import { useState } from 'react';

import { CloseIcon } from '~/components/ui/icons';
import type { PostData } from '~/libs/types';
import { cn } from '~/libs/utils';
import { getCardColor, getCardNoise } from '~/utils/post.utils';

export default function PostList({
  posts,
  tags,
}: {
  posts: PostData[];
  tags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.data.tags?.includes(selectedTag))
    : posts;

  return (
    <>
      {tags.length > 0 && (
        <TagFilter
          tags={tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      )}
      <PostGrid posts={filteredPosts} />
    </>
  );
}

function TagFilter({
  tags,
  selectedTag,
  setSelectedTag,
}: {
  tags: string[];
  selectedTag?: string;
  setSelectedTag: (tag: string | undefined) => void;
}) {
  const hasSelected = selectedTag !== undefined;

  function handleSelectTag(tag: string) {
    if (hasSelected && selectedTag === tag) {
      setSelectedTag(undefined);
    } else {
      setSelectedTag(tag);
    }
  }

  return (
    <div className="relative my-14 border-l pl-4">
      <div className="absolute -left-16 select-none">
        <span className="-mx-1 inline-block rounded-md px-1">Tags</span>
      </div>
      <div className="flex gap-2">
        {tags.map((tag) => (
          <div key={tag} className="inline-block">
            <button
              className={cn(
                'link group-hover:opacity-60 hover:opacity-100!',
                hasSelected && selectedTag === tag && 'opacity-100!',
                hasSelected && selectedTag !== tag && 'opacity-40!',
              )}
              onClick={() => handleSelectTag(tag)}
            >
              {tag}
            </button>
          </div>
        ))}
        {hasSelected && (
          <button
            className="text-text-2 hover:text-text-1 p-1 transition"
            onClick={() => setSelectedTag(undefined)}
          >
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
}

function PostGrid({ posts }: { posts: PostData[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}

function PostCard({ post, index }: { post: PostData; index: number }) {
  const color = getCardColor(index);
  const noise = getCardNoise(index);
  const initials = post.data.title
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();

  return (
    <a href={`/posts/${post.slug}`} className="group block">
      <div
        className="relative mb-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl transition group-hover:brightness-110"
        style={{ background: color }}
      >
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{
            backgroundImage: `url(${noise})`,
            backgroundSize: '300px 300px',
            opacity: 1,
          }}
        />
        <span className="relative z-10 text-2xl font-bold text-white/80 select-none">
          {initials}
        </span>
      </div>
      <p className="text-text-1 line-clamp-2 text-sm leading-snug font-semibold group-hover:underline">
        {post.data.title}
      </p>
      <p className="text-text-2 mt-1 text-xs">
        {format(new Date(post.data.date), 'MMM d, yyyy')}
      </p>
    </a>
  );
}
