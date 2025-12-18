**问题分析**：
雷达图的canvas元素没有居中显示，而是偏移到了容器的一侧。虽然外层的`.chart-section`有`text-align: center;`，`.chart-container`有`margin: 0 auto;`，但`canvas`是块级元素，这些样式对它的水平居中没有直接效果。

**解决方案**：
为`canvas`元素添加`margin: 0 auto;`样式，使其在`.chart-container`容器中水平居中。

**具体修改位置**：
在`styles.css`文件中，修改或添加`.chart-container canvas`的样式，添加`margin: 0 auto;`属性。

**修改效果**：
修复后，canvas元素将在`.chart-container`容器中水平居中显示，雷达图整体也会居中，不再偏移到一侧。

**验证方法**：
修改后，刷新页面查看雷达图是否居中显示。