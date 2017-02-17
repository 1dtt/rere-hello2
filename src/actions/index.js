export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';


// user can select a subreddit to display
export const selectSubreddit = (subreddit) => {
  return {
    type: SELECT_SUBREDDIT,
    subreddit: subreddit,
  };
};

// user can press a "update" button
// -> ám chỉ posts của subreddit đã cũ
// -> app tự động gọi API để cập nhật posts cho subreddit
export const invalidateSubreddit = (subreddit) => {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit: subreddit,
  };
}

// fetch the posts for some subreddit
const requestPosts = (subreddit) => {
  return {
    type: REQUEST_POSTS,
    subreddit: subreddit,
  };
};


// when the network request comes through
const receivePosts = (subreddit, json) => {
  return {
    type: RECEIVE_POSTS,
    subreddit: subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now(),
  };
}



const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit];
  if(!posts) {
    return true;
  }
  if(posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export const fetchPostsIfNeeded = (subreddit) => {
  return ((dispatch, getState) => {
    if(shouldFetchPosts(getState(), subreddit)) {
      dispatch(requestPosts(subreddit));

      fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          dispatch(receivePosts(subreddit, json));
        });

      // should handle errors
    }
  });
}