<template>
  <div class="app-container">
    <!-- 左侧栏 -->
    <aside class="left-sidebar">
      <div class="logo-section">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&crop=face" alt="发发" class="logo-avatar" id="logoAvatar">
        <div class="logo-title">发发</div>
        <div class="logo-subtitle">你的口袋发型顾问</div>
      </div>

      <label class="upload-btn" for="userPhotoInput">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <span v-if="!userPhotoUrl">上传您的照片</span>
        <span v-else>更换照片</span>
      </label>
      <input type="file" id="userPhotoInput" ref="userPhotoInput" accept="image/*" @change="handleUserPhotoUpload" style="display:none">

      <div class="nav-section">
        <div class="nav-label">导航</div>
        <div class="nav-item" @click="showToast('历史记录功能即将上线')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          历史记录
        </div>
        <div class="nav-item" @click="showClearConfirm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          清除对话
        </div>
      </div>

      <div class="ref-section">
        <div class="ref-label">参考发型</div>
        <div class="ref-uploader" id="refUploader" @click="triggerUpload('ref')">
          <template v-if="!refHairUrl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-tertiary);">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </template>
          <template v-else>
            <img :src="refHairUrl" alt="参考发型">
            <div class="ref-actions">
              <button class="ref-action-btn" @click.stop="replaceRefPhoto" title="替换">🔄</button>
              <button class="ref-action-btn" @click.stop="clearRefPhoto" title="删除">🗑️</button>
            </div>
          </template>
        </div>
        <input type="file" ref="refPhotoInput" accept="image/*" @change="handleRefPhotoUpload">
      </div>

      <div class="bottom-actions">
        <div class="bottom-item" @click="showToast('帮助文档即将上线')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          帮助与支持
        </div>
        <div class="bottom-item" @click="toggleSettings">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          设置
        </div>
      </div>
    </aside>

    <!-- 中间展示区 -->
    <main class="center-stage" id="centerStage">
      <!-- 空状态 -->
      <div class="empty-state" v-if="viewMode === 'empty'">
        <div class="empty-illustration">
          <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=face" alt="发发" class="avatar-large">
          <span class="sparkle">✨</span>
          <span class="sparkle">⭐</span>
          <span class="sparkle">💫</span>
          <span class="sparkle">✨</span>
        </div>
        <div class="empty-title">上传照片开始试戴</div>
        <div class="empty-desc">上传你的照片并在右侧告诉我你想试什么发型，我会帮你分析脸型并推荐最适合你的时尚发型。</div>
        <div class="empty-hint">支持 JPG、PNG 格式，建议正面清晰照片</div>
      </div>

      <!-- 用户照片 + loading -->
      <div class="user-photo-placeholder" v-else-if="viewMode === 'userPhoto' || viewMode === 'loading'">
        <img :src="userPhotoUrl" alt="用户照片" id="userPhotoDisplay">
        <div class="waiting-badge" v-if="viewMode === 'loading'">
          <span class="dot"></span>
          {{ loadingText }}
        </div>
        <div class="waiting-badge" v-else-if="viewMode === 'userPhoto'">
          照片已上传
        </div>
      </div>

      <!-- 生成结果 -->
      <div class="result-viewer" v-else-if="viewMode === 'result'">
        <img :src="currentResultUrl" alt="试戴效果" id="resultDisplay" :style="{ transform: `scale(${currentZoom})`, transition: 'transform 0.3s ease' }">
      </div>

      <!-- 工具栏 -->
      <div class="toolbar" v-if="viewMode === 'userPhoto' || viewMode === 'result' || viewMode === 'loading'">
        <div class="zoom-group">
          <button class="tool-btn" @click="adjustZoom(-0.1)" title="缩小">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <span>缩小</span>
          </button>
          <span class="zoom-level">{{ Math.round(currentZoom * 100) }}%</span>
          <button class="tool-btn" @click="adjustZoom(0.1)" title="放大">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            <span>放大</span>
          </button>
        </div>
        <div class="tool-divider"></div>
        <button class="tool-btn" @click="regenerateImage" :disabled="!userPhotoUrl || isGenerating" title="重新生成">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          <span>重新生成</span>
        </button>
        <div class="tool-divider"></div>
        <button class="tool-btn" @click="saveImage" :disabled="!currentResultUrl" title="保存图片">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>保存</span>
        </button>
        <div class="tool-divider"></div>
        <button class="tool-btn" disabled title="对比功能即将上线">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <line x1="12" y1="3" x2="12" y2="21"/>
          </svg>
          <span>对比</span>
        </button>
        <button class="tool-btn" disabled title="360° 查看即将上线">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>360° VIEW</span>
        </button>
      </div>
    </main>

    <!-- 右侧对话区 -->
    <aside class="right-panel">
      <div class="chat-header">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face" alt="发发" class="chat-header-avatar">
        <div class="chat-header-text">
          <h3>发发 · AI发型顾问</h3>
          <p>在线为你设计发型</p>
        </div>
      </div>

      <div class="message-list" id="messageList" ref="messageList">
        <div v-for="msg in messages" :key="msg.id" class="message" :class="msg.role">
          <img :src="msg.role === 'assistant' ? 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face' : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face'" :alt="msg.role === 'assistant' ? '发发' : '用户'" class="message-avatar">
          <div>
            <!-- 文本消息 -->
            <div v-if="msg.type === 'text'" class="message-bubble" v-html="formatMessage(msg.content)"></div>

            <!-- 加载消息 -->
            <div v-else-if="msg.type === 'loading'" class="loading-message">
              <span>{{ msg.content }}</span>
              <div class="loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>

            <!-- 图片消息 -->
            <div v-else-if="msg.type === 'image'">
              <div class="message-bubble" v-html="formatMessage(msg.content)"></div>
              <img v-if="msg.image" :src="msg.image" class="result-img" style="max-width: 100%; display: block; margin: 8px 0; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
              <div v-if="msg.showAdjust" class="adjust-options" style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
                <button v-for="adj in adjustOptions" :key="adj" @click="adjust(adj)" style="padding: 6px 14px; background: white; border: 1px solid var(--border-light); border-radius: 999px; font-size: 12px; color: var(--text-secondary); cursor: pointer;">{{ adj }}</button>
              </div>
            </div>

            <!-- 分析+推荐消息（后端返回完整 reply，前端解析渲染） -->
            <div v-else-if="msg.type === 'analysis'" style="max-width: calc(100% - 50px);">
              <div class="message-bubble" v-html="formatMessage(msg.content)"></div>
              <div v-if="msg.faceInfo" class="face-analysis-card" style="margin-top: 8px;">
                <h4><span class="icon">😊</span>脸型分析</h4>
                <div class="analysis-content">{{ msg.faceInfo.description }}</div>
                <div v-if="msg.faceInfo.tags" class="analysis-tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px;">
                  <span v-for="tag in msg.faceInfo.tags" :key="tag" class="analysis-tag">{{ tag }}</span>
                </div>
              </div>
              <div v-if="msg.recommendations && msg.recommendations.length > 0" class="recommendation-section" style="margin-top: 8px;">
                <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">推荐发型</h4>
                <div v-for="rec in msg.recommendations" :key="rec.label" class="rec-card" style="display: flex; gap: 12px; background: white; border-radius: 12px; padding: 12px; margin-bottom: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                  <img :src="rec.image || 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=200&h=200&fit=crop'" style="width: 70px; height: 70px; border-radius: 8px; object-fit: cover; flex-shrink: 0;" class="rec-image">
                  <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
                    <div style="font-size: 14px; font-weight: 600; margin-bottom: 4px;">{{ rec.label }}</div>
                    <div style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 8px;">{{ rec.desc || '适合你的发型' }}</div>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <div style="display: flex; gap: 4px;">
                        <span v-for="tag in (rec.tags || ['免打理'])" :key="tag" style="padding: 2px 8px; background: #F1F5F9; border-radius: 999px; font-size: 11px; color: var(--text-secondary);">{{ tag }}</span>
                      </div>
                      <button @click="tryOnStyle(rec.label)" class="try-on-btn" style="padding: 6px 14px; background: linear-gradient(135deg, var(--purple-primary), var(--purple-light)); color: white; border: none; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;">试戴</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
          </div>
        </div>
      </div>

      <div class="quick-tags-container">
        <div class="quick-tags hide-scrollbar">
          <div v-for="q in quickTags" :key="q[0]" class="quick-tag" @click="fillInput(q[1])">{{ q[0] }}</div>
        </div>
      </div>

      <div class="input-area">
        <div class="input-wrapper">
          <button class="voice-btn" @click="showToast('语音功能即将上线')" title="语音输入">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" y1="19" x2="12" y2="23"/>
              <line x1="8" y1="23" x2="16" y2="23"/>
            </svg>
          </button>
          <input type="text" class="chat-input" v-model="inputText" placeholder="输入你想试的发型，比如'羊毛卷'" @keypress="handleKeyPress" @input="checkInput">
          <button class="send-btn" :class="{ active: inputText.trim() }" @click="sendMessage">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  </div>

  <!-- 设置抽屉 -->
  <div class="drawer-overlay" :class="{ open: isSettingsOpen }" @click="toggleSettings"></div>
  <div class="drawer" :class="{ open: isSettingsOpen }">
    <div class="drawer-header">
      <h2>设置</h2>
      <button class="close-btn" @click="toggleSettings">✕</button>
    </div>
    <div class="drawer-item" @click="showToast('历史记录功能即将上线'); toggleSettings();">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
      历史对话
    </div>
    <div class="drawer-item danger" @click="showClearConfirm(); toggleSettings();">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
      清除当前对话
    </div>
    <div class="drawer-item" @click="showToast('隐私政策页面即将上线')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      隐私政策
    </div>
    <div class="drawer-item" @click="showToast('关于发发页面即将上线')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
      关于发发
      <span style="margin-left: auto; font-size: 12px; color: var(--text-tertiary);">v1.0.0</span>
    </div>
  </div>

  <!-- 确认弹窗 -->
  <div class="modal-overlay" :class="{ open: isClearModalOpen }" @click="hideClearModal">
    <div class="modal" @click.stop>
      <h3>清除当前对话</h3>
      <p>确定清除当前对话？清除后无法恢复，但已上传的照片会被保留。</p>
      <div class="modal-actions">
        <button class="modal-btn cancel" @click="hideClearModal">取消</button>
        <button class="modal-btn confirm" @click="confirmClear">确定</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div class="toast" :class="{ show: toastVisible }">{{ toastText }}</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { getStorage, setStorage } from './utils/storage'

