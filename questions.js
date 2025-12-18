// 题目数据 - INFP 48阶人格进化定位测评
const questions = {
    dimension1: [
        {
            id: 1,
            text: "当伴侣没有及时回复消息时，你内心更可能：",
            options: [
                {text: "A. 容易焦虑，会胡思乱想对方是不是不喜欢自己了", score: 1},
                {text: "B. 会有点不安，但能试着告诉自己对方可能在忙", score: 2},
                {text: "C. 能理解对方可能有事，不会过度担心", score: 3}
            ]
        },
        {
            id: 2,
            text: "面对他人的请求，你通常会：",
            options: [
                {text: "A. 即使自己不愿意，也很难拒绝", score: 1},
                {text: "B. 会犹豫，但最终还是会答应", score: 2},
                {text: "C. 能根据自己的情况合理拒绝", score: 3}
            ]
        },
        {
            id: 3,
            text: "在亲密关系中，你更倾向于：",
            options: [
                {text: "A. 完全依赖对方，希望时刻在一起", score: 1},
                {text: "B. 希望有一定的依赖，但也需要个人空间", score: 2},
                {text: "C. 保持独立，认为每个人都需要自己的空间", score: 3}
            ]
        },
        {
            id: 4,
            text: "当与他人发生冲突时，你会：",
            options: [
                {text: "A. 感到非常不安，尽量避免冲突", score: 1},
                {text: "B. 会有些紧张，但会尝试沟通解决", score: 2},
                {text: "C. 能冷静面对，积极寻求解决方案", score: 3}
            ]
        },
        {
            id: 5,
            text: "你如何处理自己的负面情绪？",
            options: [
                {text: "A. 倾向于向他人倾诉，希望得到安慰", score: 1},
                {text: "B. 有时会倾诉，有时会自己消化", score: 2},
                {text: "C. 更愿意自己处理，不想给别人添麻烦", score: 3}
            ]
        },
        {
            id: 6,
            text: "在社交场合中，你更享受：",
            options: [
                {text: "A. 和少数几个亲密朋友在一起", score: 1},
                {text: "B. 和一群熟悉的人一起", score: 2},
                {text: "C. 认识新朋友，拓展社交圈", score: 3}
            ]
        },
        {
            id: 7,
            text: "当你感到被误解时，你会：",
            options: [
                {text: "A. 感到非常委屈，不愿意解释", score: 1},
                {text: "B. 会尝试解释，但如果对方不理解就放弃", score: 2},
                {text: "C. 会积极解释，直到对方理解为止", score: 3}
            ]
        },
        {
            id: 8,
            text: "你对个人边界的看法是：",
            options: [
                {text: "A. 不太清楚自己的边界是什么", score: 1},
                {text: "B. 有一些边界，但有时会被突破", score: 2},
                {text: "C. 非常清楚自己的边界，会明确表达", score: 3}
            ]
        },
        {
            id: 9,
            text: "在与他人建立关系时，你会：",
            options: [
                {text: "A. 很快就敞开心扉，信任对方", score: 1},
                {text: "B. 会观察一段时间，再逐渐信任", score: 2},
                {text: "C. 会保持一定距离，慢慢建立信任", score: 3}
            ]
        },
        {
            id: 10,
            text: "当他人侵犯你的边界时，你会：",
            options: [
                {text: "A. 感到不舒服，但不会表达出来", score: 1},
                {text: "B. 会暗示对方，但不会明确说出来", score: 2},
                {text: "C. 会明确告诉对方，保护自己的边界", score: 3}
            ]
        }
    ],
    dimension2: [
        {
            id: 11,
            text: "当你面临压力时，你通常会：",
            options: [
                {text: "A. 感到不知所措，容易崩溃", score: 1},
                {text: "B. 会感到焦虑，但能坚持完成任务", score: 2},
                {text: "C. 能冷静应对，寻找解决办法", score: 3}
            ]
        },
        {
            id: 12,
            text: "你如何处理生活中的变化？",
            options: [
                {text: "A. 非常抗拒变化，喜欢稳定的生活", score: 1},
                {text: "B. 会有些不安，但能慢慢适应", score: 2},
                {text: "C. 能接受甚至享受变化带来的挑战", score: 3}
            ]
        },
        {
            id: 13,
            text: "当你完成一项任务时，你更关注：",
            options: [
                {text: "A. 他人的评价和认可", score: 1},
                {text: "B. 自己的努力是否得到体现", score: 2},
                {text: "C. 任务本身的完成质量", score: 3}
            ]
        },
        {
            id: 14,
            text: "你通常如何安排自己的时间？",
            options: [
                {text: "A. 没有明确计划，随心情安排", score: 1},
                {text: "B. 有大致计划，但经常调整", score: 2},
                {text: "C. 有详细计划，并严格执行", score: 3}
            ]
        },
        {
            id: 15,
            text: "当你感到疲惫时，你会：",
            options: [
                {text: "A. 继续坚持，不想让别人失望", score: 1},
                {text: "B. 会休息一下，但还是会担心工作", score: 2},
                {text: "C. 会好好休息，认为休息是为了更好地工作", score: 3}
            ]
        },
        {
            id: 16,
            text: "你对未来的态度是：",
            options: [
                {text: "A. 感到迷茫，不知道未来会怎样", score: 1},
                {text: "B. 有一些期待，但也有些担忧", score: 2},
                {text: "C. 充满希望，相信自己能创造美好未来", score: 3}
            ]
        },
        {
            id: 17,
            text: "当你遇到困难时，你会：",
            options: [
                {text: "A. 容易放弃，觉得自己做不到", score: 1},
                {text: "B. 会犹豫，但最终还是会坚持", score: 2},
                {text: "C. 会积极寻找解决办法，不轻易放弃", score: 3}
            ]
        },
        {
            id: 18,
            text: "你如何处理他人的批评？",
            options: [
                {text: "A. 会感到非常受伤，难以接受", score: 1},
                {text: "B. 会有些难过，但会尝试反思", score: 2},
                {text: "C. 能理性对待，从中吸取教训", score: 3}
            ]
        },
        {
            id: 19,
            text: "你通常的能量来源是：",
            options: [
                {text: "A. 从与他人的互动中获取能量", score: 1},
                {text: "B. 既需要社交，也需要独处", score: 2},
                {text: "C. 从独处中获取能量，社交会让你疲惫", score: 3}
            ]
        },
        {
            id: 20,
            text: "当你设定目标后，你会：",
            options: [
                {text: "A. 容易被其他事情吸引，难以坚持", score: 1},
                {text: "B. 会努力一段时间，但容易放弃", score: 2},
                {text: "C. 会持续努力，直到实现目标", score: 3}
            ]
        }
    ],
    dimension3: [
        {
            id: 21,
            text: "你对自己的了解程度是：",
            options: [
                {text: "A. 不太了解自己，经常感到迷茫", score: 1},
                {text: "B. 有一些了解，但还有很多困惑", score: 2},
                {text: "C. 非常了解自己，知道自己的优势和不足", score: 3}
            ]
        },
        {
            id: 22,
            text: "当你做决策时，你更依赖：",
            options: [
                {text: "A. 他人的意见和建议", score: 1},
                {text: "B. 自己的感受和直觉", score: 2},
                {text: "C. 理性分析和思考", score: 3}
            ]
        },
        {
            id: 23,
            text: "你如何看待自己的情绪？",
            options: [
                {text: "A. 觉得自己的情绪很难控制", score: 1},
                {text: "B. 有时能控制，有时不能", score: 2},
                {text: "C. 能很好地理解和管理自己的情绪", score: 3}
            ]
        },
        {
            id: 24,
            text: "你对自己的要求是：",
            options: [
                {text: "A. 非常严格，希望做到完美", score: 1},
                {text: "B. 有一定要求，但不会过于苛刻", score: 2},
                {text: "C. 能接纳自己的不完美", score: 3}
            ]
        },
        {
            id: 25,
            text: "当你回顾过去时，你更倾向于：",
            options: [
                {text: "A. 后悔自己的选择，觉得如果能重来就好了", score: 1},
                {text: "B. 会反思，但也能接受过去的不完美", score: 2},
                {text: "C. 能从过去的经历中学习，向前看", score: 3}
            ]
        },
        {
            id: 26,
            text: "你如何处理自己的缺点？",
            options: [
                {text: "A. 觉得自己的缺点很严重，难以接受", score: 1},
                {text: "B. 会努力改进，但有时会感到沮丧", score: 2},
                {text: "C. 能接纳自己的缺点，并积极改进", score: 3}
            ]
        },
        {
            id: 27,
            text: "你对自己的价值感主要来自：",
            options: [
                {text: "A. 他人的认可和评价", score: 1},
                {text: "B. 自己的成就和贡献", score: 2},
                {text: "C. 自身的存在，不需要外界证明", score: 3}
            ]
        },
        {
            id: 28,
            text: "当你与他人比较时，你会：",
            options: [
                {text: "A. 经常感到自卑，觉得自己不如别人", score: 1},
                {text: "B. 会有些羡慕，但也能看到自己的优点", score: 2},
                {text: "C. 能客观看待，知道每个人都有自己的优势", score: 3}
            ]
        },
        {
            id: 29,
            text: "你通常如何表达自己的想法？",
            options: [
                {text: "A. 不太敢表达，害怕被否定", score: 1},
                {text: "B. 会犹豫，但最终还是会表达", score: 2},
                {text: "C. 能自信地表达自己的想法", score: 3}
            ]
        },
        {
            id: 30,
            text: "你对内在成长的态度是：",
            options: [
                {text: "A. 觉得不重要，更关注外在的东西", score: 1},
                {text: "B. 觉得重要，但不知道如何开始", score: 2},
                {text: "C. 非常重视，会主动学习和成长", score: 3}
            ]
        }
    ],
    dimension4: [
        {
            id: 31,
            text: "你选择职业时，更看重：",
            options: [
                {text: "A. 稳定的收入和福利", score: 1},
                {text: "B. 工作内容是否感兴趣", score: 2},
                {text: "C. 能否实现自己的价值和意义", score: 3}
            ]
        },
        {
            id: 32,
            text: "当你在工作中遇到挑战时，你会：",
            options: [
                {text: "A. 感到压力很大，想要逃避", score: 1},
                {text: "B. 会有些焦虑，但能坚持下去", score: 2},
                {text: "C. 会感到兴奋，视为成长的机会", score: 3}
            ]
        },
        {
            id: 33,
            text: "你对工作的态度是：",
            options: [
                {text: "A. 只是谋生的手段，没有太多热情", score: 1},
                {text: "B. 有一定热情，但更看重生活的平衡", score: 2},
                {text: "C. 非常热爱，愿意投入大量时间和精力", score: 3}
            ]
        },
        {
            id: 34,
            text: "你在团队中更适合的角色是：",
            options: [
                {text: "A. 跟随者，执行他人的计划", score: 1},
                {text: "B. 协调者，促进团队合作", score: 2},
                {text: "C. 领导者，提出创新的想法", score: 3}
            ]
        },
        {
            id: 35,
            text: "你如何处理工作中的失败？",
            options: [
                {text: "A. 感到非常沮丧，怀疑自己的能力", score: 1},
                {text: "B. 会难过，但会尝试从中学习", score: 2},
                {text: "C. 能理性对待，将其视为成长的机会", score: 3}
            ]
        },
        {
            id: 36,
            text: "你对成功的定义是：",
            options: [
                {text: "A. 拥有财富和地位", score: 1},
                {text: "B. 工作稳定，家庭幸福", score: 2},
                {text: "C. 实现自己的理想，帮助他人", score: 3}
            ]
        },
        {
            id: 37,
            text: "你通常如何处理工作压力？",
            options: [
                {text: "A. 容易被压力压垮，影响工作效率", score: 1},
                {text: "B. 会有些影响，但能调整自己", score: 2},
                {text: "C. 能将压力转化为动力，提高工作效率", score: 3}
            ]
        },
        {
            id: 38,
            text: "你对职业发展的规划是：",
            options: [
                {text: "A. 没有明确规划，走一步看一步", score: 1},
                {text: "B. 有大致规划，但不够具体", score: 2},
                {text: "C. 有详细的规划，并不断努力实现", score: 3}
            ]
        },
        {
            id: 39,
            text: "你更愿意从事的工作类型是：",
            options: [
                {text: "A. 按部就班，不需要太多创新", score: 1},
                {text: "B. 既有常规工作，也有创新空间", score: 2},
                {text: "C. 充满挑战，需要不断创新", score: 3}
            ]
        },
        {
            id: 40,
            text: "你认为工作的意义在于：",
            options: [
                {text: "A. 赚钱养家，维持生活", score: 1},
                {text: "B. 实现个人价值，获得成就感", score: 2},
                {text: "C. 为社会做出贡献，帮助他人", score: 3}
            ]
        }
    ]
};

// 维度名称映射
const dimensionNames = {
    dimension1: "亲密关系与边界建立",
    dimension2: "心力管理",
    dimension3: "自我认知与内在成长",
    dimension4: "职业与价值实现"
};