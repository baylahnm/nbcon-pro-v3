import { test, expect } from '@playwright/test'

test.describe('Quote Comparison Table RTL/LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Arabic locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'ar')
    })
  })

  test('Arabic table renders correctly', async ({ page }) => {
    await page.goto('/jobs/quote-comparison')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
    
    // Check page title is translated
    await expect(page.locator('h1')).toContainText('مقارنة العروض')
    
    // Check table headers are properly aligned
    const tableHeaders = page.locator('th')
    for (let i = 0; i < Math.min(tableHeaders.count(), 5); i++) {
      const header = tableHeaders.nth(i)
      if (await header.isVisible()) {
        // Name columns should be text-start, numeric columns should be text-end
        const headerText = await header.textContent()
        if (headerText?.includes('اسم') || headerText?.includes('المهندس')) {
          await expect(header).toHaveCSS('text-align', 'start')
        } else if (headerText?.includes('السعر') || headerText?.includes('الوقت')) {
          await expect(header).toHaveCSS('text-align', 'end')
        }
      }
    }
  })

  test('Table data cells respect alignment rules', async ({ page }) => {
    await page.goto('/jobs/quote-comparison')
    
    // Wait for table to load
    await page.waitForSelector('table', { timeout: 10000 })
    
    // Check that name cells are left-aligned (text-start)
    const nameCells = page.locator('td').filter({ hasText: /مهندس|Engineer/ })
    for (let i = 0; i < Math.min(nameCells.count(), 3); i++) {
      const cell = nameCells.nth(i)
      if (await cell.isVisible()) {
        await expect(cell).toHaveCSS('text-align', 'start')
      }
    }
    
    // Check that numeric cells are right-aligned (text-end)
    const numericCells = page.locator('td').filter({ hasText: /[0-9]/ })
    for (let i = 0; i < Math.min(numericCells.count(), 3); i++) {
      const cell = numericCells.nth(i)
      if (await cell.isVisible()) {
        await expect(cell).toHaveCSS('text-align', 'end')
      }
    }
  })

  test('Table responsive layout works in RTL', async ({ page }) => {
    await page.goto('/jobs/quote-comparison')
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that table is responsive
    const table = page.locator('table')
    await expect(table).toBeVisible()
    
    // Check that table doesn't overflow horizontally
    const tableRect = await table.boundingBox()
    expect(tableRect?.width).toBeLessThanOrEqual(375)
  })
})

test.describe('Quote Comparison Table LTR', () => {
  test.beforeEach(async ({ page }) => {
    // Set up English locale
    await page.addInitScript(() => {
      window.localStorage.setItem('i18nextLng', 'en')
    })
  })

  test('English table renders correctly', async ({ page }) => {
    await page.goto('/jobs/quote-comparison')
    
    // Check HTML direction
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    
    // Check page title
    await expect(page.locator('h1')).toContainText('Quote Comparison')
  })
})
