/**
 * skenario pengujian
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when create thread success
 *  - should dispatch action and call alert correctly when create thread failed
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersAction } from '../users/action';
import {
  asyncPopulateUsersAndThreads,
  asyncAddThread,
  receiveThreadsAction,
  addThreadAction,
} from './action';

const fakeUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeNewThread = {
  id: 'thread-2',
  title: 'Thread Kedua',
  body: 'Ini adalah thread kedua',
  category: 'React',
  createdAt: '2023-05-29T08:55:52.266Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsers);
    api.getAllThreads = () => Promise.resolve(fakeThreads);
    const dispatch = vi.fn();

    // act
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersAction(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsAction(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // act
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when create thread success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeNewThread);
    const dispatch = vi.fn();

    // act
    const result = await asyncAddThread({
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'React',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadAction(fakeNewThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toEqual(fakeNewThread);
  });

  it('should dispatch action and call alert correctly when create thread failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // act & assert
    await expect(
      asyncAddThread({
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'React',
      })(dispatch)
    ).rejects.toThrow(fakeErrorResponse);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});

