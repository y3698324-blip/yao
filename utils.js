// 通用工具函数 - INFP 48阶人格进化定位测评系统

// ==================== 数据存储管理 ====================

// 生成设备唯一ID
function getDeviceId() {
    let deviceId = localStorage.getItem('infpDeviceId');
    if (!deviceId) {
        // 生成一个基于时间戳和随机数的唯一ID
        deviceId = 'device_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('infpDeviceId', deviceId);
    }
    return deviceId;
}

// 获取LocalStorage数据
function getData() {
    const data = localStorage.getItem('infpTestData');
    if (data) {
        return JSON.parse(data);
    }
    return {
        generatedCodes: [],
        usedCodes: [],
        deviceUsedCodes: {}, // 存储每个设备使用过的兑换码 {deviceId: [code1, code2, ...]}
        testResults: {},
        adminPassword: 'admin123' // 默认密码
    };
}

// 保存数据到LocalStorage
function saveData(data) {
    localStorage.setItem('infpTestData', JSON.stringify(data));
}

// ==================== 兑换码管理 ====================

// 生成4位随机兑换码
function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// 生成多个不重复的兑换码
function generateMultipleCodes(count) {
    const codes = [];
    const existingCodes = getData().generatedCodes;
    
    while (codes.length < count) {
        const code = generateCode();
        if (!existingCodes.includes(code) && !codes.includes(code)) {
            codes.push(code);
        }
    }
    
    return codes;
}

// 验证兑换码（基于设备ID）
function validateCode(code) {
    // 格式验证：4位大写英文字母或数字组合
    const formatRegex = /^[A-Z0-9]{4}$/;
    if (!formatRegex.test(code)) {
        return false;
    }
    
    const data = getData();
    const deviceId = getDeviceId();

    // 兼容字符串数组和对象数组两种存储格式
    const generatedCodesArray = Array.isArray(data.generatedCodes) ? data.generatedCodes : [];
    const generatedCodes = generatedCodesArray.map(item =>
        typeof item === 'string' ? item : (item && item.code) ? item.code : ''
    ).filter(Boolean);

    // 检查兑换码是否在已生成的列表中
    if (!generatedCodes.includes(code)) {
        return false;
    }
    
    // 检查当前设备是否已使用过该兑换码
    if (!data.deviceUsedCodes) {
        data.deviceUsedCodes = {};
    }
    
    const deviceUsedCodes = data.deviceUsedCodes[deviceId] || [];
    if (deviceUsedCodes.includes(code)) {
        // 该设备已使用过此兑换码，允许继续使用（刷新后仍可用）
        return true;
    }
    
    return true;
}

// 标记兑换码为当前设备已使用（但不阻止该设备再次使用）
function markCodeAsUsedByDevice(code) {
    const data = getData();
    const deviceId = getDeviceId();
    
    if (!data.deviceUsedCodes) {
        data.deviceUsedCodes = {};
    }
    
    if (!data.deviceUsedCodes[deviceId]) {
        data.deviceUsedCodes[deviceId] = [];
    }
    
    // 记录该设备使用过此兑换码（但不阻止再次使用）
    if (!data.deviceUsedCodes[deviceId].includes(code)) {
        data.deviceUsedCodes[deviceId].push(code);
        saveData(data);
    }
    
    // 保持向后兼容：也记录到usedCodes（但不影响验证逻辑）
    // 这个主要用于统计，不影响功能
    if (!data.usedCodes) {
        data.usedCodes = [];
    }
    if (!data.usedCodes.includes(code)) {
        data.usedCodes.push(code);
        saveData(data);
    }
}

// 标记兑换码为已使用（保持向后兼容）
function markCodeAsUsed(code) {
    markCodeAsUsedByDevice(code);
}

// ==================== 星座元素获取 ====================

// 根据星座获取元素
function getElementFromConstellation(constellation) {
    const elementMap = {
        '白羊座': '火',
        '金牛座': '土',
        '双子座': '风',
        '巨蟹座': '水',
        '狮子座': '火',
        '处女座': '土',
        '天秤座': '风',
        '天蝎座': '水',
        '射手座': '火',
        '摩羯座': '土',
        '水瓶座': '风',
        '双鱼座': '水'
    };
    return elementMap[constellation] || '风'; // 默认风象
}

// ==================== 类型匹配算法 ====================

