import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem('i18nextLng', 'ar')
  })
})

test('Arabic renders on Services, Jobs, Payments, Notifications', async ({ page }) => {
  // Services
  await page.goto('/browse-services')
  await expect(page.locator('h1')).toHaveText(/تصفح الخدمات|الخدمات/i)

  // Jobs
  await page.goto('/jobs')
  await expect(page.locator('h1')).toHaveText(/الوظائف/i)

  // Payments
  await page.goto('/payments')
  await expect(page.locator('h1')).toHaveText(/المدفوعات/i)

  // Notifications
  await page.goto('/notifications')
  await expect(page.locator('h1')).toHaveText(/الإشعارات/i)
})


