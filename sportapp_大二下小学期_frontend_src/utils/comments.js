const comments = [
  {
    cid: 1,
    parent_cid: 0,
    uid: 2,
    username: '郭富城',
    header: '../../../../res/header1.jpg',
    gender: '男',
    tid: 1,
    content: '一起加油吧',
    like_count: 4,
    create_time: '2022-06-28T07:19:12+08:00',
  },
  {
    cid: 2,
    parent_cid: 0,
    uid: 3,
    username: '张蓝心',
    header: '../../../../res/header3.jpg',
    gender: '女',
    tid: 1,
    content: '有什么诀窍吗',
    like_count: 3,
    create_time: '2022-06-29T08:30:12+08:00',
  },
  {
    cid: 3,
    parent_cid: 0,
    uid: 3,
    username: '张蓝心',
    header: '../../../../res/header3.jpg',
    gender: '女',
    tid: 2,
    content: '厉害，下次一起',
    like_count: 2,
    create_time: '2022-06-29T16:30:12+08:00',
  },
];

export function getCommentsByTid(Tid) {
  let list = [];
  comments.forEach(element => {
    if (element.tid === Tid) {
      list.push(element);
    }
  });
  return list;
}
