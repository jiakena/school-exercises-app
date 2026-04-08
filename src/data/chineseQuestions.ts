import type { Question } from '@/types';

// 小古文阅读训练题库 - 多样化题型
export const chineseQuestionBank: Omit<Question, 'id'>[] = [
  // ========== 名句填空题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '《论语》名句："学而时习之，_____。"',
    options: ['不亦说乎', '不亦乐乎', '不亦君子乎', '不亦善乎'],
    answer: '不亦说乎',
    explanation: '出自《论语·学而》，意思是学习了知识然后按时温习，不是很愉快吗？'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '《三字经》："人之初，_____。"',
    options: ['性本善', '性本恶', '性相近', '性相远'],
    answer: '性本善',
    explanation: '《三字经》开篇第一句，意思是人在最初的时候，本性都是善良的。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '《弟子规》："父母呼，_____。"',
    options: ['应勿缓', '行勿懒', '须敬听', '须顺承'],
    answer: '应勿缓',
    explanation: '出自《弟子规》，意思是父母呼唤时，应该立即答应，不要迟缓。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '《岳阳楼记》："先天下之忧而忧，_____。"',
    options: ['后天下之乐而乐', '天下兴亡，匹夫有责', '位卑未敢忘忧国', '苟利国家生死以'],
    answer: '后天下之乐而乐',
    explanation: '出自范仲淹《岳阳楼记》，表达了作者忧国忧民的情怀。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"_____，一览众山小。"出自杜甫的《望岳》。',
    options: ['会当凌绝顶', '欲穷千里目', '不畏浮云遮望眼', '只缘身在最高层'],
    answer: '会当凌绝顶',
    explanation: '出自杜甫《望岳》，表达了诗人攀登绝顶、俯视一切的雄心壮志。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"_____，早有蜻蜓立上头。"出自杨万里的《小池》。',
    options: ['小荷才露尖尖角', '接天莲叶无穷碧', '映日荷花别样红', '荷叶罗裙一色裁'],
    answer: '小荷才露尖尖角',
    explanation: '出自杨万里《小池》，描绘了初夏池塘的优美景色。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"落霞与孤鹜齐飞，_____。"出自王勃的《滕王阁序》。',
    options: ['秋水共长天一色', '孤帆远影碧空尽', '唯见长江天际流', '黄河之水天上来'],
    answer: '秋水共长天一色',
    explanation: '出自王勃《滕王阁序》，描绘了滕王阁的壮丽景色，是千古名句。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"_____，直挂云帆济沧海。"出自李白的《行路难》。',
    options: ['长风破浪会有时', '天生我材必有用', '仰天大笑出门去', '我辈岂是蓬蒿人'],
    answer: '长风破浪会有时',
    explanation: '出自李白《行路难》，表达了诗人对未来的信心和豪情。'
  },
  
  // ========== 出处选择题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"三人行，必有我师焉"出自哪部经典？',
    options: ['《论语》', '《孟子》', '《大学》', '《中庸》'],
    answer: '《论语》',
    explanation: '出自《论语·述而》，意思是几个人同行，其中必定有人可以做我的老师。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"己所不欲，勿施于人"是谁的名言？',
    options: ['孔子', '孟子', '老子', '庄子'],
    answer: '孔子',
    explanation: '这是孔子提出的"恕道"，意思是自己不愿意的事情，不要强加给别人。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"山重水复疑无路，柳暗花明又一村"出自陆游的哪首诗？',
    options: ['《游山西村》', '《示儿》', '《十一月四日风雨大作》', '《钗头凤》'],
    answer: '《游山西村》',
    explanation: '比喻在困境中突然出现转机，是陆游的名句。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"富贵不能淫，贫贱不能移，威武不能屈"出自《孟子》的哪一篇？',
    options: ['《滕文公下》', '《梁惠王上》', '《公孙丑上》', '《告子上》'],
    answer: '《滕文公下》',
    explanation: '意思是大丈夫不为富贵所迷惑，不为贫贱所改变，不为威武所屈服。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"不以物喜，不以己悲"出自哪篇文章？',
    options: ['《岳阳楼记》', '《醉翁亭记》', '《桃花源记》', '《小石潭记》'],
    answer: '《岳阳楼记》',
    explanation: '出自范仲淹《岳阳楼记》，意思是不因外物好坏和自己得失而或喜或悲。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"苟全性命于乱世，不求闻达于诸侯"出自诸葛亮的哪篇文章？',
    options: ['《出师表》', '《诫子书》', '《后出师表》', '《隆中对》'],
    answer: '《出师表》',
    explanation: '表达了诸葛亮淡泊名利、忠于蜀汉的情怀。'
  },

  // ========== 翻译理解题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"温故而知新"的意思是？',
    options: ['温习旧知识能有新体会', '天气温暖就有新气象', '对人温和就能交到新朋友', '熟悉的地方有新风景'],
    answer: '温习旧知识能有新体会',
    explanation: '出自《论语》，强调复习旧知识的重要性，通过复习可以获得新的理解和体会。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"学而不思则罔"中"罔"的意思是？',
    options: ['迷惑而无所得', '网罗知识', '忘记', '迷茫'],
    answer: '迷惑而无所得',
    explanation: '出自《论语》，意思是只学习不思考，就会迷惑而无所得。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"业精于勤，荒于嬉"的意思是？',
    options: ['学业因勤奋而精进，因嬉戏而荒废', '事业成功在于勤奋', '精通业务需要勤奋', '勤劳才能成功'],
    answer: '学业因勤奋而精进，因嬉戏而荒废',
    explanation: '出自韩愈《进学解》，强调勤奋对学习的重要性。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"海内存知己，天涯若比邻"表达的意思是？',
    options: ['友谊不受距离限制', '四海之内都有朋友', '邻居就像知己', '远方有朋友'],
    answer: '友谊不受距离限制',
    explanation: '出自王勃《送杜少府之任蜀州》，表达了友谊不受空间阻隔的豁达情怀。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"问渠那得清如许？为有源头活水来"的寓意是？',
    options: ['知识需要不断更新', '池塘需要活水', '源头的水很清澈', '读书使人清醒'],
    answer: '知识需要不断更新',
    explanation: '出自朱熹《观书有感》，比喻知识需要像活水一样不断更新，才能保持清新活力。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"老骥伏枥，志在千里"中"骥"指的是？',
    options: ['千里马', '老马', '狮子', '老虎'],
    answer: '千里马',
    explanation: '出自曹操《龟虽寿》，"骥"是千里马的意思，比喻有志向的人虽然年老仍有雄心壮志。'
  },

  // ========== 判断题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '判断正误："床前明月光"是李白的诗句。',
    options: ['正确', '错误'],
    answer: '正确',
    explanation: '出自李白《静夜思》，是脍炙人口的名句。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '判断正误：《三字经》是孔子编写的。',
    options: ['正确', '错误'],
    answer: '错误',
    explanation: '《三字经》的作者一般认为是宋代的王应麟，不是孔子。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '判断正误："春蚕到死丝方尽"是描写爱情的诗句。',
    options: ['正确', '错误'],
    answer: '正确',
    explanation: '出自李商隐《无题》，原诗是描写爱情的，以春蚕吐丝比喻相思之情至死方休。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '判断正误：《岳阳楼记》的作者是苏轼。',
    options: ['正确', '错误'],
    answer: '错误',
    explanation: '《岳阳楼记》的作者是范仲淹，不是苏轼。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '判断正误："路漫漫其修远兮，吾将上下而求索"出自《离骚》。',
    options: ['正确', '错误'],
    answer: '正确',
    explanation: '出自屈原《离骚》，表达了追求真理的坚定决心。'
  },

  // ========== 作者匹配题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"静夜思"的作者是？',
    options: ['李白', '杜甫', '白居易', '王维'],
    answer: '李白',
    explanation: '《静夜思》是李白的代表作之一，表达了思乡之情。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"春晓"的作者是？',
    options: ['孟浩然', '王维', '李白', '杜甫'],
    answer: '孟浩然',
    explanation: '《春晓》是孟浩然的代表作，描写了春天早晨的景色。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"登鹳雀楼"的作者是？',
    options: ['王之涣', '王勃', '王维', '王昌龄'],
    answer: '王之涣',
    explanation: '《登鹳雀楼》是王之涣的名作，"欲穷千里目，更上一层楼"就出自此诗。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"水调歌头·明月几时有"的作者是？',
    options: ['苏轼', '辛弃疾', '李清照', '陆游'],
    answer: '苏轼',
    explanation: '这是苏轼在中秋节写给弟弟苏辙的词，表达了对亲人的思念。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"天净沙·秋思"的作者是？',
    options: ['马致远', '关汉卿', '白朴', '郑光祖'],
    answer: '马致远',
    explanation: '这是元代马致远的散曲名作，被誉为"秋思之祖"。'
  },

  // ========== 修辞手法题 ==========
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"飞流直下三千尺，疑是银河落九天"运用了什么修辞手法？',
    options: ['夸张', '比喻', '拟人', '对偶'],
    answer: '夸张',
    explanation: '出自李白《望庐山瀑布》，用夸张的手法描写庐山瀑布的雄伟壮观。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"两个黄鹂鸣翠柳，一行白鹭上青天"运用了什么修辞手法？',
    options: ['对偶', '比喻', '拟人', '夸张'],
    answer: '对偶',
    explanation: '出自杜甫《绝句》，两句诗对仗工整，是典型的对偶句。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"感时花溅泪，恨别鸟惊心"运用了什么修辞手法？',
    options: ['拟人', '比喻', '夸张', '对偶'],
    answer: '拟人',
    explanation: '出自杜甫《春望》，赋予花和鸟以人的情感，是拟人手法。'
  },

  // ========== 主题理解题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"锄禾日当午，汗滴禾下土"主要表达了什么主题？',
    options: ['珍惜粮食', '农民辛苦', '天气炎热', '劳动光荣'],
    answer: '珍惜粮食',
    explanation: '出自李绅《悯农》，通过描写农民劳作的辛苦，告诫人们要珍惜粮食。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"游子吟"主要表达了什么情感？',
    options: ['母爱', '友情', '思乡', '爱国'],
    answer: '母爱',
    explanation: '出自孟郊《游子吟》，通过母亲为游子缝衣的场景，歌颂了伟大的母爱。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"茅屋为秋风所破歌"表达了诗人怎样的情怀？',
    options: ['忧国忧民', '个人悲苦', '愤世嫉俗', '归隐田园'],
    answer: '忧国忧民',
    explanation: '出自杜甫《茅屋为秋风所破歌》，诗人由自己的苦难想到天下寒士，体现了忧国忧民的情怀。'
  },

  // ========== 诗词默写题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '补全诗句：春眠不觉晓，______。',
    options: ['处处闻啼鸟', '夜来风雨声', '花落知多少', '春去花还在'],
    answer: '处处闻啼鸟',
    explanation: '出自孟浩然《春晓》，描写春天早晨的美景。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '补全诗句：______，疑是地上霜。',
    options: ['床前明月光', '举头望明月', '月落乌啼霜满天', '海上生明月'],
    answer: '床前明月光',
    explanation: '出自李白《静夜思》，表达了思乡之情。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '补全诗句：鹅鹅鹅，______。',
    options: ['曲项向天歌', '白毛浮绿水', '红掌拨清波', '一行白鹭上青天'],
    answer: '曲项向天歌',
    explanation: '出自骆宾王《咏鹅》，是小学生必背古诗。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '补全诗句：______，春风吹又生。',
    options: ['野火烧不尽', '离离原上草', '一岁一枯荣', '萋萋满别情'],
    answer: '野火烧不尽',
    explanation: '出自白居易《赋得古原草送别》，比喻生命力的顽强。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '补全诗句：欲穷千里目，______。',
    options: ['更上一层楼', '一览众山小', '会当凌绝顶', '登高壮观天地间'],
    answer: '更上一层楼',
    explanation: '出自王之涣《登鹳雀楼》，比喻要想看得远，就要站得高。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '补全诗句：飞流直下三千尺，______。',
    options: ['疑是银河落九天', '遥看瀑布挂前川', '日照香炉生紫烟', '庐山真面目'],
    answer: '疑是银河落九天',
    explanation: '出自李白《望庐山瀑布》，用夸张手法描写瀑布的壮观。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '补全诗句：______，直把杭州作汴州。',
    options: ['暖风熏得游人醉', '西湖歌舞几时休', '山外青山楼外楼', '临安小雨初霁'],
    answer: '暖风熏得游人醉',
    explanation: '出自林升《题临安邸》，讽刺南宋统治者偏安一隅。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '补全诗句：人生自古谁无死，______。',
    options: ['留取丹心照汗青', '留取丹心照汗青', '身世浮沉雨打萍', '辛苦遭逢起一经'],
    answer: '留取丹心照汗青',
    explanation: '出自文天祥《过零丁洋》，表达了视死如归的民族气节。'
  },

  // ========== 字词注音题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '下列加点字注音正确的是？',
    options: ['住(zhù)宿', '住(zhǔ)宿', '住(zhú)宿', '住(zhù)宿'],
    answer: '住(zhù)宿',
    explanation: '"住"字的正确读音是zhù，住宿指在外居住。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"参差"的正确读音是？',
    options: ['cēn cī', 'cān chā', 'cēn chā', 'cān cī'],
    answer: 'cēn cī',
    explanation: '参差的意思是长短不齐，读cēn cī。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"踌躇"的正确读音是？',
    options: ['chóu chú', 'chóu zhù', 'shòu chú', 'còu chú'],
    answer: 'chóu chú',
    explanation: '踌躇的意思是犹豫不决，读chóu chú。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"小心翼翼"中"翼"的读音是？',
    options: ['yì', 'yǐ', 'yī', 'jì'],
    answer: 'yì',
    explanation: '翼的读音是yì，小心翼翼形容十分谨慎。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"强词夺理"中"强"的正确读音是？',
    options: ['qiǎng', 'qiáng', 'jiàng', 'qiāng'],
    answer: 'qiǎng',
    explanation: '强词夺理中"强"读qiǎng，意思是勉强、强迫。'
  },

  // ========== 近反义词题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"美丽"的近义词是？',
    options: ['漂亮', '丑陋', '干净', '明亮'],
    answer: '漂亮',
    explanation: '美丽和漂亮都表示好看的意思，是近义词。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '"高兴"的反义词是？',
    options: ['难过', '快乐', '开心', '兴奋'],
    answer: '难过',
    explanation: '高兴表示开心，反义词是难过、悲伤。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"坚强"的近义词是？',
    options: ['顽强', '脆弱', '勇敢', '坚定'],
    answer: '顽强',
    explanation: '坚强和顽强都表示意志坚定，是近义词。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"沉默"的反义词是？',
    options: ['唠叨', '安静', '沉默寡言', '寂静'],
    answer: '唠叨',
    explanation: '沉默表示不说话，反义词是唠叨、多嘴。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"栩栩如生"的近义词是？',
    options: ['惟妙惟肖', '死气沉沉', '平淡无奇', '粗制滥造'],
    answer: '惟妙惟肖',
    explanation: '栩栩如生和惟妙惟肖都形容描写或模仿得非常逼真。'
  },

  // ========== 成语填空题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '______八方来客',
    options: ['喜迎', '欢送', '迎接', '招待'],
    answer: '喜迎',
    explanation: '喜迎八方来客是常用搭配，表示热情欢迎各地客人。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '守株______',
    options: ['待兔', '待虎', '等兔', '望兔'],
    answer: '待兔',
    explanation: '守株待兔比喻不主动努力，存在侥幸心理。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '画蛇______',
    options: ['添足', '添翼', '加足', '添脚'],
    answer: '添足',
    explanation: '画蛇添足比喻做多余的事，反而不恰当。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '______助长',
    options: ['拔苗', '种苗', '护苗', '育苗'],
    answer: '拔苗',
    explanation: '拔苗助长比喻违反事物发展规律，急于求成。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '破釜______',
    options: ['沉舟', '沉船', '沉水', '毁舟'],
    answer: '沉舟',
    explanation: '破釜沉舟比喻下定决心，不顾一切干到底。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '______不息',
    options: ['自强', '奋斗', '努力', '拼搏'],
    answer: '自强',
    explanation: '自强不息指自觉地努力向上，永不松懈。'
  },

  // ========== 病句修改题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '下列句子没有语病的是？',
    options: [
      '他非常喜欢看书',
      '他非常特别喜欢看书',
      '他喜欢看书非常',
      '他喜欢非常看书'
    ],
    answer: '他非常喜欢看书',
    explanation: '其他选项都存在语序不当或重复的问题。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '下列句子有语病的是？',
    options: [
      '我们要养成讲卫生的好习惯',
      '通过这次活动，我受到了教育',
      '他穿着一件蓝色的衣服和一顶帽子',
      '春天到了，花儿开了'
    ],
    answer: '他穿着一件蓝色的衣服和一顶帽子',
    explanation: '搭配不当，帽子不能用"穿着"，应该用"戴着"。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '下列句子有语病的是？',
    options: [
      '会议结束后，大家陆续离开了会场',
      '这篇文章大约有500字左右',
      '他的学习成绩有了明显提高',
      '公园里的花五颜六色，美丽极了'
    ],
    answer: '这篇文章大约有500字左右',
    explanation: '前后矛盾，"大约"和"左右"重复，应删去一个。'
  },

  // ========== 标点符号题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '下列句子中标点使用正确的是？',
    options: [
      '"好的。"他说。',
      '"好的。"他说。',
      '"好的"，他说。',
      '"好的"。他说。'
    ],
    answer: '"好的。"他说。',
    explanation: '引号内是完整句子，句号应在引号内。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '下列句子中标点使用正确的是？',
    options: [
      '他问我："你今天去不去图书馆？"',
      '他问我："你今天去不去图书馆。"',
      '他问我："你今天去不去图书馆！"',
      '他问我："你今天去不去图书馆"'
    ],
    answer: '他问我："你今天去不去图书馆？"',
    explanation: '问句要用问号，即使放在引号内也要保持问号。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '下列句子中标点使用正确的是？',
    options: [
      '《红楼梦》是中国四大名著之一。',
      '「红楼梦」是中国四大名著之一。',
      '"红楼梦"是中国四大名著之一。',
      '【红楼梦】是中国四大名著之一。'
    ],
    answer: '《红楼梦》是中国四大名著之一。',
    explanation: '书名应该用书名号《》。'
  },

  // ========== 关联词语题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '______下雨，我们就不去公园了。',
    options: ['如果', '因为', '虽然', '不但'],
    answer: '如果',
    explanation: '如果...就...表示假设关系。'
  },
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '他______聪明，______勤奋。',
    options: ['既...又...', '因为...所以...', '虽然...但是...', '不但...而且...'],
    answer: '既...又...',
    explanation: '既...又...表示并列关系，两个特点同时存在。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '______困难多大，我们______要坚持到底。',
    options: ['无论...都...', '如果...就...', '因为...所以...', '虽然...但是...'],
    answer: '无论...都...',
    explanation: '无论...都...表示条件关系，不管什么情况都如此。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '______努力学习，______能取得好成绩。',
    options: ['只有...才...', '只要...就...', '因为...所以...', '虽然...但是...'],
    answer: '只有...才...',
    explanation: '只有...才...表示必要条件，强调努力是取得好成绩的必要条件。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '______他学习成绩不好，______品德很好。',
    options: ['虽然...但是...', '因为...所以...', '不但...而且...', '要么...要么...'],
    answer: '虽然...但是...',
    explanation: '虽然...但是...表示转折关系，前后意思相反。'
  },

  // ========== 古诗词常识题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '《静夜思》是什么朝代的诗？',
    options: ['唐朝', '宋朝', '明朝', '清朝'],
    answer: '唐朝',
    explanation: '李白是唐朝诗人，《静夜思》是唐朝作品。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '"唐宋八大家"不包括以下哪位？',
    options: ['李白', '苏轼', '韩愈', '欧阳修'],
    answer: '李白',
    explanation: '唐宋八大家是指唐宋时期的散文八大家，李白是诗人，不在其中。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '被称为"诗圣"的是哪位诗人？',
    options: ['杜甫', '李白', '白居易', '王维'],
    answer: '杜甫',
    explanation: '杜甫被称为"诗圣"，他的诗被称为"诗史"。李白被称为"诗仙"。'
  },

  // ========== 文学常识题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '《西游记》的作者是？',
    options: ['吴承恩', '曹雪芹', '施耐庵', '罗贯中'],
    answer: '吴承恩',
    explanation: '《西游记》是明代吴承恩所著的神魔小说。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '《三国演义》中"桃园三结义"的是哪三个人？',
    options: ['刘备、关羽、张飞', '曹操、刘备、孙权', '诸葛亮、周瑜、司马懿', '赵云、马超、黄忠'],
    answer: '刘备、关羽、张飞',
    explanation: '桃园三结义是《三国演义》开篇的重要情节，刘备、关羽、张飞结为兄弟。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '"四大名著"不包括以下哪部？',
    options: ['《聊斋志异》', '《红楼梦》', '《水浒传》', '《西游记》'],
    answer: '《聊斋志异》',
    explanation: '四大名著是《红楼梦》《西游记》《水浒传》《三国演义》。《聊斋志异》是短篇小说集。'
  },
  
  // ========== 文言文阅读题 ==========
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '阅读文言文："孔融让梨"。孔融四岁，与诸兄同食梨，融辄引小者。大人问其故，答曰："我小儿，法当取小者。" 问：孔融为什么取小梨？',
    options: ['因为他年龄小，应该取小的', '因为他不喜欢吃梨', '因为大梨不好吃', '因为他想让给哥哥们'],
    answer: '因为他年龄小，应该取小的',
    explanation: '孔融说："我是小孩子，按道理应该取小的。" 体现了他尊老爱幼的美德。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '阅读文言文："守株待兔"。宋人有耕田者，田中有株，兔走触株，折颈而死。因释其耒而守株，冀复得兔。问：这个故事告诉我们什么道理？',
    options: ['不要心存侥幸，要脚踏实地', '兔子会自己撞死在树上', '守在树旁就能捡到兔子', '耕田太累，应该等兔子'],
    answer: '不要心存侥幸，要脚踏实地',
    explanation: '这个故事讽刺了那些心存侥幸、不劳而获的人，告诉我们要脚踏实地做事。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '阅读文言文："刻舟求剑"。楚人有涉江者，其剑自舟中坠于水，遽契其舟，曰："是吾剑之所从坠。"舟止，从其所契者入水求之。问：楚人为什么找不到剑？',
    options: ['剑已经沉到江底了', '舟已经移动了，而剑没有', '他刻的记号不明显', '江水太深了'],
    answer: '舟已经移动了，而剑没有',
    explanation: '这个故事告诉我们，事物是不断变化的，不能用静止的眼光看问题。'
  },
  
  // ========== 阅读理解题 ==========
  {
    subject: 'chinese',
    difficulty: 'easy',
    content: '阅读短文：春天来了，小草绿了，花儿开了，鸟儿在树上唱歌。小朋友们在公园里放风筝。问：短文描写的是什么季节？',
    options: ['春天', '夏天', '秋天', '冬天'],
    answer: '春天',
    explanation: '短文开头就说"春天来了"，并且描述了春天的景象。'
  },
  {
    subject: 'chinese',
    difficulty: 'medium',
    content: '阅读短文：小明很喜欢读书。每天放学回家，他都先完成作业，然后就拿起书来读。他读过很多书，知道很多知识。问：小明是一个什么样的孩子？',
    options: ['爱读书的孩子', '不爱学习的孩子', '喜欢玩的孩子', '调皮的孩子'],
    answer: '爱读书的孩子',
    explanation: '短文说小明很喜欢读书，每天都读书，读过很多书，所以他是一个爱读书的孩子。'
  },
  {
    subject: 'chinese',
    difficulty: 'hard',
    content: '阅读短文：有一只小蚂蚁，它想过河。可是河水太深了，它过不去。这时，一片树叶飘过来，小蚂蚁爬上去，树叶载着它过了河。问：这个故事告诉我们什么？',
    options: ['要善于借助外力', '小蚂蚁很聪明', '树叶可以当小船', '河水很深'],
    answer: '要善于借助外力',
    explanation: '小蚂蚁借助树叶过河，告诉我们在遇到困难时要善于借助外力解决问题。'
  }
];

