function applyVote(entity, { userId, voteType }) {
  if (!entity || !userId) {
    return entity;
  }

  const upVotesBy = entity.upVotesBy ? [...entity.upVotesBy] : [];
  const downVotesBy = entity.downVotesBy ? [...entity.downVotesBy] : [];

  if (voteType === 1 || voteType === 'UP_VOTE') {
    return {
      ...entity,
      upVotesBy: upVotesBy.includes(userId)
        ? upVotesBy
        : upVotesBy.concat([userId]),
      downVotesBy: downVotesBy.filter((id) => id !== userId),
    };
  }

  if (voteType === -1 || voteType === 'DOWN_VOTE') {
    return {
      ...entity,
      downVotesBy: downVotesBy.includes(userId)
        ? downVotesBy
        : downVotesBy.concat([userId]),
      upVotesBy: upVotesBy.filter((id) => id !== userId),
    };
  }

  if (voteType === 0 || voteType === 'NEUTRALIZE') {
    return {
      ...entity,
      upVotesBy: upVotesBy.filter((id) => id !== userId),
      downVotesBy: downVotesBy.filter((id) => id !== userId),
    };
  }

  return entity;
}

function determineVoteAction(entity, userId, targetVoteType) {
  if (!entity || !userId) {
    return { nextVoteType: 0, rollbackVoteType: 0 };
  }

  const isUpvoted = entity.upVotesBy ? entity.upVotesBy.includes(userId) : false;
  const isDownvoted = entity.downVotesBy ? entity.downVotesBy.includes(userId) : false;

  if (targetVoteType === 1) {
    const nextVoteType = isUpvoted ? 0 : 1;
    const rollbackVoteType = isUpvoted ? 1 : (isDownvoted ? -1 : 0);
    return { nextVoteType, rollbackVoteType };
  }

  if (targetVoteType === -1) {
    const nextVoteType = isDownvoted ? 0 : -1;
    const rollbackVoteType = isDownvoted ? -1 : (isUpvoted ? 1 : 0);
    return { nextVoteType, rollbackVoteType };
  }

  return { nextVoteType: 0, rollbackVoteType: 0 };
}

export {
  applyVote,
  determineVoteAction,
};
