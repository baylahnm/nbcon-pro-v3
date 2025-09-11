import { test, expect } from '@playwright/test';

test.describe('Advanced Search Page Arabic Localization', () => {
  test('advanced search localizes in Arabic', async ({ page }) => {
    await page.goto('/search/advanced?lng=ar');
    
    // Check page title and description
    await expect(page.getByRole('heading', { name: 'البحث المتقدم' })).toBeVisible();
    await expect(page.getByText('اعثر على المهندسين والخدمات والوظائف باستخدام مرشحات متقدمة')).toBeVisible();
    
    // Check search placeholder
    await expect(page.getByPlaceholder('ابحث بالاسم أو المهارات أو الموقع أو الكلمات المفتاحية...')).toBeVisible();
    
    // Check filter tabs
    await expect(page.getByText('كل النتائج')).toBeVisible();
    await expect(page.getByText('المهندسون')).toBeVisible();
    await expect(page.getByText('الخدمات')).toBeVisible();
    await expect(page.getByText('الوظائف')).toBeVisible();
    
    // Check filters button
    await expect(page.getByRole('button', { name: 'المرشحات' })).toBeVisible();
    
    // Open filters panel
    await page.getByRole('button', { name: 'المرشحات' }).click();
    
    // Check filter panel title
    await expect(page.getByText('مرشحات متقدمة')).toBeVisible();
    await expect(page.getByRole('button', { name: 'مسح الكل' })).toBeVisible();
    
    // Check filter field labels
    await expect(page.getByText('الموقع')).toBeVisible();
    await expect(page.getByText('الخبرة')).toBeVisible();
    await expect(page.getByText('التقييم الأدنى')).toBeVisible();
    await expect(page.getByText('نطاق الميزانية')).toBeVisible();
    await expect(page.getByText('التوفر')).toBeVisible();
    await expect(page.getByText('زمن الاستجابة')).toBeVisible();
    await expect(page.getByText('المهارات')).toBeVisible();
    await expect(page.getByText('الشهادات')).toBeVisible();
    await expect(page.getByText('اللغات')).toBeVisible();
    
    // Check empty state messages
    await expect(page.getByText('لا توجد نتائج')).toBeVisible();
    await expect(page.getByText('جرّب تعديل معايير البحث أو المرشحات للوصول إلى ما تبحث عنه.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'تعديل المرشحات' })).toBeVisible();
  });

  test('skills chips display in Arabic', async ({ page }) => {
    await page.goto('/search/advanced?lng=ar');
    
    // Open filters panel
    await page.getByRole('button', { name: 'المرشحات' }).click();
    
    // Check that skill chips are visible and translated
    await expect(page.getByText('أوتوكاد (AutoCAD)')).toBeVisible();
    await expect(page.getByText('إدارة المشاريع')).toBeVisible();
    await expect(page.getByText('التحليل الإنشائي')).toBeVisible();
  });

  test('certifications display in Arabic', async ({ page }) => {
    await page.goto('/search/advanced?lng=ar');
    
    // Open filters panel
    await page.getByRole('button', { name: 'المرشحات' }).click();
    
    // Check that certification chips are visible and translated
    await expect(page.getByText('رخصة مهندس محترف (PE)')).toBeVisible();
    await expect(page.getByText('إدارة المشاريع الاحترافية (PMP)')).toBeVisible();
    await expect(page.getByText('شهادة LEED')).toBeVisible();
  });

  test('languages display in Arabic', async ({ page }) => {
    await page.goto('/search/advanced?lng=ar');
    
    // Open filters panel
    await page.getByRole('button', { name: 'المرشحات' }).click();
    
    // Check that language chips are visible and translated
    await expect(page.getByText('العربية')).toBeVisible();
    await expect(page.getByText('الإنجليزية')).toBeVisible();
    await expect(page.getByText('الفرنسية')).toBeVisible();
  });
});