// ======================= 配置 =======================
const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:8000').replace(/\/$/, '')

// ======================= Session =======================
const sessionId = ref(getStorage('hair_session_id') || crypto.randomUUID())
setStorage('hair_session_id', sessionId.value)

// ======================= DOM refs =======================
const userPhotoInput = ref(null)
const refPhotoInput = ref(null)
const messageList = ref(null)

// ======================= UI状态 =======================
const viewMode = ref('empty')  // 'empty' | 'userPhoto' | 'loading' | 'result'
const loadingText = ref('正在分析脸型...')
const isSettingsOpen = ref(false)
const isClearModalOpen = ref(false)
const currentZoom = ref(1)

// ======================= 业务状态 =======================
const userPhotoUrl = ref(null)
const refHairUrl = ref(null)
const messages = ref([])
const isGenerating = ref(false)
const currentResultUrl = ref(null)
const inputText = ref('')
const toastText = ref('')
const toastVisible = ref(false)
let toastTimer = null
let userPhotoFile = null // 保存压缩后的用户照片文件

// ======================= 常量 =======================
const quickTags = ref([
  ['锁骨短发', '推荐锁骨短发'],
  ['大波浪', '试戴大波浪'],
  ['显白发色', '推荐显白发色'],
  ['适合方脸', '什么发型适合方脸'],
  ['法式刘海', '试戴法式刘海'],
  ['羊毛卷', '试戴羊毛卷'],
])
const adjustOptions = ['颜色太深', '再短一点', '换一款']

