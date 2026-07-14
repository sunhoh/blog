import { format } from 'date-fns';
import { useState } from 'react';

import { CloseIcon } from '~/components/ui/icons';
import type { PostData } from '~/libs/types';
import { cn } from '~/libs/utils';

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: PostData }) {
  return (
    <a
      href={`/posts/${post.slug}`}
      className="group flex h-32 flex-col justify-between rounded-xl border-neutral-200 bg-neutral-50 p-4 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800/60 dark:hover:bg-neutral-800"
    >
      <div>
        <p className="text-text-1 line-clamp-2 text-base leading-snug font-bold group-hover:underline">
          {post.data.title}
        </p>
        {post.data.description && (
          <p className="text-text-2 mt-1.5 line-clamp-1 text-sm leading-relaxed">
            {post.data.description}
          </p>
        )}
      </div>
      <p className="mt-4 text-xs font-medium text-orange-500">
        {format(new Date(post.data.date), 'EEE MMM dd yyyy')}
      </p>
    </a>
  );
}
