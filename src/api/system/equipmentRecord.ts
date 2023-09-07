import request from '@/utils/request';


/**
 * 获取设备列表
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function deviceList(params: any) {
	return request({
		url: '/device/list',
		method: 'get',
		params
	});
}


/**
 * 用户所有的设备都登出
 * @param params 要传的参数值
 * @returns 返回接口数据
 */
export function deviceLogout(data: any) {
	return request({
		url: '/device/logout',
		method: 'post',
		data
	});
}
