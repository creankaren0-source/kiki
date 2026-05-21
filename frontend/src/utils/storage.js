/**
 * 安全的 localStorage 封装
 *
 * 解决以下问题：
 * 1. Safari 无痕模式抛出 SecurityError
 * 2. localStorage 配额超限 (QuotaExceededError)
 * 3. 降级到内存存储，确保 App 不崩溃
 */

// 内存存储降级方案
const memoryStorage = {};

/**
 * 安全读取 localStorage
 * @param {string} key - 存储键名
 * @returns {string|null} - 存储值或 null
 */
export function getStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`[Storage] localStorage.getItem failed (${key}):`, e.message);
    // 降级到内存存储
    return memoryStorage[key] || null;
  }
}

/**
 * 安全写入 localStorage
 * @param {string} key - 存储键名
 * @param {string} value - 存储值
 * @returns {boolean} - 是否写入成功
 */
export function setStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`[Storage] localStorage.setItem failed (${key}):`, e.message);

    // 尝试清理旧数据后重试
    if (e.name === 'QuotaExceededError') {
      try {
        // 清理非必要的缓存数据
        cleanupOldCache();
        localStorage.setItem(key, value);
        return true;
      } catch (retryError) {
        console.warn('[Storage] Retry after cleanup failed:', retryError.message);
      }
    }

    // 降级到内存存储
    memoryStorage[key] = value;
    console.info(`[Storage] Fallback to memory storage for key: ${key}`);
    return false;
  }
}

/**
 * 安全删除 localStorage 项
 * @param {string} key - 存储键名
 */
export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('[Storage] localStorage.removeItem failed:', e.message);
  }

  // 同时清理内存存储
  delete memoryStorage[key];
}

/**
 * 清理旧的缓存数据
 * 当 localStorage 配额不足时调用
 */
function cleanupOldCache() {
  try {
    // 清理可能过期的数据（保留核心数据）
    const keysToRemove = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      // 保留核心 session 数据
      if (key && key !== 'hair_session_id') {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`[Storage] Cleaned up: ${key}`);
    });
  } catch (e) {
    console.warn('[Storage] Cleanup failed:', e.message);
  }
}

/**
 * 检查 localStorage 是否可用
 * @returns {boolean}
 */
export function isStorageAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 获取存储使用情况（估算）
 * @returns {Object} - { used, quota, percent }
 */
export function getStorageUsage() {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        total += (localStorage.getItem(key) || '').length + key.length;
      }
    }
    // localStorage 通常限制 5MB
    const quota = 5 * 1024 * 1024;
    return {
      used: total,
      quota: quota,
      percent: ((total / quota) * 100).toFixed(2)
    };
  } catch (e) {
    return { used: 0, quota: 0, percent: '0' };
  }
}

// 导出便捷方法（与 localStorage API 兼容）
export const storage = {
  getItem: getStorage,
  setItem: setStorage,
  removeItem: removeStorage,
  clear: () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('[Storage] localStorage.clear failed:', e.message);
    }
    // 清空内存存储
    Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
  },
  get length() {
    try {
      return localStorage.length;
    } catch (e) {
      return Object.keys(memoryStorage).length;
    }
  },
  key: (index) => {
    try {
      return localStorage.key(index);
    } catch (e) {
      return Object.keys(memoryStorage)[index] || null;
    }
  }
};