import { 
  getGeneratedIndices, 
  saveGeneratedIndices, 
  shuffleOptions,
  clearSubjectHistory 
} from './questionHistory';

const SUBJECT_NAME = 'chinese';

// 小升初语文题目类型分类
const chineseQuestionTypeMap: Record<number, 'basic' | 'reading' | 'writing'> = {
  // 基础题（名句填空、出处选择、翻译理解、判断题、作者匹配、诗词默写、字词注音、近反义词、成语填空）
  0: 'basic', 1: 'basic', 2: 'basic', 3: 'basic', 4: 'basic', 5: 'basic', 6: 'basic', 7: 'basic',
  8: 'basic', 9: 'basic', 10: 'basic', 11: 'basic', 12: 'basic', 13: 'basic',
  14: 'basic', 15: 'basic', 16: 'basic', 17: 'basic', 18: 'basic', 19: 'basic',
  20: 'basic', 21: 'basic', 22: 'basic', 23: 'basic', 24: 'basic', 25: 'basic',
  26: 'basic', 27: 'basic', 28: 'basic', 29: 'basic', 30: 'basic', 31: 'basic',
  32: 'basic', 33: 'basic', 34: 'basic', 35: 'basic', 36: 'basic', 37: 'basic',
  38: 'basic', 39: 'basic', 40: 'basic', 41: 'basic', 42: 'basic', 43: 'basic',
  44: 'basic', 45: 'basic', 46: 'basic', 47: 'basic', 48: 'basic', 49: 'basic',
  50: 'basic', 51: 'basic', 52: 'basic', 53: 'basic', 54: 'basic', 55: 'basic',
  56: 'basic', 57: 'basic', 58: 'basic', 59: 'basic', 60: 'basic', 61: 'basic',
  62: 'basic', 63: 'basic', 64: 'basic', 65: 'basic', 66: 'basic', 67: 'basic',
  68: 'basic', 69: 'basic', 70: 'basic', 71: 'basic', 72: 'basic', 73: 'basic',
  // 阅读题（修辞手法、主题理解、文言文阅读、阅读理解）
  74: 'reading', 75: 'reading', 76: 'reading', 77: 'reading', 78: 'reading', 79: 'reading',
  80: 'reading', 81: 'reading', 82: 'reading', 83: 'reading', 84: 'reading', 85: 'reading',
  // 写作题（病句修改、标点符号、关联词语 - 这些属于写作基础）
  86: 'writing', 87: 'writing', 88: 'writing', 89: 'writing', 90: 'writing',
  91: 'writing', 92: 'writing', 93: 'writing', 94: 'writing', 95: 'writing',
  96: 'writing', 97: 'writing', 98: 'writing', 99: 'writing', 100: 'writing'
};

