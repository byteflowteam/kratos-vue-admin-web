// 性别字典 -1=全部，0=女，1=男
export const sys_user_sex = [
    {
        dictValue: -1,
        dictLabel: '全部'
    },
    {
        dictValue: 0,
        dictLabel: '女'
    }
    , {
        dictValue: 1,
        dictLabel: '男'
    }
]
// 启用状态字典
export const sys_normal_disable = [
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 2,
        dictLabel: '停用'
    }
]

// 启用禁用状态字典
export const sys_enable_disable = [
    {
        dictValue: -1,
        dictLabel: '全部'
    },
    {
        dictValue: 1,
        dictLabel: '启用'
    },
    {
        dictValue: 0,
        dictLabel: '禁用'
    }
]
// 在线状态，1-正常，2-异常
export const sys_zx = [
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 2,
        dictLabel: '异常'
    }
]

//用户列表 账号状态 -1=全部，0=冻结，1=正常
export const sys_user_status = [
    {
        dictValue: -1,
        dictLabel: '全部'
    },
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 0,
        dictLabel: '冻结'
    }
]

//用户列表 iP白名单 状态 0=否，1=是
export const sys_ipWhile_status = [
    {
        dictValue: 1,
        dictLabel: '是'
    },
    {
        dictValue: 0,
        dictLabel: '否'
    }
]
// 在群状态 -1全部  0=禁言中，1=正常
export const sys_group_status = [
    {
        dictValue: -1,
        dictLabel: '全部'
    },
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 0,
        dictLabel: '禁言中'
    }
]
// 在群身份 100=群主，60=群管理员，30=群成员
export const sys_groupStanding_status = [
    {
        dictValue: -1,
        dictLabel: '全部'
    },
    {
        dictValue: 100,
        dictLabel: '群主'
    },
    {
        dictValue: 60,
        dictLabel: '群管理员'
    },
    {
        dictValue: 30,
        dictLabel: '群成员'
    }
]
//白名单 身份 0=普通用户，1=特权用户
export const sys_role_status = [
    {
        dictValue: 0,
        dictLabel: '普通用户'
    },
    {
        dictValue: 1,
        dictLabel: '特权用户'
    }
]
// 平台 - Android、iOS、Windows 、Web、Mac、iPad、Unknown
export const sys_platform = [
    {
        dictValue: 'Android',
        dictLabel: 'Android'
    },
    {
        dictValue: 'iOS',
        dictLabel: 'iOS'
    },
    {
        dictValue: 'Windows',
        dictLabel: 'Windows'
    },
    {
        dictValue: 'Web',
        dictLabel: 'Web'
    },
    {
        dictValue: 'Mac',
        dictLabel: 'Mac'
    },
    {
        dictValue: 'iPad',
        dictLabel: 'iPad'
    },
    {
        dictValue: 'Unknown',
        dictLabel: 'Unknown'
    }
]

// 平台 - Android、iOS、Windows 、Web、Mac、iPad、Unknown
export const sys_sf = [
    {
        dictValue: '普通用户',
        dictLabel: '普通用户'
    },
    {
        dictValue: '特权用户',
        dictLabel: '特权用户'
    }
]
//特权用户状态 0=冻结，1=正常  2是全部',
export const sys_tqStatus_status = [
    {
        dictValue: 2,
        dictLabel: '全部'
    },
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 0,
        dictLabel: '冻结'
    }
]
// `特权用户'是否在IP白名单, 0=不是，1=是 2 是全部',
//用户列表 iP白名单 状态 0=否，1=是
export const sys_tqipWhile_status = [
    {
        dictValue: 2,
        dictLabel: '全部'
    },
    {
        dictValue: 1,
        dictLabel: '是'
    },
    {
        dictValue: 0,
        dictLabel: '不是'
    }
]
// `特权用户'好友特权
export const sys_friend_privileges_status = [
    {
        dictValue: 2,
        dictLabel: '禁用'
    },
    {
        dictValue: 1,
        dictLabel: '站点禁止加好友时不受限制'
    }
]
// `特权用户'群组特权
export const sys_group_privileges_status = [
    {
        dictValue: 2,
        dictLabel: '禁用'
    },
    {
        dictValue: 1,
        dictLabel: '不受限制创建群聊'
    }
]

// 接受者
export const sys_lx_disable = [
    {
        dictValue: '系统通知',
        dictLabel: '系统通知'
    },
]

// 接受者
export const sys_jsz_disable = [
    {
        dictValue: '全部',
        dictLabel: '全部'
    },
    {
        dictValue: '指定用户',
        dictLabel: '指定用户'
    },
    // {
    //     dictValue: '新用户',
    //     dictLabel: '新用户'
    // }
]
// 接受者
export const sys_zt_disable = [
    {
        dictValue: '',
        dictLabel: '全部'
    },
    {
        dictValue: '成功',
        dictLabel: '成功'
    },
    {
        dictValue: '失败',
        dictLabel: '失败'
    },
]

//发现配置页 是否上架的字段 1 上架 2不上架
export const sys_online_status = [
    {
        dictValue: 1,
        dictLabel: '上架'
    },
    {
        dictValue: 2,
        dictLabel: '不上架'
    }
]
// 群组状态，1-正常，2-群禁言，3-群封禁
export const sys_qz_disable = [
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 2,
        dictLabel: '群禁言'
    },
    {
        dictValue: 3,
        dictLabel: '群封禁'
    },
]

// 用户身份，1 - 群主，2 - 管理员，3 - 普通成员
export const sys_qz = [
    {
        dictValue: 1,
        dictLabel: '群主'
    },
    {
        dictValue: 2,
        dictLabel: '管理员'
    },
    {
        dictValue: 3,
        dictLabel: '普通成员'
    }
]

export const sys_zts = [
    {
        dictValue: 1,
        dictLabel: '正常'
    },
    {
        dictValue: 2,
        dictLabel: '禁言'
    }
]
// 状态, 已处理、未处理
export const sys_feed_status = [
    {
        dictValue: '已处理',
        dictLabel: '已处理'
    },
    {
        dictValue: '未处理',
        dictLabel: '未处理'
    }
]

export default {
    sys_user_sex,
    sys_normal_disable,
    sys_enable_disable,
    sys_zx,
    sys_platform
}