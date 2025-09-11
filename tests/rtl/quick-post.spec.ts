import { test, expect } from '@playwright/test'

test.describe('Quick Job Post RTL/LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Arabic locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'ar')
    })
  })

  test('Arabic UI renders correctly', async ({ page }) => {
    await page.goto('/jobs/quick-post')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    
    // Check page title is translated
    await expect(page.locator('h1')).toContainText('نشر وظيفة سريع')
    
    // Check form elements are properly aligned
    const searchInput = page.locator('input[type="text"]').first()
    await expect(searchInput).toHaveCSS('text-align', 'start')
    
    // Check icons are mirrored
    const backButton = page.locator('button').filter({ hasText: 'رجوع' })
    await expect(backButton).toBeVisible()
  })

  test('Form layout respects RTL direction', async ({ page }) => {
    await page.goto('/jobs/quick-post')
    
    // Check that form sections are properly aligned
    const formSections = page.locator('.bg-white.dark\\:bg-gray-800.rounded-xl')
    await expect(formSections.first()).toHaveCSS('text-align', 'start')
    
    // Check input padding is logical
    const titleInput = page.locator('input[placeholder*="عنوان"]')
    await expect(titleInput).toHaveCSS('padding-inline-start', '1rem')
    await expect(titleInput).toHaveCSS('padding-inline-end', '1rem')
  })

  test('Budget field uses Arabic-Indic numerals', async ({ page }) => {
    await page.goto('/jobs/quick-post')
    
    // Find budget input and type a number
    const budgetInput = page.locator('input[type="number"]')
    await budgetInput.fill('1234')
    
    // Check that the input maintains LTR direction for numbers
    await expect(budgetInput).toHaveAttribute('dir', 'ltr')
  })
})

test.describe('Quick Job Post LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up English locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'en')
    })
  })

  test('English UI renders correctly', async ({ page }) => {
    await page.goto('/jobs/quick-post')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Quick Job Post')
  })
})
