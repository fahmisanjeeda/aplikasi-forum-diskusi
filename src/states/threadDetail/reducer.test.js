/**
 * skenario pengujian
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the detailThread when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return the threadDetail with new comment when given by ADD_COMMENT action
 *  - should return the threadDetail with toggled upvote thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action
 *  - should return the threadDetail with toggled upvote comment when given by TOGGLE_UP_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // act
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const fakeDetailThread = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        detailThread: fakeDetailThread,
      },
    };

    // act
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(fakeDetailThread);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // act
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the threadDetail with new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      comments: [],
    };
    const fakeComment = {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2023-05-29T08:55:52.266Z',
      owner: {
        id: 'users-2',
        name: 'Jane Doe',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: fakeComment,
      },
    };

    // act
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([fakeComment]);
  });

  it('should return the threadDetail with toggled upvote thread when given by TOGGLE_UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // act
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toContain('user-1');
  });

  it('should return the threadDetail with toggled upvote comment when given by TOGGLE_UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      comments: [
        {
          id: 'comment-1',
          content: 'Ini komentar',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // act
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user-1');
  });
});

