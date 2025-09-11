import { test, expect } from '@playwright/test'

test.describe('Engineers Browse - Skills Translation', () => {
  test('skills translate correctly in Arabic', async ({ page }) => {
    // Navigate to Arabic version of engineers browse page
    await page.goto('/?lng=ar')
    await page.goto('/engineers/browse')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Check that Arabic skill translations are visible
    await expect(page.getByText('التحليل الإنشائي')).toBeVisible()
    await expect(page.getByText('أوتوكاد (AutoCAD)')).toBeVisible()
    await expect(page.getByText('إدارة المشاريع')).toBeVisible()
    await expect(page.getByText('تصميم أنظمة التكييف والتهوية والتبريد (HVAC)')).toBeVisible()
    
    // Ensure raw English skills don't appear for mapped skills
    await expect(page.getByText('Structural Analysis')).toHaveCount(0)
    await expect(page.getByText('AutoCAD')).toHaveCount(0)
    await expect(page.getByText('Project Management')).toHaveCount(0)
    await expect(page.getByText('HVAC Design')).toHaveCount(0)
  })

  test('skills display correctly in English', async ({ page }) => {
    // Navigate to English version
    await page.goto('/?lng=en')
    await page.goto('/engineers/browse')
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    
    // Check that English skills are visible
    await expect(page.getByText('Structural Analysis')).toBeVisible()
    await expect(page.getByText('AutoCAD')).toBeVisible()
    await expect(page.getByText('Project Management')).toBeVisible()
    await expect(page.getByText('HVAC Design')).toBeVisible()
  })

  test('skill chips have proper RTL styling', async ({ page }) => {
    await page.goto('/?lng=ar')
    await page.goto('/engineers/browse')
    
    // Check that skill chips have proper RTL attributes
    const skillChips = page.locator('[class*="bidi-plaintext"]')
    await expect(skillChips.first()).toHaveAttribute('dir', 'auto')
    
    // Check text alignment
    const firstChip = skillChips.first()
    await expect(firstChip).toHaveClass(/text-start/)
  })
})


