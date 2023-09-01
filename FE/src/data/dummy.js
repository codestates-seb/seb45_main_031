const user = [
  {
    memberId: 1,
    nickname: "김혜란1",
    email: "abc1@gmail.com",
    imgUrl: "FE/src/assets/images/memberImg.jpeg",
  },
  {
    memberId: 2,
    nickname: "김혜란2",
    email: "abc2@gmail.com",
    imgUrl: "FE/src/assets/images/memberImg.jpeg",
  },
  {
    memberId: 3,
    nickname: "김혜란3",
    email: "abc3@gmail.com",
    imgUrl: "FE/src/assets/images/memberImg.jpeg",
  },
  {
    memberId: 4,
    nickname: "김혜란4",
    email: "abc4@gmail.com",
    imgUrl: "FE/src/assets/images/memberImg.jpeg",
  },
  {
    memberId: 5,
    nickname: "김혜란5",
    email: "abc5@gmail.com",
    imgUrl: "FE/src/assets/images/memberImg.jpeg",
  },
];

const todoList = {
  todoCount: 9,
  completeCount: 1,
  todos: [
    {
      todoId: 1,
      memberId: 1,
      title: "투두1",
      tag: "태그1",
      emoji: "⏰",
      complete: true,
      date: "2023-08-25",
    },
    {
      todoId: 2,
      memberId: 1,
      title: "투두2",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 3,
      memberId: 1,
      title: "투두3",
      tag: "태그3",
      emoji: "⏰",
      complete: true,
      date: "2023-08-25",
    },
    {
      todoId: 4,
      memberId: 1,
      title: "투두4",
      tag: "태그4",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 5,
      memberId: 1,
      title: "투두5",
      tag: "태그3",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 6,
      memberId: 1,
      title: "투두6",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 7,
      memberId: 1,
      title: "투두7",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 8,
      memberId: 1,
      title: "투두7",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 9,
      memberId: 1,
      title: "투두7",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-25",
    },
    {
      todoId: 1,
      memberId: 1,
      title: "투두1",
      tag: "태그1",
      emoji: "⏰",
      complete: true,
      date: "2023-08-21",
    },
    {
      todoId: 2,
      memberId: 1,
      title: "투두2",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-23",
    },
    {
      todoId: 3,
      memberId: 1,
      title: "투두3",
      tag: "태그3",
      emoji: "⏰",
      complete: true,
      date: "2023-08-24",
    },
    {
      todoId: 4,
      memberId: 1,
      title: "투두4",
      tag: "태그4",
      emoji: "⏰",
      complete: false,
      date: "2023-08-22",
    },
    {
      todoId: 5,
      memberId: 1,
      title: "투두5",
      tag: "태그3",
      emoji: "⏰",
      complete: false,
      date: "2023-08-21",
    },
    {
      todoId: 6,
      memberId: 1,
      title: "투두6",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-22",
    },
    {
      todoId: 7,
      memberId: 1,
      title: "투두7",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-23",
    },
    {
      todoId: 8,
      memberId: 1,
      title: "투두7",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-24",
    },
    {
      todoId: 9,
      memberId: 1,
      title: "투두7",
      tag: "태그2",
      emoji: "⏰",
      complete: false,
      date: "2023-08-24",
    },
  ],
};

const postList = {
  postCount: 15,
  page: 1,
  posts: [
    {
      memberId: 1,
      nickname: "김혜란1",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "2023년 08월 25일 11시 11분",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: true },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: true },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: true,
      likes: 2021,
      content: "게시글 내용이 여기에 들어갑니다. 와랄랄랄라 적어줍시당~",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
      ],
    },
    {
      memberId: 2,
      nickname: "김혜란2",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "2023년 08월 25일 11시 11분",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: false,
      likes: 2021,
      content: "게시글 내용",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content:
            "댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111댓글111",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
      ],
    },
    {
      memberId: 1,
      nickname: "김혜란1",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "08.25 11:11",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: false,
      likes: 2021,
      content: "게시글 내용",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
      ],
    },
    {
      memberId: 1,
      nickname: "김혜란1",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "08.25 11:11",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: false,
      likes: 2021,
      content: "게시글 내용",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
      ],
    },
    {
      memberId: 1,
      nickname: "김혜란1",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "08.25 11:11",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: false,
      likes: 2021,
      content: "게시글 내용",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
      ],
    },
    {
      memberId: 1,
      nickname: "김혜란1",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "08.25 11:11",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: false,
      likes: 2021,
      content: "게시글 내용",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
      ],
    },
    {
      memberId: 1,
      nickname: "김혜란1",
      imgUrl: "FE/src/assets/images/memberImg.jpeg",
      createdAt: "08.25 11:11",
      todoList: [
        { title: "투두6", tag: "태그2", emoji: "🐣", complete: true },
        { title: "투두7", tag: "태그2", emoji: "🐣", complete: true },
        { title: "투두8", tag: "태그2", emoji: "🐣", complete: false },
        { title: "투두9", tag: "태그2", emoji: "🐣", complete: false },
      ],
      like: false,
      likes: 2021,
      content: "게시글 내용",
      comments: [
        {
          memberId: 1,
          nickname: "김혜란1",
          content: "댓글1",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 2,
          nickname: "김혜란2",
          content: "댓글2",
          createdAt: "08.25 11:11",
        },
        {
          memberId: 3,
          nickname: "김혜란3",
          content: "댓글3",
          createdAt: "08.25 11:11",
        },
      ],
    },
  ],
};

const trophy = {
  trophyUrl: "FE/src/assets/images/trophyLevel1.png",
};

export { user, todoList, postList, trophy };
