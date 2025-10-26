<template>
  <div class="floating-ball" @click="$emit('click')">
    <span class="era-logo" aria-hidden="true">ERA</span>
    <!-- 仅显示用；不拦截事件 -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Logger } from '../../utils/log';

const logger = new Logger();
defineEmits(['click']);

onMounted(() => {
  logger.log('onMounted', 'FloatingBall.vue 组件已挂载');
});
</script>

<style scoped>
/* =========================
   可调外观变量（局部作用域）
   ========================= */
.floating-ball {
  --size: 50px; /* 直径：保持默认 50px，与原始一致 */
  --hue: 212; /* 主色相：212≈#007bff，方便全局协调色相 */
  --sat: 100%; /* 饱和度：更鲜亮 */
  --lum: 52%; /* 明度：主色的明度 */
  --surface: hsl(var(--hue) var(--sat) var(--lum)); /* 主表面色 */
  --surface-2: hsl(var(--hue) 95% 64%); /* 渐变第二色，略亮 */
  --ring: hsl(calc(var(--hue) + 20) 95% 65%); /* 外环的点缀色，偏青一点 */
  --shadow: rgba(0, 123, 255, 0.36); /* 阴影颜色（与主色相近） */
  --glow: rgba(102, 200, 255, 0.55); /* 外发光颜色 */
  --inner-shadow: rgba(0, 0, 0, 0.22); /* 内阴影增强体积感 */
  --specular: rgba(255, 255, 255, 0.75); /* 高光 */
  --glass: rgba(255, 255, 255, 0.18); /* 玻璃质感覆盖层 */
  width: var(--size); /* 宽度设为可变量 */
  height: var(--size); /* 高度设为可变量 */
  border-radius: 50%; /* 圆形 */
  position: relative; /* 作为伪元素定位参照 */
  display: grid; /* 用 grid 实现精确居中 */
  place-items: center; /* 居中对齐 */
  cursor: pointer; /* 手型光标（仅视觉，不改逻辑） */
  user-select: none; /* 防止误选中文本 */
  -webkit-tap-highlight-color: transparent; /* 移动端点击高亮去除 */
  background:
    radial-gradient(
      120% 120% at 30% 28%,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.22) 18%,
      rgba(255, 255, 255, 0) 36%
    ),
    /* 玻璃高光 */ radial-gradient(120% 120% at 70% 72%, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0) 38%),
    /* 微内阴影，增加体积 */ conic-gradient(from 210deg at 50% 50%, var(--surface), var(--surface-2), var(--surface)); /* 主表面渐变：柔和流动感 */
  box-shadow:
    inset 0 2px 6px var(--inner-shadow),
    /* 内阴影：球体边缘收束 */ 0 2px 4px rgba(0, 0, 0, 0.08),
    /* 基础投影：贴地感 */ 0 10px 22px var(--shadow); /* 远投影：悬浮感 */
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    filter 0.28s ease; /* 悬停时的平滑过渡 */
  will-change: transform, box-shadow, filter; /* 提示浏览器优化 */
  animation: ball-bob 3.2s ease-in-out infinite; /* 轻微上下浮动 */
}

