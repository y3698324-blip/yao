# UI设计修改计划

## 一、页面结构分析

### 1. 当前问题
- 题目容器（questions-container）和导航按钮（nav-buttons）是分开的并行结构
- 导航按钮固定在文档流中，不会随每个维度的题目滚动
- 用户希望按钮合并到每个维度的题目版块中，随题目滚动到底部才出现

### 2. 解决方案
- 重新调整HTML结构，将导航按钮移动到每个维度题目内部
- 每个维度的题目版块包含：维度标题 + 题目列表 + 导航按钮
- 移除Intersection Observer，简化按钮显示逻辑
- 确保按钮始终显示在每个维度题目的底部

## 二、HTML结构调整

### 1. 代码修改
- 将`nav-buttons`元素从`questions-container`外部移动到每个`dimension-questions`内部
- 确保每个维度的题目版块都包含自己的导航按钮
- 移除原有的外部`nav-buttons`元素

### 2. 预期结构
```html
<div id="questions-container" class="questions-container">
    <!-- 维度1：亲密关系与边界建立 -->
    <div id="dimension1-questions" class="dimension-questions">
        <h3>一、亲密关系与边界建立</h3>
        <div id="dimension1-questions-list" class="questions-list">
            <!-- 动态加载10道题 -->
        </div>
        <!-- 导航按钮 -->
        <div class="nav-buttons">
            <button class="btn btn-secondary" id="prev-btn">上一步</button>
            <button class="btn btn-primary" id="next-btn">下一步</button>
        </div>
    </div>
    
    <!-- 维度2：心力管理 -->
    <div id="dimension2-questions" class="dimension-questions">
        <h3>二、心力管理</h3>
        <div id="dimension2-questions-list" class="questions-list">
            <!-- 动态加载10道题 -->
        </div>
        <!-- 导航按钮 -->
        <div class="nav-buttons">
            <button class="btn btn-secondary" id="prev-btn">上一步</button>
            <button class="btn btn-primary" id="next-btn">下一步</button>
        </div>
    </div>
    <!-- 其他维度类似 -->
</div>
```

## 三、CSS样式调整

### 1. 代码修改
- 移除Intersection Observer相关的CSS样式
- 简化`nav-buttons`的CSS样式
- 确保按钮始终显示在每个维度题目的底部
- 调整按钮与题目列表之间的间距

### 2. 预期样式
- 按钮始终显示，不需要动态隐藏
- 按钮位于每个维度题目的底部
- 按钮样式与题目风格一致

## 四、JavaScript逻辑调整

### 1. 代码修改
- 移除Intersection Observer相关的JavaScript代码
- 简化按钮显示逻辑，按钮始终显示
- 确保导航按钮的点击事件仍然正常工作

### 2. 预期行为
- 点击"上一步"按钮，切换到上一个维度
- 点击"下一步"按钮，切换到下一个维度
- 按钮始终显示在每个维度题目的底部

## 五、技术实现细节

### 1. 导航按钮复用
- 每个维度使用相同的导航按钮ID
- JavaScript代码通过ID引用按钮，不需要修改
- 确保按钮的点击事件处理逻辑正确

### 2. 完成测评按钮处理
- 保留完成测评按钮，确保其在所有维度完成后显示
- 确保完成测评按钮的点击事件处理逻辑正确

## 六、预期效果

1. **结构合并**：题目和导航按钮合并在一个版块中
2. **随题滚动**：导航按钮随题目滚动，位于每个维度题目的底部
3. **始终显示**：按钮始终显示，不需要动态隐藏
4. **功能正常**：上一步/下一步按钮功能正常
5. **用户体验**：用户滚动到当前维度题目的底部时，自然看到导航按钮

## 七、注意事项

1. 确保每个维度的题目版块都包含导航按钮
2. 确保导航按钮的ID和class保持一致
3. 移除不必要的Intersection Observer代码
4. 确保按钮的点击事件处理逻辑正确
5. 确保完成测评按钮的显示逻辑正确