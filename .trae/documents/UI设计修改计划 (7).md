# UI设计修改计划

## 一、页面结构分析

### 1. 基本信息页面结构
- 独立的div容器（basic-info-page）
- 包含h2标题
- 包含form表单（basic-info-form）
- 表单内包含多个input-group
- 每个input-group包含label和select-options
- 底部包含提交按钮

### 2. 测评页面当前结构
- 独立的div容器（testing-page）
- 包含dimension-nav导航栏
- 包含progress-bar进度条
- 包含dimension-title标题
- 包含questions-list题目列表
- 包含nav-buttons导航按钮
- 包含complete-test-btn完成测评按钮

## 二、修改方案

### 1. 移除内嵌结构
- 移除dimension-nav导航栏
- 移除progress-bar进度条
- 移除nav-buttons导航按钮

### 2. 整合页面结构
- 将四个维度的题目直接展示在testing-page中，类似于基本信息页面的input-group
- 每个维度的题目作为一个独立的版块，包含标题和题目列表
- 底部包含统一的下一步按钮

### 3. 统一样式
- 确保testing-page的样式与basic-info-page一致
- 确保标题样式一致
- 确保题目版块样式与input-group一致
- 确保按钮样式一致

## 三、代码修改

### 1. HTML结构修改
```html
<!-- 四维度测评页面 -->
<div id="testing-page" style="display: none;">
    <h2>测评题目</h2>
    
    <!-- 维度1：亲密关系与边界建立 -->
    <div class="input-group">
        <h3>一、亲密关系与边界建立</h3>
        <div id="dimension1-questions-list" class="questions-list">
            <!-- 动态加载10道题 -->
        </div>
    </div>
    
    <!-- 维度2：心力管理 -->
    <div class="input-group">
        <h3>二、心力管理</h3>
        <div id="dimension2-questions-list" class="questions-list">
            <!-- 动态加载10道题 -->
        </div>
    </div>
    
    <!-- 维度3：自我认知与内在成长 -->
    <div class="input-group">
        <h3>三、自我认知与内在成长</h3>
        <div id="dimension3-questions-list" class="questions-list">
            <!-- 动态加载10道题 -->
        </div>
    </div>
    
    <!-- 维度4：职业与价值实现 -->
    <div class="input-group">
        <h3>四、职业与价值实现</h3>
        <div id="dimension4-questions-list" class="questions-list">
            <!-- 动态加载10道题 -->
        </div>
    </div>
    
    <!-- 下一步按钮 -->
    <div style="text-align: center; margin-top: 30px;">
        <button type="button" class="btn btn-primary" id="next-btn">下一步</button>
    </div>
    
    <!-- 完成测评按钮 -->
    <div style="text-align: center; margin-top: 20px; margin-bottom: 30px;">
        <button class="btn btn-primary" id="complete-test-btn" style="padding: 16px 48px; font-size: 18px; display: none;">完成测评</button>
    </div>
</div>
```

### 2. CSS样式修改
```css
/* 确保测评页面样式与基本信息页面一致 */
#testing-page {
    background-color: var(--background-color);
    padding: 24px;
    margin-bottom: 0;
}

/* 确保标题样式一致 */
#testing-page h2 {
    font-size: 20px;
    color: var(--primary-color);
    margin-bottom: 24px;
    text-align: center;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--border-color);
}

/* 确保每个维度标题样式一致 */
#testing-page .input-group h3 {
    font-size: 18px;
    color: var(--text-primary);
    margin-bottom: 16px;
    text-align: left;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border-color);
}

/* 确保题目列表样式一致 */
#testing-page .questions-list {
    margin-top: 16px;
    margin-bottom: 0;
}
```

### 3. JavaScript逻辑修改
- 移除dimension-nav导航栏的事件监听
- 移除progress-bar进度条的更新逻辑
- 修改nav-buttons导航按钮的事件监听
- 调整next-btn的点击事件处理逻辑

## 四、预期效果

1. **结构统一**：测评页面与基本信息页面结构一致
2. **样式统一**：两个页面的样式一致，没有内嵌的感觉
3. **功能完整**：保留所有核心功能
4. **用户体验**：页面流畅，没有冗余的导航和进度条

## 五、注意事项

1. 确保四个维度的题目都能正常显示
2. 确保下一步按钮能正常切换维度
3. 确保完成测评按钮能正常显示和点击
4. 确保样式与基本信息页面一致
5. 确保没有内嵌的感觉，是页面的一部分