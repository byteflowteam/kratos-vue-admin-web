<template>
  <div class="h100">
    <router-view />
    <!-- <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive :include="keepAliveNameList">
          <component :is="Component" :key="refreshRouterViewKey" class="w100" />
        </keep-alive>
      </transition>
    </router-view> -->
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
  nextTick,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useThemeConfigStateStore } from "@/stores/themeConfig";
import { useKeepAliveNamesStore } from "@/stores/keepAliveNames";
export default defineComponent({
  name: "layoutParentView",
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const route = useRoute();
    const theme = useThemeConfigStateStore();
    const keepAliveNames = useKeepAliveNamesStore();
    const state: any = reactive({
      refreshRouterViewKey: null,
      keepAliveNameList: [],
      keepAliveNameNewList: [],
    });
    // 设置主界面切换动画
    const setTransitionName = computed(() => {
      return theme.themeConfig.animation;
    });
    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return theme.themeConfig;
    });
    // 获取组件缓存列表(name值)
    const getKeepAliveNames = computed(() => {
      return keepAliveNames.keepAliveNames;
    });
    // 页面加载前，处理缓存，页面刷新时路由缓存处理
    onBeforeMount(() => {
      console.log(state.refreshRouterViewKey, "state.refreshRouterViewKey");

      state.keepAliveNameList = getKeepAliveNames.value;
      proxy.mittBus.on("onTagsViewRefreshRouterView", (fullPath: string) => {
        state.keepAliveNameList = getKeepAliveNames.value.filter(
          (name: string) => route.name !== name
        );
        state.refreshRouterViewKey = null;
        nextTick(() => {
          state.refreshRouterViewKey = fullPath;
          state.keepAliveNameList = getKeepAliveNames.value;
        });
      });
    });
    // 页面卸载时
    onUnmounted(() => {
      proxy.mittBus.off("onTagsViewRefreshRouterView");
    });
    // 监听路由变化，防止 tagsView 多标签时，切换动画消失
    watch(
      () => route.fullPath,
      () => {
        state.refreshRouterViewKey = route.fullPath;
      }
    );
    return {
      getThemeConfig,
      getKeepAliveNames,
      setTransitionName,
      ...toRefs(state),
    };
  },
});
</script>
