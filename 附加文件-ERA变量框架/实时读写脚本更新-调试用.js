(() => {
  // 自执行：不泄露临时变量
  const url = encodeURI('http://localhost:5500/dist/ERA变量框架/index.js');
  const s = document.createElement('script'); // 创建<script>标签
  s.src = url; // 设置要加载的脚本地址
  //s.async = false; // 关闭异步：保证按插入顺序执行，接近内联效果
  s.onload = () => console.log('已加载并执行：', url); // 成功回调：打印提示
  s.onerror = e => console.error('加载失败：', url, e); // 失败回调：打印错误
  document.head.appendChild(s); // 插入到<head>触发下载与执行
})();


(() => {
  const url = encodeURI('http://localhost:5500/dist/ERA变量框架/index.js') + '?v=' + Date.now();
  const s = document.createElement('script');
  s.src = url;
  s.async = false;
  s.onload = () => console.log('《ERA》已加载并执行：', url);
  s.onerror = e => console.error('《ERA》加载失败：', url, e);
  document.head.appendChild(s);
})();