// ======================= API请求 =======================
async function postApi(path, formData) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    body: formData
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `请求失败 (${res.status})`)
  }
  return res.json()
}

async function deleteApi(path) {
  const res = await fetch(API_BASE + path, { method: 'DELETE' })
  if (!res.ok) {
    throw new Error(`请求失败 (${res.status})`)
  }
  return res.json()
}

// ======================= 生命周期 =======================
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleViewportResize)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', handleViewportResize)
  }
  if (toastTimer) clearTimeout(toastTimer)
})

// ======================= 文件上传 =======================
async function resizeImageIfNeeded(file, maxWidth = 1024) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      // 如果图片宽度在限制内，直接返回原文件
      if (img.width <= maxWidth) {
        resolve(file)
        return
      }
      // 计算缩放后的尺寸
      const scale = maxWidth / img.width
      const canvas = document.createElement('canvas')
      canvas.width = maxWidth
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((blob) => {
        const resizedFile = new File([blob], file.name, { type: file.type })
        resolve(resizedFile)
      }, file.type, 0.9)
    }
    img.src = URL.createObjectURL(file)
  })
}

function triggerUpload(type) {
  if (type === 'user') {
    userPhotoInput.value.click()
  } else {
    refPhotoInput.value.click()
  }
}

async function handleUserPhotoUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  // 前端校验
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    showToast('请上传 JPG/PNG 格式的图片')
    event.target.value = ''
    return
  }
  if (file.size > 10 * 1024 * 1024) {
    showToast('图片大小不能超过 10MB')
    event.target.value = ''
    return
  }

  // 压缩图片（如果尺寸过大）
  const resizedFile = await resizeImageIfNeeded(file)

  // 本地预览
  const reader = new FileReader()
  userPhotoUrl.value = await new Promise((resolve) => {
    reader.onload = (e) => resolve(e.target.result)
    reader.readAsDataURL(resizedFile)
  })
  userPhotoFile = resizedFile // 保存压缩后的文件供后续使用

  // 中间区显示用户照片 + loading
  viewMode.value = 'loading'
  loadingText.value = '正在分析脸型...'
  currentResultUrl.value = null
  currentZoom.value = 1

  // 将用户消息加入消息列表（loading状态）
  const loadingMsg = addMessage('assistant', 'loading', '正在分析脸型...')

  try {
    const formData = new FormData()
    formData.append('session_id', sessionId.value)
    formData.append('image', resizedFile)

    const res = await postApi('/recommend', formData)

    // 移除 loading 消息
    removeMessage(loadingMsg.id)

    if (res.reply) {
      // 解析后端返回的 reply，提取脸型分析和推荐
      const parsed = parseAnalysisReply(res.reply, res.recommendations)

      // 添加 AI 分析消息
      const analysisMsg = addMessage('assistant', 'analysis', res.reply, {
        faceInfo: parsed.faceInfo,
        recommendations: parsed.recommendations
      })

      // 更新快速标签
      if (parsed.quickTags.length > 0) {
        quickTags.value = parsed.quickTags
      }

      // 如果后端返回了生成图，显示在中间区
      if (res.image) {
        currentResultUrl.value = res.image.startsWith('http') ? res.image : API_BASE + res.image
        viewMode.value = 'result'
      } else {
        viewMode.value = 'userPhoto'
      }
    }
  } catch (err) {
    removeMessage(loadingMsg.id)
    addMessage('assistant', 'text', `请求失败：${err.message}`)
    viewMode.value = userPhotoUrl.value ? 'userPhoto' : 'empty'
  }

  event.target.value = ''
}

function handleRefPhotoUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    refHairUrl.value = e.target.result
    showToast('参考发型已上传')
  }
  reader.readAsDataURL(file)
  event.target.value = ''
}

function replaceRefPhoto() {
  refPhotoInput.value.click()
}

function clearRefPhoto() {
  refHairUrl.value = null
  showToast('参考发型已清除')
}

// ======================= 消息系统 =======================
function addMessage(role, type, content, extra = {}) {
  const msg = {
    id: Date.now() + Math.random(),
    role,
    type,
    content,
    timestamp: Date.now(),
    image: extra.image || null,
    showAdjust: extra.showAdjust || false,
    faceInfo: extra.faceInfo || null,
    recommendations: extra.recommendations || null
  }
  messages.value.push(msg)
  scrollToBottom()
  return msg
}

function removeMessage(id) {
  const idx = messages.value.findIndex(m => m.id === id)
  if (idx !== -1) messages.value.splice(idx, 1)
}

function scrollToBottom() {
  nextTick(() => {
    if (messageList.value) {
      messageList.value.scrollTop = 0
    }
  })
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

function formatMessage(text) {
  if (!text) return ''
  // 换行转 <br>，**bold** 转 <strong>
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

// ======================= 解析后端回复 =======================
function parseAnalysisReply(reply, recommendations) {
  let faceInfo = null
  let parsedRecs = []

  // 1. 优先用后端返回的 recommendations 数组
  if (recommendations && recommendations.length > 0) {
    parsedRecs = recommendations.map(r => ({
      label: r.label || r,
      desc: r.desc || '适合你的发型',
      tags: r.tags || ['推荐'],
      image: r.image || ''
    }))
  }

  // 2. 从 reply 文本中解析脸型信息
  const faceMatch = reply.match(/脸型[：:]\s*([^\n，,。]+)/)
  if (faceMatch) {
    const faceType = faceMatch[1].trim()
    const descMatch = reply.match(/特点[：:]\s*([^\n，,。]+)/)
    faceInfo = {
      description: `你的脸型是${faceType}，${descMatch ? descMatch[1] : '适合大多数发型'}。`,
      tags: [faceType, '百搭']
    }
  }

  // 3. 如果后端没返回 recommendations 数组，从 reply 中提取
  if (parsedRecs.length === 0) {
    const recSection = reply.match(/推荐发型[：:]\s*([\s\S]*?)(?:避免|不适合|$)/)
    if (recSection) {
      const recText = recSection[1]
      const names = recText.split(/[、，,；;\n]/)
        .map(n => n.replace(/^[\d\.、\-\s]+/, '').trim())
        .filter(n => n.length >= 2 && n.length <= 12)
      parsedRecs = names.slice(0, 3).map(name => ({
        label: name,
        desc: '适合你的发型',
        tags: ['推荐'],
        image: ''
      }))
    }
  }

  // 4. 生成快速标签
  const quickTagsOut = parsedRecs.slice(0, 3).map(r => [r.label, `试戴${r.label}`])

  return { faceInfo, recommendations: parsedRecs, quickTags: quickTagsOut }
}

// ======================= 试戴 =======================
async function tryOnStyle(styleName) {
  if (!userPhotoUrl.value) {
    const btn = document.getElementById('uploadUserBtn')
    if (btn) {
      btn.classList.add('shake')
      setTimeout(() => btn.classList.remove('shake'), 500)
    }
    addMessage('assistant', 'text', '先上传你的照片，我才能帮你试戴哦~ 📸')
    return
  }

  // 用户发送试戴消息
  addMessage('user', 'text', `试戴${styleName}`)

  // 中间区显示 loading
  viewMode.value = 'loading'
  loadingText.value = '正在生成试戴效果...'
  currentResultUrl.value = null

  // 添加 AI loading 消息
  const loadingMsg = addMessage('assistant', 'loading', '正在生成试戴效果...')

  isGenerating.value = true

  try {
    const formData = new FormData()
    formData.append('session_id', sessionId.value)
    formData.append('message', `试戴${styleName}`)

    // 附加用户照片，但不标记为新照片（已有脸型分析结果）
    const userFile = getUserPhotoFile()
    if (userFile) {
      formData.append('image', userFile)
      formData.append('new_photo', 'false')
    }

    const res = await postApi('/chat', formData)

    // 移除 loading 消息
    removeMessage(loadingMsg.id)

    if (res.image) {
      currentResultUrl.value = res.image.startsWith('http') ? res.image : API_BASE + res.image
      viewMode.value = 'result'
      addMessage('assistant', 'image', `✨ ${styleName}试戴效果生成完成！满意吗？不满意可以直接说：\n• 颜色太深 → 调浅\n• 再短一点 → 调整长度\n• 换一款 → 重新推荐`, { image: currentResultUrl.value, showAdjust: true })
    } else {
      viewMode.value = userPhotoUrl.value ? 'userPhoto' : 'empty'
      addMessage('assistant', 'text', res.reply || '生成失败，请重试')
    }
  } catch (err) {
    removeMessage(loadingMsg.id)
    viewMode.value = userPhotoUrl.value ? 'userPhoto' : 'empty'
    addMessage('assistant', 'text', `请求失败：${err.message}`)
  } finally {
    isGenerating.value = false
  }
}

// 从 file input 获取用户照片文件
function getUserPhotoFile() {
  // 优先使用压缩后的文件
  if (userPhotoFile) {
    return userPhotoFile
  }
  // 备用：从 file input 获取
  const input = userPhotoInput.value
  if (input && input.files && input.files[0]) {
    return input.files[0]
  }
  return null
}

// ======================= 调整效果 =======================
async function adjust(adjText) {
  if (isGenerating.value) return

  addMessage('user', 'text', adjText)

  viewMode.value = 'loading'
  loadingText.value = '正在调整效果...'
  currentResultUrl.value = null

  const loadingMsg = addMessage('assistant', 'loading', '正在调整效果...')

  isGenerating.value = true

  try {
    const formData = new FormData()
    formData.append('session_id', sessionId.value)
    formData.append('message', adjText)

    const userFile = getUserPhotoFile()
    if (userFile) {
      formData.append('image', userFile)
      formData.append('new_photo', 'false')
    }

    const res = await postApi('/chat', formData)

    removeMessage(loadingMsg.id)

    if (res.image) {
      currentResultUrl.value = res.image.startsWith('http') ? res.image : API_BASE + res.image
      viewMode.value = 'result'
      addMessage('assistant', 'image', res.reply || '调整完成', { image: currentResultUrl.value, showAdjust: true })
    } else {
      viewMode.value = currentResultUrl.value ? 'result' : (userPhotoUrl.value ? 'userPhoto' : 'empty')
      if (res.reply) {
        addMessage('assistant', 'text', res.reply)
      }
    }
  } catch (err) {
    removeMessage(loadingMsg.id)
    addMessage('assistant', 'text', `请求失败：${err.message}`)
  } finally {
    isGenerating.value = false
  }
}

// ======================= 发送消息 =======================
async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isGenerating.value) return

  inputText.value = ''

  // 如果包含"试戴"，提取发型名触发试戴
  if (text.includes('试戴')) {
    const style = text.replace('试戴', '').trim()
    if (style) {
      await tryOnStyle(style)
      return
    }
  }

  // 如果是"推荐"或"分析"类消息，但没有上传照片，则拦截
  if ((text.includes('推荐') || text.includes('分析') || text.includes('适合什么发型')) && !userPhotoUrl.value) {
    showToast('请先上传您的照片')
    addMessage('assistant', 'text', '请先上传您的照片，我才能帮你分析脸型并推荐适合的发型哦~ 📸')
    return
  }

  // 普通消息
  addMessage('user', 'text', text)

  const loadingMsg = addMessage('assistant', 'loading', '正在处理...')
  isGenerating.value = true

  try {
    const formData = new FormData()
    formData.append('session_id', sessionId.value)
    formData.append('message', text)

    const userFile = getUserPhotoFile()
    if (userFile) {
      formData.append('image', userFile)
      formData.append('new_photo', 'false')
    }

    const res = await postApi('/chat', formData)

    removeMessage(loadingMsg.id)

    if (res.image) {
      currentResultUrl.value = res.image.startsWith('http') ? res.image : API_BASE + res.image
      viewMode.value = 'result'
      addMessage('assistant', 'image', res.reply || '效果图生成完成', { image: currentResultUrl.value, showAdjust: true })
    } else if (res.reply) {
      // 尝试解析推荐发型
      const parsed = parseAnalysisReply(res.reply, null)
      if (parsed.recommendations.length > 0) {
        addMessage('assistant', 'analysis', res.reply, {
          faceInfo: parsed.faceInfo,
          recommendations: parsed.recommendations
        })
        quickTags.value = parsed.quickTags
      } else {
        addMessage('assistant', 'text', res.reply)
      }
    }
  } catch (err) {
    removeMessage(loadingMsg.id)
    addMessage('assistant', 'text', `请求失败：${err.message}`)
  } finally {
    isGenerating.value = false
  }
}

