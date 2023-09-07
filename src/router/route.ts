import { RouteRecordRaw } from 'vue-router';

/**
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      isLink：        是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
 *      isHide：        是否隐藏此路由
 *      isKeepAlive：   是否缓存组件状态
 *      isAffix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
 *      auth：          当前路由权限标识（多个请用逗号隔开），最后转成数组格式，用于与当前用户权限进行对比，控制路由显示、隐藏
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

/**
 * 定义静态路由
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	{
		path: '/rule/edit',
		name: 'rule_edit',
		meta: {
			title: '规则链编辑',
		},
		component: () => import('@/views/rule/chain/component/edit.vue'),
	},
	{
		path: '/rule/view',
		name: 'rule_view',
		meta: {
			title: '规则链预览',
		},
		component: () => import('@/views/rule/chain/component/view.vue'),
	},
	{
		path: '/screen/view',
		name: 'screen_view',
		meta: {
			title: '组态预览',
		},
		component: () => import('@/views/visual/screen/component/view.vue'),
	},
	{
		path: '/screen/edit',
		name: 'screen_edit',
		meta: {
			title: '组态编辑',
		},
		component: () => import('@/views/visual/screen/component/edit.vue'),
	},
	{
		path: '/404',
		name: 'notFound',
		component: () => import('@/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('@/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
		},
	},
	// {
	// 	path: '/userManagement/userList/userDetails/:id',
	// 	name: 'userDetails',
	// 	component: () => import('@/views/userManagement/userList/component/userDetails/index.vue'),
	// 	meta: {
	// 		title: '用户详情',
	// 	},
	// }
];

// 暂时写死页面
export const newStaticRoutes = [
	{
		path: '/system',
		name: 'system',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '系统管理',
			isKeepAlive: false,
			icon: 'elementSetting',
		},
		children: [
			{
				path: '/system/user',
				name: 'user',
				component: () => import('@/views/system/user/index.vue'),
				meta: {
					title: '用户管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/role',
				name: 'role',
				component: () => import('@/views/system/role/index.vue'),
				meta: {
					title: '角色管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/menu',
				name: 'menu',
				component: () => import('@/views/system/menu/index.vue'),
				meta: {
					title: '菜单管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/api',
				name: 'api',
				component: () => import('@/views/system/api/index.vue'),
				meta: {
					title: 'API管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/dept',
				name: 'dept',
				component: () => import('@/views/system/dept/index.vue'),
				meta: {
					title: '组织管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/post',
				name: 'post',
				component: () => import('@/views/system/post/index.vue'),
				meta: {
					title: '岗位管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/dict',
				name: 'dict',
				component: () => import('@/views/system/dict/index.vue'),
				meta: {
					title: '字典管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system/equipmentRecord',
				name: 'equipmentRecord',
				component: () => import('@/views/system/equipmentRecord/index.vue'),
				meta: {
					title: '设备记录',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},


		],
	},
	{
		path: '/userManagement',
		name: 'userManagement',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '用户管理',
			isKeepAlive: false,
			icon: 'elementUser',
		},
		children: [
			{
				path: '/userManagement/userList',
				name: 'userList',
				component: () => import('@/views/userManagement/userList/index.vue'),
				meta: {
					title: '用户列表',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
				children: [
					{
						path: '/userManagement/userList/userDetails/:userID',
						name: 'userDetails',
						component: () => import('@/views/userManagement/userList/component/userDetails/index.vue'),
						meta: {
							title: '用户详情',
							isHide: true
						},
					}
				]
			},
			{
				path: '/userManagement/privilegedUser',
				name: 'privilegedUser',
				component: () => import('@/views/userManagement/privilegedUser/index.vue'),
				meta: {
					title: '特权用户',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/userManagement/blackList',
				name: 'blackList',
				component: () => import('@/views/userManagement/blackList/index.vue'),
				meta: {
					title: 'IP黑名单',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/userManagement/whiteList',
				name: 'whiteList',
				component: () => import('@/views/userManagement/whiteList/index.vue'),
				meta: {
					title: 'IP白名单',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			}
		],
	},
	{
		path: '/productConfiguration',
		name: 'productConfiguration',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '产品配置',
			isKeepAlive: false,
			icon: 'elementSchool',
		},
		children: [
			{
				path: '/productConfiguration/functionConfiguration',
				name: 'functionConfiguration',
				component: () => import('@/views/productConfiguration/functionConfiguration/index.vue'),
				meta: {
					title: '功能配置',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/productConfiguration/homePageConfiguration',
				name: 'homePageConfiguration',
				component: () => import('@/views/productConfiguration/homePageConfiguration/index.vue'),
				meta: {
					title: '发现页配置',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			}
		],
	},
	{
		path: '/groupManagement',
		name: 'groupManagement',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '群组管理',
			isKeepAlive: false,
			icon: 'elementAvatar',
		},
		children: [
			{
				path: '/groupManagement/groupChatList',
				name: 'groupChatList',
				component: () => import('@/views/groupManagement/groupChatList/index.vue'),
				meta: {
					title: '群聊列表',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			}
		],
	},
	{
		path: '/messageManagement',
		name: 'messageManagement',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '消息管理',
			isKeepAlive: false,
			icon: 'elementMessage',
		},
		children: [
			{
				path: '/messageManagement/privateMessage',
				name: 'privateMessage',
				component: () => import('@/views/messageManagement/privateMessage/index.vue'),
				meta: {
					title: '私聊消息',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/messageManagement/groupChatMessage',
				name: 'groupChatMessage',
				component: () => import('@/views/messageManagement/groupChatMessage/index.vue'),
				meta: {
					title: '群聊消息',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			}
		],
	},
	{
		path: '/systemInformation',
		name: 'systemInformation',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '系统消息',
			isKeepAlive: false,
			icon: 'elementMessageBox',
		},
		children: [
			{
				path: '/systemInformation/sendingSystemMessage',
				name: 'sendingSystemMessage',
				component: () => import('@/views/systemInformation/sendingSystemMessage/index.vue'),
				meta: {
					title: '发送系统消息',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
			// {
			// 	path: '/systemInformation/groupAutoRecover',
			// 	name: 'groupAutoRecover',
			// 	component: () => import('@/views/systemInformation/groupAutoRecover/index.vue'),
			// 	meta: {
			// 		title: '群组自动回复',
			// 		isLink: '',
			// 		isHide: false,
			// 		isKeepAlive: false,
			// 		isAffix:false,
			// 		isIframe: false,
			// 		// icon: 'iconfont icon-shouye',
			// 	},
			// }
		],
	},
	{
		path: '/sensitiveWordManagement',
		name: 'sensitiveWordManagement',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '敏感词管理',
			isKeepAlive: false,
			icon: 'elementInfoFilled',
		},
		children: [
			{
				path: '/sensitiveWordManagement/sensitiveWordList',
				name: 'sensitiveWordList',
				component: () => import('@/views/sensitiveWordManagement/sensitiveWordList/index.vue'),
				meta: {
					title: '敏感词列表',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'iconfont icon-shouye',
				},
			},
		],
	},
	{
		path: '/operations',
		name: 'operations',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '操作日志',
			isKeepAlive: false,
			icon: 'elementComment',
		},
		children: [
			{
				path: '/operations/operation',
				name: 'operation',
				component: () => import('@/views/operations/operation/index.vue'),
				meta: {
					title: '操作日志',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'elementComment',
				},
			}
		]
	},
	{
		path: '/feedbackManagement',
		name: 'feedbackManagement',
		component: () => import('@/layout/index.vue'),
		meta: {
			title: '反馈管理',
			isKeepAlive: false,
			icon: 'elementComment',
		},
		children: [
			{
				path: '/feedbackManagement/feedback',
				name: 'feedback',
				component: () => import('@/views/feedbackManagement/feedback/index.vue'),
				meta: {
					title: '意见反馈',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: false,
					// icon: 'elementComment',
				},
			}
		]
	},
] 