// 生成语文题目 - 小升初难度分布：基础3道、阅读4道、写作3道
export function generateChineseQuestions(_count: number = 10): Question[] {
  const generatedIndices = getGeneratedIndices(SUBJECT_NAME);
  const availableIndices = chineseQuestionBank.map((_, i) => i).filter(i => !generatedIndices.includes(i));
  
  // 如果可用题目不足，重置记录（说明题库已用完）
  if (availableIndices.length < 10) {
    // 清除历史记录，重新开始
    clearSubjectHistory(SUBJECT_NAME);
    availableIndices.length = 0;
    for (let i = 0; i < chineseQuestionBank.length; i++) {
      availableIndices.push(i);
    }
  }
  
  // 按类型分类可用题目
  const basicIndices = availableIndices.filter(i => chineseQuestionTypeMap[i] === 'basic');
  const readingIndices = availableIndices.filter(i => chineseQuestionTypeMap[i] === 'reading');
  const writingIndices = availableIndices.filter(i => chineseQuestionTypeMap[i] === 'writing');
  
  const selectedIndices: number[] = [];
  const questions: Question[] = [];
  
  // 生成3道基础题
  for (let i = 0; i < 3 && basicIndices.length > 0; i++) {
    const randomIdx = Math.floor(Math.random() * basicIndices.length);
    const selectedIndex = basicIndices.splice(randomIdx, 1)[0];
    selectedIndices.push(selectedIndex);
    const question = {
      ...chineseQuestionBank[selectedIndex],
      id: i + 1
    };
    questions.push(shuffleOptions(question));
  }
  
  // 生成4道阅读题
  for (let i = 0; i < 4 && readingIndices.length > 0; i++) {
    const randomIdx = Math.floor(Math.random() * readingIndices.length);
    const selectedIndex = readingIndices.splice(randomIdx, 1)[0];
    selectedIndices.push(selectedIndex);
    const question = {
      ...chineseQuestionBank[selectedIndex],
      id: i + 4
    };
    questions.push(shuffleOptions(question));
  }
  
  // 生成3道写作题
  for (let i = 0; i < 3 && writingIndices.length > 0; i++) {
    const randomIdx = Math.floor(Math.random() * writingIndices.length);
    const selectedIndex = writingIndices.splice(randomIdx, 1)[0];
    selectedIndices.push(selectedIndex);
    const question = {
      ...chineseQuestionBank[selectedIndex],
      id: i + 8
    };
    questions.push(shuffleOptions(question));
  }
  
  // 保存已生成的索引
  saveGeneratedIndices(SUBJECT_NAME, selectedIndices);
  
  return questions;
}

// 清除生成记录（用于测试）
export function clearChineseGenerated() {
  clearSubjectHistory(SUBJECT_NAME);
}
