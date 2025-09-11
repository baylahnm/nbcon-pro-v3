import { test, expect } from '@playwright/test'

test.describe('Chat Direction Auto RTL/LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Arabic locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'ar')
    })
  })

  test('Mixed content renders correctly in Arabic chat', async ({ page }) => {
    await page.goto('/chat/live')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    
    // Check message input has proper direction
    const messageInput = page.locator('textarea[placeholder*="اكتب"]')
    await expect(messageInput).toHaveAttribute('dir', 'auto')
    
    // Check that message containers have dir="auto"
    const messageContainers = page.locator('p.bidi-plaintext')
    await expect(messageContainers.first()).toHaveAttribute('dir', 'auto')
  })

  test('English numbers in Arabic chat maintain LTR', async ({ page }) => {
    await page.goto('/chat/live')
    
    // Find timestamp elements (should be LTR for numbers)
    const timestamps = page.locator('span').filter({ hasText: /[0-9]/ })
    
    // Check that timestamps maintain LTR direction
    for (let i = 0; i < Math.min(timestamps.count(), 3); i++) {
      const timestamp = timestamps.nth(i)
      if (await timestamp.isVisible()) {
        await expect(timestamp).toHaveAttribute('dir', 'ltr')
      }
    }
  })

  test('Message bubbles respect RTL layout', async ({ page }) => {
    await page.goto('/chat/live')
    
    // Check that chat interface is properly aligned
    const chatContainer = page.locator('.lg\\:col-span-2')
    await expect(chatContainer).toHaveCSS('text-align', 'start')
    
    // Check that message input area is properly aligned
    const inputArea = page.locator('.p-4.border-t')
    await expect(inputArea).toHaveCSS('text-align', 'start')
  })
})

test.describe('Chat Direction Auto LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up English locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'en')
    })
  })

  test('English chat renders correctly', async ({ page }) => {
    await page.goto('/chat/live')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Live Chat')
  })
})