// ======================= 清除对话 =======================
async function confirmClear() {
  isClearModalOpen.value = false

  try {
    await deleteApi(`/session/${sessionId.value}`)
  } catch (e) {
    console.warn('清除会话失败:', e)
  }

  // 清空前端状态
  messages.value = []
  currentResultUrl.value = null
  currentZoom.value = 1
  userPhotoFile = null // 重置压缩后的照片文件
  quickTags.value = [
    ['锁骨短发', '推荐锁骨短发'],
    ['大波浪', '试戴大波浪'],
    ['显白发色', '推荐显白发色'],
    ['适合方脸', '什么发型适合方脸'],
    ['法式刘海', '试戴法式刘海'],
    ['羊毛卷', '试戴羊毛卷'],
  ]

  // 重新初始化 session
  sessionId.value = crypto.randomUUID()
  setStorage('hair_session_id', sessionId.value)

  addMessage('assistant', 'text', '当前对话已清除。请上传照片，我帮你分析脸型并生成推荐发型。')
  showToast('对话已清除')
}

// ======================= UI辅助 =======================
function toggleSettings() {
  isSettingsOpen.value = !isSettingsOpen.value
}

function showClearConfirm() {
  isClearModalOpen.value = true
}

function hideClearModal() {
  isClearModalOpen.value = false
}

