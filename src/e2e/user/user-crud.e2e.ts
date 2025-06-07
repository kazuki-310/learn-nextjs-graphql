import { Browser, Page } from 'playwright';
import { UserTestHelpers } from './helpers';
import { UserTestData } from './types';

async function testUserCRUD(): Promise<void> {
  console.log('🚀 Starting User CRUD E2E Tests...');
  
  let browser: Browser | undefined;
  let page: Page | undefined;

  const testUserData: UserTestData = {
    name: 'Test User E2E TypeScript',
    email: 'e2e-ts@example.com',
    role: 'admin'
  };

  try {
    // Setup
    browser = await UserTestHelpers.createBrowser();
    page = await UserTestHelpers.createPage(browser);

    // Navigate to users page
    console.log('📋 Navigating to users page...');
    await UserTestHelpers.navigateToUsers(page);
    await UserTestHelpers.takeScreenshot(page, 'step1-users-page');

    // Test 1: CREATE - Create new user
    console.log('➕ Test 1: Creating new user...');
    await UserTestHelpers.navigateToCreateUser(page);
    await UserTestHelpers.takeScreenshot(page, 'step2-create-form');

    await UserTestHelpers.fillUserForm(page, testUserData);
    await UserTestHelpers.takeScreenshot(page, 'step3-form-filled');

    await UserTestHelpers.submitForm(page, '作成');
    await UserTestHelpers.takeScreenshot(page, 'step4-after-create');

    console.log('✅ CREATE: User created successfully');

    // Test 2: READ - Verify user appears in list
    console.log('👁️ Test 2: Reading user from list...');
    const userExists = await UserTestHelpers.verifyUserExists(page, testUserData.name);
    
    if (!userExists) {
      throw new Error('User not found in list after creation');
    }
    console.log('✅ READ: User found in list');

    // Test 3: UPDATE - Edit user
    console.log('✏️ Test 3: Updating user...');
    await UserTestHelpers.openUserMenu(page, testUserData.name);
    await UserTestHelpers.clickMenuItem(page, '編集');
    await UserTestHelpers.takeScreenshot(page, 'step5-edit-form');

    const updatedUserData: UserTestData = {
      name: testUserData.name + ' UPDATED',
      email: testUserData.email,
      role: 'viewer'
    };

    await UserTestHelpers.fillUserForm(page, updatedUserData);
    await UserTestHelpers.submitForm(page, '更新');
    await UserTestHelpers.takeScreenshot(page, 'step6-after-update');

    // Verify update
    const updatedUserExists = await UserTestHelpers.verifyUserExists(page, updatedUserData.name);
    const correctRole = await UserTestHelpers.verifyUserRole(page, updatedUserData.name, 'viewer');

    if (!updatedUserExists || !correctRole) {
      throw new Error('User update verification failed');
    }
    console.log('✅ UPDATE: User updated successfully');

    // Test 4: DELETE - Delete user
    console.log('🗑️ Test 4: Deleting user...');
    await UserTestHelpers.openUserMenu(page, updatedUserData.name);
    await UserTestHelpers.clickMenuItem(page, '削除');
    await UserTestHelpers.takeScreenshot(page, 'step7-after-delete');

    // Wait for deletion to process
    await page.waitForTimeout(2000);

    const userStillExists = await UserTestHelpers.verifyUserExists(page, updatedUserData.name);
    if (userStillExists) {
      throw new Error('User still exists after deletion');
    }
    console.log('✅ DELETE: User deleted successfully');

    // Success summary
    console.log('🎉 ALL USER CRUD TESTS PASSED! ✨');
    console.log('📊 Test Summary:');
    console.log('   ✅ CREATE: User creation');
    console.log('   ✅ READ: User listing');
    console.log('   ✅ UPDATE: User editing');
    console.log('   ✅ DELETE: User deletion');

  } catch (error) {
    console.error('❌ Test failed:', error);
    
    if (page) {
      await UserTestHelpers.takeScreenshot(page, 'test-failure');
      console.log('📸 Failure screenshot saved');
    }
    
    throw error;
  } finally {
    if (browser) {
      console.log('🔄 Closing browser...');
      await browser.close();
    }
  }
}

// Run the test
testUserCRUD().catch((error) => {
  console.error('Test execution failed:', error);
  process.exit(1);
});