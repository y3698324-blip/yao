## 问题分析

经过检查，发现Canvas图表变形的主要原因是CSS样式和Chart.js配置之间的冲突：

1. **CSS样式冲突**：在`styles.css`文件的第1471-1475行，有强制设置canvas宽高为100%的样式：
   ```css
   .chart-container canvas {
       display: block;
       width: 100% !important;
       height: 100% !important;
   }
   ```

2. **Chart.js配置问题**：在`utils.js`中的`drawRadarChart`函数设置了`maintainAspectRatio: false`，允许图表拉伸以适应容器，但结合上面的CSS样式，就会导致图表变形。

3. **多个CSS定义冲突**：`styles.css`文件中有多个`.chart-container`样式定义，可能导致样式优先级问题。

## 修复方案

### 1. 修复雷达图变形（test.html中的雷达图）

修改`utils.js`中的`drawRadarChart`函数，将`maintainAspectRatio`设置为`true`，并添加合适的`aspectRatio`值：

```javascript
const config = {
    type: 'radar',
    data: data,
    options: {
        responsive: true,
        maintainAspectRatio: true, // 改为true
        aspectRatio: 1, // 添加合适的宽高比
        // 其他配置...
    }
};
```

### 2. 修复运营端图表变形（admin.html中的饼图和柱状图）

已经修复，不需要额外修改。

### 3. 优化CSS样式

移除或修改`styles.css`中强制设置canvas宽高为100%的样式，避免样式冲突：

```css
/* 修改前 */
.chart-container canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
}

/* 修改后 */
.chart-container canvas {
    display: block;
    /* 移除强制宽高设置 */
}
```

## 修复后的代码

### 1. 修改`utils.js`中的`drawRadarChart`函数

```javascript
/** 
 * 绘制雷达图 
 * @param {Object} scores - 各维度分数对象 
 * @param {string} canvasId - Canvas元素的ID 
 */ 
function drawRadarChart(scores, canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    if (!ctx) return null;
    
    // 如果已有图表实例，先销毁
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
    }
    
    // 正确的维度顺序：根据图片中的顺序
    // 左上：亲密关系 (dim1)
    // 右上：职业价值 (dim4)  
    // 右下：心力管理 (dim2)
    // 左下：自我认知 (dim3)
    
    const data = {
        labels: [
            '亲密关系',          // 12点方向
            '职业价值',          // 3点方向  
            '心力管理',          // 6点方向
            '自我认知'           // 9点方向
        ],
        datasets: [{
            label: '维度得分',
            data: [
                scores.dim1 || 0,  // 亲密关系
                scores.dim4 || 0,  // 职业价值
                scores.dim2 || 0,  // 心力管理
                scores.dim3 || 0   // 自我认知
            ],
            backgroundColor: 'rgba(102, 126, 234, 0.2)',
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(102, 126, 234, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };
    
    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true, // 改为true
            aspectRatio: 1, // 添加合适的宽高比
            scales: {
                r: {
                    beginAtZero: false,
                    min: 10,
                    max: 30,
                    ticks: {
                        stepSize: 5,
                        backdropColor: 'transparent',
                        color: '#666',
                        font: {
                            size: 12
                        }
                    },
                    angleLines: {
                        display: true,
                        lineWidth: 1,
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        circular: false,  // 设置为false以获得菱形网格
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#333'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}分`;
                        }
                    }
                }
            }
        }
    };
    
    // 创建图表实例
    window.radarChartInstance = new Chart(ctx, config);
    return window.radarChartInstance;
}
```

### 2. 修改`styles.css`中的canvas样式

```css
/* 修改前 */
.chart-container canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
}

/* 修改后 */
.chart-container canvas {
    display: block;
}
```

## 修复效果

1. **雷达图恢复正常**：通过设置`maintainAspectRatio: true`和`aspectRatio: 1`，确保雷达图保持正确的比例
2. **解决样式冲突**：移除强制设置canvas宽高的CSS样式，避免覆盖Chart.js的默认设置
3. **图表显示协调**：所有图表都将按照预期的比例显示，不再变形

## 验证方法

1. 打开测评系统，完成测评
2. 查看结果页面的雷达图是否显示正常
3. 检查运营端的饼图和柱状图是否正常
4. 调整浏览器窗口大小，验证图表是否能正确响应

修复已经完成，图表变形问题应该已经解决。