function showToast(message) {
  toastText.value = message
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastVisible.value = false
  }, 2500)
}

function fillInput(text) {
  inputText.value = text
}

function checkInput() {
  // 可扩展实时验证
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage()
  }
}

function adjustZoom(delta) {
  currentZoom.value = Math.max(0.8, Math.min(1.5, currentZoom.value + delta))
}

async function regenerateImage() {
  if (!userPhotoUrl.value || isGenerating.value) return

  viewMode.value = 'loading'
  loadingText.value = '正在重新生成...'
  currentResultUrl.value = null

  const loadingMsg = addMessage('assistant', 'loading', '正在重新生成发型效果...')

  isGenerating.value = true

  try {
    const formData = new FormData()
    formData.append('session_id', sessionId.value)
    formData.append('message', '重新生成一张不同的发型效果图')

    const userFile = getUserPhotoFile()
    if (userFile) {
      formData.append('image', userFile)
      formData.append('new_photo', 'false')
    }

    const res = await postApi('/chat', formData)

    removeMessage(loadingMsg.id)

    if (res.image) {
      currentResultUrl.value = res.image.startsWith('http') ? res.image : API_BASE + res.image
      viewMode.value = 'result'
      addMessage('assistant', 'image', res.reply || '重新生成完成！满意吗？需要调整可以直接告诉我~', { image: currentResultUrl.value, showAdjust: true })
    } else {
      viewMode.value = userPhotoUrl.value ? 'userPhoto' : 'empty'
      addMessage('assistant', 'text', res.reply || '生成失败，请重试')
    }
  } catch (err) {
    removeMessage(loadingMsg.id)
    addMessage('assistant', 'text', `请求失败：${err.message}`)
  } finally {
    isGenerating.value = false
  }
}

function saveImage() {
  if (!currentResultUrl.value) return
  // 确保使用完整 URL 进行下载，而不是导航
  const imgUrl = currentResultUrl.value.startsWith('http')
    ? currentResultUrl.value
    : API_BASE + currentResultUrl.value
  fetch(imgUrl)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = '发发试戴效果.png'
      link.href = blobUrl
      link.click()
      URL.revokeObjectURL(blobUrl)
      showToast('图片已保存')
    })
    .catch(() => {
      // 备用方案：直接导航（但会离开页面）
      const link = document.createElement('a')
      link.download = '发发试戴效果.png'
      link.href = imgUrl
      link.target = '_blank'
      link.click()
    })
}

function handleScroll() {}
function handleViewportResize() {}
</script>