// 匹配INFP类型
function matchINFPType(scores, constellation, bloodType) {
    // 1. 计算各维度总分（10-30分）
    const totalScores = {
        dim1: scores.dimension1.reduce((a, b) => a + b, 0),
        dim2: scores.dimension2.reduce((a, b) => a + b, 0),
        dim3: scores.dimension3.reduce((a, b) => a + b, 0),
        dim4: scores.dimension4.reduce((a, b) => a + b, 0)
    };
    
    // 2. 确定各维度阶段
    const stages = Object.values(totalScores).map(score => 
        score <= 16 ? 'low' : score <= 23 ? 'middle' : 'high'
    );
    
    // 3. 根据星座分组（火/土/风/水）
    const element = getElementFromConstellation(constellation);
    
    // 4. 匹配48种类型
    // 根据用户提供的完整分类图片更新
    const typeMatrix = {
        '火': {
            'A': {
                'low': '低阶·焦虑型INFP',
                'middle': '中阶·探索型INFP',
                'high': '高阶·创造型INFP'
            },
            'B': {
                'low': '低阶·冲动型INFP',
                'middle': '中阶·表达型INFP',
                'high': '高阶·灵感型INFP'
            },
            'O': {
                'low': '低阶·枯竭型INFP',
                'middle': '中阶·整合型INFP',
                'high': '高阶·行动型INFP'
            },
            'AB': {
                'low': '低阶·矛盾型INFP',
                'middle': '中阶·实验型INFP',
                'high': '高阶·跨界型INFP'
            }
        },
        '土': {
            'A': {
                'low': '低阶·内耗型INFP',
                'middle': '中阶·务实型INFP',
                'high': '高阶·实践型INFP'
            },
            'B': {
                'low': '低阶·固执型INFP',
                'middle': '中阶·稳健型INFP',
                'high': '高阶·实干型INFP'
            },
            'O': {
                'low': '低阶·焦虑型INFP',
                'middle': '中阶·目标型INFP',
                'high': '高阶·价值型INFP'
            },
            'AB': {
                'low': '低阶·矛盾型INFP',
                'middle': '中阶·系统型INFP',
                'high': '高阶·智慧型INFP'
            }
        },
        '风': {
            'A': {
                'low': '低阶·碎片型INFP',
                'middle': '中阶·连接型INFP',
                'high': '高阶·融思型INFP'
            },
            'B': {
                'low': '低阶·敏感型INFP',
                'middle': '中阶·适应型INFP',
                'high': '高阶·联结型INFP'
            },
            'O': {
                'low': '低阶·耗竭型INFP',
                'middle': '中阶·沟通型INFP',
                'high': '高阶·传播型INFP'
            },
            'AB': {
                'low': '低阶·冲突型INFP',
                'middle': '中阶·多元型INFP',
                'high': '高阶·思想型INFP'
            }
        },
        '水': {
            'A': {
                'low': '低阶·情绪型INFP',
                'middle': '中阶·管理型INFP',
                'high': '高阶·疗愈型INFP'
            },
            'B': {
                'low': '低阶·依赖型INFP',
                'middle': '中阶·共情型INFP',
                'high': '高阶·启迪型INFP'
            },
            'O': {
                'low': '低阶·混乱型INFP',
                'middle': '中阶·融合型INFP',
                'high': '高阶·滋养型INFP'
            },
            'AB': {
                'low': '低阶·两难型INFP',
                'middle': '中阶·平衡型INFP',
                'high': '高阶·透明型INFP'
            }
        }
    };
    
    // 简化实现：根据第一个维度的阶段来匹配类型
    return typeMatrix[element][bloodType][stages[0]] || '未知类型';
}

// ==================== 文件导出功能 ====================

