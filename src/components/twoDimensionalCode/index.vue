<template>
	<div class="login-scan-container">
		<div ref="qrcodeRef"></div>
	</div>
</template>

<script setup lang="ts">
import { watch, getCurrentInstance } from 'vue';
import QRCode from 'qrcodejs2-fixes';

const { proxy } = getCurrentInstance() as any;

const props = defineProps({
	ruleForm: {
		type: Object,
		default: () => { },
	},
	width: {
		type: Number,
		default: () => 100,
	},
	height: {
		type: Number,
		default: () => 100,
	}
})
// 初始化生成二维码
const initQrcode = () => {
	proxy.$refs.qrcodeRef.innerHTML = '';
	new QRCode(proxy.$refs.qrcodeRef, {
		text: props.ruleForm.qrcode,
		width: props.width,
		height: props.height,
		colorDark: '#000000',
		colorLight: '#ffffff',
	});
};

watch(
	() => props.ruleForm.qrcode,
	() => {
		console.log(props.ruleForm.qrcode, "props.state.ruleForm.qrcode");
		props.ruleForm.qrcode && initQrcode();
	},
	{
		deep: true,
	}
);

</script>

<style scoped lang="scss">
.login-scan-container {
	// padding: 20px;
	padding-top: 5px;
	display: flex;
	justify-content: center;
	animation: logoAnimation 0.3s ease;
}
</style>
