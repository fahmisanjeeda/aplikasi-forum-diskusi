/**
 * skenario pengujian
 *
 * - VoteButton component
 *  - should render upvote and downvote count correctly
 *  - should highlight upvote button when current user has upvoted
 *  - should highlight downvote button when current user has downvoted
 *  - should call onUpVote callback when upvote button is clicked
 *  - should call onDownVote callback when downvote button is clicked
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VoteButton from './VoteButton';

describe('VoteButton component', () => {
  it('should render upvote and downvote count correctly', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId={null}
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );

    // assert
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should highlight upvote button when current user has upvoted', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );

    const upvoteBtn = screen.getByTitle('Batalkan Upvote');

    // assert
    expect(upvoteBtn).toBeInTheDocument();
  });

  it('should highlight downvote button when current user has downvoted', () => {
    // arrange
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={['user-1']}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />
    );

    const downvoteBtn = screen.getByTitle('Batalkan Downvote');

    // assert
    expect(downvoteBtn).toBeInTheDocument();
  });

  it('should call onUpVote callback when upvote button is clicked', async () => {
    // arrange
    const mockOnUpVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={mockOnUpVote}
        onDownVote={() => {}}
      />
    );
    const upvoteBtn = screen.getByTitle('Upvote');

    // act
    await userEvent.click(upvoteBtn);

    // assert
    expect(mockOnUpVote).toHaveBeenCalledTimes(1);
  });

  it('should call onDownVote callback when downvote button is clicked', async () => {
    // arrange
    const mockOnDownVote = vi.fn();
    render(
      <VoteButton
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={mockOnDownVote}
      />
    );
    const downvoteBtn = screen.getByTitle('Downvote');

    // act
    await userEvent.click(downvoteBtn);

    // assert
    expect(mockOnDownVote).toHaveBeenCalledTimes(1);
  });
});