// 导出文本文件
function exportTextFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// 导出CSV文件
function exportCSVFile(data, filename) {
    if (!data || !data.length) {
        return;
    }
    
    // 获取表头
    const headers = Object.keys(data[0]);
    
    // 生成CSV内容
    const csvContent = [
        headers.join(','), // 表头
        ...data.map(row => headers.map(header => {
            const value = row[header];
            // 处理包含逗号或引号的情况
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// ==================== 日期格式化 ====================

// 格式化日期
function formatDate(date) {
    if (!date) {
        date = new Date();
    }
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}



// ==================== 测评结果计算 ====================

// 计算各维度总分
function calculateTotalScores(scores) {
    return {
        dim1: scores.dimension1.reduce((a, b) => a + b, 0),
        dim2: scores.dimension2.reduce((a, b) => a + b, 0),
        dim3: scores.dimension3.reduce((a, b) => a + b, 0),
        dim4: scores.dimension4.reduce((a, b) => a + b, 0)
    };
}

// ==================== 数据统计 ====================

// 获取统计数据
function getStatistics() {
    const data = getData();
    const totalCodes = data.generatedCodes.length;
    const usedCodes = data.usedCodes.length;
    
    // 计算今日测评人数
    const today = new Date().toDateString();
    let todayTests = 0;
    Object.values(data.testResults).forEach(result => {
        if (result && result.timestamp) {
            const resultDate = new Date(result.timestamp).toDateString();
            if (resultDate === today) {
                todayTests++;
            }
        }
    });
    
    // 计算类型分布
    const typeDistribution = {};
    Object.values(data.testResults).forEach(result => {
        if (result && result.type) {
            typeDistribution[result.type] = (typeDistribution[result.type] || 0) + 1;
        }
    });
    
    // 计算维度平均得分
    let dim1Total = 0, dim2Total = 0, dim3Total = 0, dim4Total = 0;
    let resultCount = 0;
    
    Object.values(data.testResults).forEach(result => {
        if (result && result.scores) {
            dim1Total += calculateTotalScores(result.scores).dim1;
            dim2Total += calculateTotalScores(result.scores).dim2;
            dim3Total += calculateTotalScores(result.scores).dim3;
            dim4Total += calculateTotalScores(result.scores).dim4;
            resultCount++;
        }
    });
    
    const avgScores = resultCount > 0 ? {
        dim1: (dim1Total / resultCount).toFixed(1),
        dim2: (dim2Total / resultCount).toFixed(1),
        dim3: (dim3Total / resultCount).toFixed(1),
        dim4: (dim4Total / resultCount).toFixed(1)
    } : {
        dim1: 0, dim2: 0, dim3: 0, dim4: 0
    };
    
    return {
        totalCodes,
        usedCodes,
        todayTests,
        typeDistribution,
        avgScores
    };
}

// ==================== 密码管理 ====================

// 验证管理员密码
function verifyAdminPassword(password) {
    const data = getData();
    return data.adminPassword === password;
}

// 修改管理员密码
function changeAdminPassword(newPassword) {
    const data = getData();
    data.adminPassword = newPassword;
    saveData(data);
}

// ==================== 复制到剪贴板 ====================

// 复制文本到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            alert('复制成功！');
        })
        .catch(err => {
            console.error('复制失败:', err);
            alert('复制失败，请手动复制！');
        });
}

// ==================== 雷达图绘制函数 ====================

/** 
 * 绘制雷达图 
 * @param {Object} scores - 各维度分数对象 
 * @param {string} canvasId - Canvas元素的ID 
 */ 
function drawRadarChart(scores, canvasId) {
    // 检查参数
    if (!scores || !canvasId) {
        console.error('drawRadarChart: 缺少必要参数', { scores, canvasId });
        return null;
    }
    
    // 获取 Canvas 元素
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error('drawRadarChart: Canvas 元素未找到', canvasId);
        return null;
    }
    
    // 检查 Chart.js 是否已加载
    if (typeof Chart === 'undefined') {
        console.error('drawRadarChart: Chart.js 未加载');
        return null;
    }
    
    // 获取上下文
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('drawRadarChart: 无法获取 Canvas 上下文');
        return null;
    }
    
    // 如果已有图表实例，先销毁
    if (window.radarChartInstance) {
        try {
            window.radarChartInstance.destroy();
        } catch (e) {
            console.warn('销毁旧图表实例时出错:', e);
        }
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
            maintainAspectRatio: true,
            aspectRatio: 1,
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
    try {
        window.radarChartInstance = new Chart(ctx, config);
        console.log('雷达图创建成功', { scores, canvasId });
        return window.radarChartInstance;
    } catch (error) {
        console.error('创建雷达图失败:', error);
        return null;
    }
}

/** 
 * 修复PDF导出功能，确保雷达图能正确导出 
 */ 
function generatePDF(elementId = 'result-page') {
    // 在导出前确保雷达图已完全渲染
    if (window.radarChartInstance) {
        // 强制图表重绘
        window.radarChartInstance.resize();
    }
    
    const element = document.getElementById(elementId);
    const opt = {
        margin: [10, 10, 10, 10],
        filename: 'INFP人格测评报告.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
        },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        }
    };
    
    // 生成PDF
    html2pdf().set(opt).from(element).save();
}

// ==================== 工具函数导出 ====================
// 如果在浏览器环境中，将工具函数挂载到window对象
if (typeof window !== 'undefined') {
    window.utils = {
        getData,
        saveData,
        generateCode,
        generateMultipleCodes,
        validateCode,
        markCodeAsUsed,
        getElementFromConstellation,
        matchINFPType,
        exportTextFile,
        exportCSVFile,
        formatDate,
        calculateTotalScores,
        getStatistics,
        verifyAdminPassword,
        changeAdminPassword,
        copyToClipboard,
        drawRadarChart,
        generatePDF
    };
}