/* 光晕外环（纯视觉层），不占点击区域 */
.floating-ball::after {
  content: ''; /* 生成外环层 */
  position: absolute; /* 绝对定位贴合父元素 */
  inset: -8px; /* 向外延展 8px，制造发光边缘 */
  border-radius: 50%; /* 保持圆形 */
  background: conic-gradient(
    from 0deg,
    var(--ring),
    transparent 30%,
    transparent 70%,
    var(--ring)
  ); /* 细腻的色环闪烁 */
  filter: blur(6px); /* 模糊成柔和光晕 */
  opacity: 0.55; /* 半透明，避免喧宾 */
  pointer-events: none; /* 不拦截鼠标事件 */
  mask: radial-gradient(farthest-side, transparent calc(100% - 12px), #000 0); /* 掏空中心形成环 */
  animation: ring-spin 12s linear infinite; /* 慢速旋转，低侵扰 */
}

/* 玻璃高光层（更立体） */
.floating-ball::before {
  content: ''; /* 生成高光层 */
  position: absolute; /* 绝对定位 */
  inset: 2px; /* 缩进一点，保留边缘 */
  border-radius: 50%; /* 圆形 */
  background:
    radial-gradient(120% 80% at 26% 24%, var(--specular) 0%, rgba(255, 255, 255, 0.2) 26%, rgba(255, 255, 255, 0) 46%),
    /* 亮斑 */ linear-gradient(160deg, var(--glass) 0%, rgba(255, 255, 255, 0) 50%); /* 玻璃蒙层 */
  mix-blend-mode: screen; /* 与底色叠加更自然 */
  pointer-events: none; /* 不拦截事件 */
  transition:
    opacity 0.28s ease,
    transform 0.28s ease; /* 悬停联动 */
}

/* 悬停态：轻微抬升+增强光影 */
.floating-ball:hover {
  transform: translateY(-2px) scale(1.04); /* 轻微升起并放大 */
  box-shadow:
    inset 0 2px 8px rgba(0, 0, 0, 0.22),
    /* 内阴影略加强 */ 0 4px 10px rgba(0, 0, 0, 0.12),
    /* 近影增强 */ 0 16px 36px rgba(0, 123, 255, 0.45); /* 远影更亮，呈现发光 */
  filter: saturate(1.08); /* 提升饱和度一点点 */
}

/* 悬停时的微光扫过效果 */
.floating-ball:hover::before {
  opacity: 0.95; /* 高光更显著 */
  animation: shimmer 1.2s ease-out; /* 一次性高光掠过 */
}

/* 按下态：略压低 */
.floating-ball:active {
  transform: translateY(0) scale(0.98); /* 回落一点并轻微压扁 */
  box-shadow:
    inset 0 2px 10px rgba(0, 0, 0, 0.28),
    0 2px 6px rgba(0, 0, 0, 0.12),
    0 10px 22px rgba(0, 123, 255, 0.35); /* 回到接近初始的阴影 */
}

/* 可达性：键盘聚焦时的可见描边（不改变布局） */
.floating-ball:focus-visible {
  outline: 2px solid rgba(102, 200, 255, 0.85); /* 高亮描边 */
  outline-offset: 2px; /* 外移 2px，避免遮挡球体 */
}

/* 减少动态偏好：关闭动画保持静态优雅 */
@media (prefers-reduced-motion: reduce) {
  .floating-ball {
    animation: none;
  } /* 去除上下浮动 */
  .floating-ball::after {
    animation: none;
  } /* 停止外环旋转 */
}

/* 轻微上下浮动（循环） */
@keyframes ball-bob {
  0%,
  100% {
    transform: translateY(0);
  } /* 起点/终点：原位 */
  50% {
    transform: translateY(-2px);
  } /* 中点：上浮 2px */
}

/* 外环慢速旋转（不刺眼） */
@keyframes ring-spin {
  0% {
    transform: rotate(0deg);
  } /* 起点：0 度 */
  100% {
    transform: rotate(360deg);
  } /* 终点：整周旋转 */
}

/* 悬停时的高光扫过 */
@keyframes shimmer {
  0% {
    transform: translateY(-1px) scale(0.98);
    opacity: 0.6;
  } /* 初始：弱一点的高光 */
  50% {
    transform: translateY(-2px) scale(1.02);
    opacity: 1;
  } /* 中段：最亮最大 */
  100% {
    transform: translateY(-1px) scale(0.99);
    opacity: 0.85;
  } /* 结束：回落 */
}

/* ======= ERA 内标（仅视觉层） ======= */
.floating-ball {
  --logo-scale: 0.38;
} /* 可调：字体占球直径比例 */

.era-logo {
  font-weight: 800; /* 粗体，增强刻感 */
  font-size: calc(var(--size) * var(--logo-scale)); /* 跟随球大小缩放 */
  letter-spacing: 0.02em; /* 轻微字距，避免糊 */
  line-height: 1; /* 紧凑对齐 */
  transform: translateY(-1px); /* 视觉微调居中 */
  white-space: nowrap; /* 防止换行 */
  user-select: none;
  pointer-events: none; /* 不抢事件、不选中 */
  z-index: 1; /* 位于背景之上（仍在 ::after 光环之下） */

  /* 渐变镂空字 + 立体阴影 */
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(255, 255, 255, 0.55) 45%,
      rgba(220, 240, 255, 0.4) 65%,
      rgba(120, 195, 255, 0.55) 100%
    ),
    /* 高光到冷蓝的层次 */ linear-gradient(180deg, rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0) 60%); /* 轻内阴影 */
  -webkit-background-clip: text;
  background-clip: text; /* 渐变裁剪到文字 */
  color: transparent; /* 镂空填充由背景提供 */
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75),
    /* 顶部掣光 */ 0 2px 4px rgba(0, 0, 0, 0.25),
    /* 近阴影 */ 0 8px 18px rgba(0, 123, 255, 0.35); /* 远发光阴影 */
  filter: drop-shadow(0 0 2px rgba(102, 200, 255, 0.25)); /* 柔光晕 */
  animation: era-sheen 4s ease-in-out infinite; /* 轻微高光流动 */
}

.floating-ball:hover .era-logo {
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.85),
    0 3px 8px rgba(0, 0, 0, 0.28),
    0 10px 26px rgba(0, 123, 255, 0.55); /* 悬停增强立体感 */
  filter: drop-shadow(0 0 3px rgba(102, 200, 255, 0.38)); /* 发光略加强 */
}

/* 高光缓慢上移，制造玻璃流光感（低侵扰） */
@keyframes era-sheen {
  0%,
  100% {
    background-position:
      0% 0%,
      0% 0%;
  }
  50% {
    background-position:
      0% 40%,
      0% 0%;
  }
}
</style>
