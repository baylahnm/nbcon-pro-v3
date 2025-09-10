import { test, expect } from '@playwright/test'

test.describe('Engineer Filtering RTL/LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Arabic locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'ar')
    })
  })

  test('Arabic UI renders correctly', async ({ page }) => {
    await page.goto('/engineers/filter')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    
    // Check page title is translated
    await expect(page.locator('h1')).toContainText('البحث عن المهندسين')
    
    // Check search input is properly aligned
    const searchInput = page.locator('input[placeholder*="البحث"]')
    await expect(searchInput).toHaveCSS('text-align', 'start')
    await expect(searchInput).toHaveCSS('padding-inline-start', '2.5rem')
    
    // Check search icon is positioned correctly
    const searchIcon = page.locator('svg').first()
    await expect(searchIcon).toHaveCSS('inset-inline-start', '0.75rem')
  })

  test('Engineer cards respect RTL layout', async ({ page }) => {
    await page.goto('/engineers/filter')
    
    // Wait for engineer cards to load
    await page.waitForSelector('[data-testid="engineer-card"]', { timeout: 10000 })
    
    // Check that engineer cards are properly aligned
    const engineerCards = page.locator('[data-testid="engineer-card"]')
    await expect(engineerCards.first()).toHaveCSS('text-align', 'start')
    
    // Check that stats are aligned correctly
    const stats = page.locator('.grid.grid-cols-2.gap-4')
    await expect(stats.first()).toHaveCSS('text-align', 'start')
  })

  test('Filter controls work in RTL', async ({ page }) => {
    await page.goto('/engineers/filter')
    
    // Click on filters button
    const filtersButton = page.locator('button').filter({ hasText: 'تصفية' })
    await filtersButton.click()
    
    // Check that filter panel opens correctly
    const filterPanel = page.locator('[data-testid="filter-panel"]')
    await expect(filterPanel).toBeVisible()
    
    // Check that filter options are properly aligned
    const filterOptions = page.locator('.space-y-4')
    await expect(filterOptions).toHaveCSS('text-align', 'start')
  })
})

test.describe('Engineer Filtering LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up English locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'en')
    })
  })

  test('English UI renders correctly', async ({ page }) => {
    await page.goto('/engineers/filter')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Find Engineers')
  })
})
