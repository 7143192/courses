# `Reading1：Worse is Better`

- 问：How to explain the idea to one of your friends whose major is not computer/software?
- 答：Worse is Better观点说的是在进行软件系统设计时，可以适当的放弃设计的一致性和完整性，而追求系统的简单性，并通过从小模块入手的方式逐步的建成整个系统，而不是事先就进行了完整的设计。
- 问：Which contexts is "worse is better" suitable for? Which contexts is not ? Please give at least two cases for each situation.
- 答：
  - suitable context:适合于那些更加注重用户体验以及使用满意方便程度的系统/语言设计场景下。
  - two possible cases：
    - Unix/C语言。这两个语言在设计时就采用了“追求简单”的原则，而不是一味的追求语言的正确性和功能的完整性。
    - Google浏览器。Google浏览器主页面只有一个搜索输入框，极大地体现了简单性，虽然其功能看似比其他浏览器更加单一，但是实际上收效更好。
  - unsuitable context:不适用于更加注重性能以及算法实现逻辑的设计场景。
  - two possible cases：
    - 操作系统。操作系统不能为了实现简单而牺牲了完整性和一致性，因为缺失的完整性可能会导致系统出现安全问题甚至崩溃。
    - 安保系统。安保系统不能为了简单性，而过分的牺牲本应具备的系统的安全性和安保的完整性。
- 问：Please describe one of your own projects, and think whether “worse is better” is suitable for it.
- 答1：“运动健身APP”是我在大二小学期小组合作完成的一个项目。其主要目标是实现一个具有跑步记录，课程跟练，社区互动等功能的运动健身软件。
- 答2：我认为Worse is Better原则是适合我的这个项目的。因为这个项目主要受众为普通用户，因而整个APP的设计理念就是追求功能使用的简便以及页面的美观简洁，而不应该过分的追求实现数个复杂的功能。这与Worse is Better的理念是符合的，所以我认为Worse is Better是适合这个系统的。