import { test, expect } from '@playwright/test'

test.describe('Arabic i18n Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set language to Arabic
    await page.goto('/?lang=ar')
    await page.waitForLoadState('networkidle')
  })

  test('advanced search localizes to Arabic', async ({ page }) => {
    await page.goto('/search/advanced?lang=ar')
    await page.waitForLoadState('networkidle')
    
    // Check main title
    await expect(page.getByText('البحث المتقدم')).toBeVisible()
    
    // Check search placeholder
    await expect(page.getByPlaceholder('ابحث بالاسم أو المهارات أو الموقع أو الكلمات المفتاحية...')).toBeVisible()
    
    // Check filters button
    await expect(page.getByText('المرشحات')).toBeVisible()
    
    // Check skills
    await expect(page.getByText('أوتوكاد')).toBeVisible()
    await expect(page.getByText('ريفيت')).toBeVisible()
    await expect(page.getByText('إدارة المشاريع')).toBeVisible()
    
    // Check certifications
    await expect(page.getByText('رخصة مهندس محترف (PE)')).toBeVisible()
    await expect(page.getByText('شهادة PMP')).toBeVisible()
    
    // Check filter options
    await expect(page.getByText('جميع المواقع')).toBeVisible()
    await expect(page.getByText('كل مستويات الخبرة')).toBeVisible()
    await expect(page.getByText('أي تقييم')).toBeVisible()
  })

  test('engineers browse localizes to Arabic', async ({ page }) => {
    await page.goto('/engineers/browse?lang=ar')
    await page.waitForLoadState('networkidle')
    
    // Check main title
    await expect(page.getByText('البحث المتقدم')).toBeVisible()
    
    // Check search placeholder
    await expect(page.getByPlaceholder('ابحث بالاسم أو المهارات أو الموقع أو الكلمات المفتاحية...')).toBeVisible()
    
    // Check filters
    await expect(page.getByText('المرشحات')).toBeVisible()
    
    // Check skills tabs
    await expect(page.getByText('كل المهارات')).toBeVisible()
    await expect(page.getByText('أوتوكاد')).toBeVisible()
    await expect(page.getByText('ريفيت')).toBeVisible()
  })

  test('job status tracking localizes to Arabic', async ({ page }) => {
    await page.goto('/jobs/status-tracking?lang=ar')
    await page.waitForLoadState('networkidle')
    
    // Check main title
    await expect(page.getByText('تتبع حالة الوظيفة')).toBeVisible()
    
    // Check search placeholder
    await expect(page.getByPlaceholder('البحث عن الوظائف بالعنوان أو العميل أو المهندس...')).toBeVisible()
    
    // Check status tabs
    await expect(page.getByText('كل النتائج')).toBeVisible()
    await expect(page.getByText('معلق')).toBeVisible()
    await expect(page.getByText('قيد التنفيذ')).toBeVisible()
    await expect(page.getByText('مكتمل')).toBeVisible()
    
    // Check job details
    await expect(page.getByText('تصميم مبنى مكتبي')).toBeVisible()
    await expect(page.getByText('شركة الراجحي للإنشاءات')).toBeVisible()
    await expect(page.getByText('الرياض، المملكة العربية السعودية')).toBeVisible()
    
    // Check milestones
    await expect(page.getByText('المعالم')).toBeVisible()
    await expect(page.getByText('مفهوم التصميم الأولي')).toBeVisible()
    await expect(page.getByText('الرسومات التفصيلية')).toBeVisible()
    
    // Check team members
    await expect(page.getByText('أعضاء الفريق')).toBeVisible()
    await expect(page.getByText('المهندس الرئيسي')).toBeVisible()
    await expect(page.getByText('المهندس الإنشائي')).toBeVisible()
  })

  test('RTL layout is applied correctly', async ({ page }) => {
    await page.goto('/search/advanced?lang=ar')
    await page.waitForLoadState('networkidle')
    
    // Check that the page has RTL direction
    const htmlElement = await page.locator('html')
    await expect(htmlElement).toHaveAttribute('dir', 'rtl')
    
    // Check that text alignment is correct for RTL
    const mainContent = page.locator('main')
    await expect(mainContent).toHaveCSS('text-align', 'right')
  })

  test('language switching works correctly', async ({ page }) => {
    // Start in Arabic
    await page.goto('/search/advanced?lang=ar')
    await page.waitForLoadState('networkidle')
    
    // Verify Arabic content
    await expect(page.getByText('البحث المتقدم')).toBeVisible()
    
    // Switch to English
    await page.goto('/search/advanced?lang=en')
    await page.waitForLoadState('networkidle')
    
    // Verify English content
    await expect(page.getByText('Advanced Search')).toBeVisible()
    await expect(page.getByText('AutoCAD')).toBeVisible()
    await expect(page.getByText('Revit')).toBeVisible()
    
    // Switch back to Arabic
    await page.goto('/search/advanced?lang=ar')
    await page.waitForLoadState('networkidle')
    
    // Verify Arabic content again
    await expect(page.getByText('البحث المتقدم')).toBeVisible()
    await expect(page.getByText('أوتوكاد')).toBeVisible()
    await expect(page.getByText('ريفيت')).toBeVisible()
  })
})
