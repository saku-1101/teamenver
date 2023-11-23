'use client';

import {
  SCOPE_ACTIVE_COMMENT,
  useCommentReplies,
} from '@udecode/plate-comments';
import React from 'react';

import { CommentItem } from './comment-item';

export function CommentReplyItems() {
  const commentReplies = useCommentReplies(SCOPE_ACTIVE_COMMENT);

  return (
    <>
      {Object.keys(commentReplies).map((id) => (
        <CommentItem key={id} commentId={id} />
      ))}
    </>
  );
}
