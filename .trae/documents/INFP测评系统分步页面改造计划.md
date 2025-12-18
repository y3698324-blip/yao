# INFP测评系统分步页面改造计划

## 1. 需求分析
- 将测评分为四个独立量表页面，每个页面10道题
- 每个页面所有内容在同一视窗内显示，无内嵌滚动
- 用户必须完成当前页面所有题目才能进入下一页
- 底部固定操作按钮，根据步骤动态显示文本
- 顶部或底部显示进度提示（步骤 1/4）

## 2. HTML结构修改
- 在`testing-page`内添加步骤容器，将四个维度的题目分别放入独立的步骤div
- 每个步骤div添加唯一ID和`step-page`类
- 添加进度显示元素
- 统一按钮ID和样式

```html
<div id="testing-page" style="display: none;">
    <div class="progress-indicator">步骤 1/4</div>
    <h2>测评题目</h2>
    
    <!-- 步骤1：亲密关系与边界建立 -->
    <div id="step1" class="step-page" style="display: block;">
        <form class="testing-form">
            <!-- 10道题 -->
        </form>
        <div class="step-actions">
            <button type="button" class="btn btn-primary" id="next-btn">下一页</button>
        </div>
    </div>
    
    <!-- 步骤2-4：类似结构 -->
</div>
```

## 3. CSS样式修改
- 设置`step-page`类为flex布局，确保内容和按钮在同一视窗
- 题目区域设置max-height，确保所有10道题能在视窗内显示
- 按钮区域固定在底部，与题目区域保持整体性

```css
.step-page {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 120px);
}

.questions-list {
    max-height: 60vh;
    overflow-y: auto;
}

.step-actions {
    margin-top: auto;
    padding: 20px 0;
    text-align: center;
}

.progress-indicator {
    text-align: center;
    font-size: 16px;
    color: var(--text-secondary);
    margin-bottom: 10px;
}
```

## 4. JavaScript逻辑修改
- 添加步骤管理变量：`currentStep`
- 实现步骤切换函数：`goToStep(step)`
- 实现题目验证函数：`validateCurrentStep()`
- 实现按钮点击处理：`handleNextStep()`
- 动态更新进度和按钮文本

```javascript
// 测评状态管理添加currentStep
const testState = {
    currentStep: 1,
    // 其他状态...
};

// 步骤切换函数
function goToStep(step) {
    // 隐藏所有步骤
    document.querySelectorAll('.step-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // 显示目标步骤
    document.getElementById(`step${step}`).style.display = 'block';
    
    // 更新进度指示
    document.querySelector('.progress-indicator').textContent = `步骤 ${step}/4`;
    
    // 更新按钮文本
    const nextBtn = document.getElementById('next-btn');
    nextBtn.textContent = step === 4 ? '完成测评' : '下一页';
    
    // 更新当前步骤
    testState.currentStep = step;
}

// 验证当前步骤所有题目是否已回答
function validateCurrentStep() {
    const currentStep = testState.currentStep;
    const answers = testState.answers[`dimension${currentStep}`];
    const allAnswered = answers.every(answer => answer !== null);
    
    if (!allAnswered) {
        alert('请完成当前页面的所有题目');
        return false;
    }
    return true;
}

// 处理下一步按钮点击
function handleNextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    const currentStep = testState.currentStep;
    if (currentStep < 4) {
        // 进入下一页
        goToStep(currentStep + 1);
    } else {
        // 完成测评
        calculateResult();
    }
}
```

## 5. 事件监听修改
- 移除原有的导航按钮监听
- 添加新的下一步按钮监听
- 确保选项选择事件正常工作

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 其他监听...
    
    // 添加下一步按钮监听
    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', handleNextStep);
    
    // 其他监听...
});
```

## 6. 测试计划
1. 验证四个步骤页面正确显示
2. 验证每个页面所有内容在同一视窗内
3. 验证未完成所有题目无法进入下一页
4. 验证进度指示正确更新
5. 验证按钮文本根据步骤动态变化
6. 验证完成所有题目后能正常生成结果

## 7. 文件修改清单
- `test.html`：HTML结构改造
- `styles.css`：添加分步页面样式
- `test.html`内的JavaScript：添加分步逻辑

## 8. 预期效果
- 用户进入测评后看到步骤1/4和10道题
- 所有题目和按钮在同一视窗内
- 完成所有题目后点击"下一页"进入步骤2
- 步骤4完成后点击"完成测评"生成结果
- 每个页面都有明确的进度指示

该计划将确保测评系统符合用户需求，提供良好的分步测评体验。