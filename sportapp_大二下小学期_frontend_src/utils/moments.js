const moments = [
  {
    uid: 1,
    username: '吴彦祖',
    header: '../../../../res/header1.jpg',
    gender: '男',
    age: 20,
    level: '健身达人',
    tid: 1,
    content: '今天跑了十公里/{deyi}明天继续',
    like_count: 5,
    comment_count: 2,
    create_time: '2022-06-27T07:19:12+08:00',
    images: [
      {
        img_path: '../../../../res/moments1_1.jpg',
      },
      {
        img_path: '../../../../res/moments1_2.jpg',
      },
    ],
  },
  {
    uid: 2,
    username: '郭富城',
    header: '../../../../res/header2.jpg',
    gender: '男',
    age: 25,
    level: '初来乍到',
    tid: 2,
    content: '/{ziya}今天跑了二十公里/{ziya}/{ziya}',
    like_count: 6,
    comment_count: 1,
    create_time: '2022-06-28T08:30:12+08:00',
    images: [
      {
        img_path: '../../../../res/moments2_1.jpg',
      },
    ],
  },
  {
    uid: 3,
    username: '张蓝心',
    header: '../../../../res/header3.jpg',
    gender: '女',
    age: 22,
    level: '健身萌新',
    tid: 3,
    content: '今天做了十组深蹲',
    like_count: 9,
    comment_count: 0,
    create_time: '2022-06-28T16:30:12+08:00',
    images: [
      {
        img_path: '../../../../res/moments3_1.jpg',
      },
    ],
  },
];

export function getMomentsList() {
  let list;
  list = moments;
  return list;
}

