package com.salesforce.tests;

import com.salesforce.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.Test;

public class ValidLoginTest extends BaseTest {

    @Test(priority = 1, description = "Verify UI components on login page")
    public void testLoginPageUIElements() {
        try {
            LoginPage loginPage = new LoginPage(driver);
            Assert.assertTrue(loginPage.isUsernameFieldDisplayed(), "Username field should be visible");
            Assert.assertTrue(loginPage.isPasswordFieldDisplayed(), "Password field should be visible");
            Assert.assertTrue(loginPage.isLoginButtonEnabled(), "Login button should be enabled");
            Assert.assertFalse(loginPage.isRememberMeSelected(), "Remember Me checkbox should be unchecked by default");
            Assert.assertTrue(loginPage.getPageTitle().contains("Salesforce"), "Page title should contain 'Salesforce'");
        } catch (Exception e) {
            Assert.fail("Valid login page UI verification test failed: " + e.getMessage(), e);
        }
    }

    @Test(priority = 2, description = "Verify valid login form submission flow")
    public void testValidLoginSubmission() {
        try {
            LoginPage loginPage = new LoginPage(driver);
            String testUser = "test.user@enterprise.sandbox.salesforce.com";
            String testPassword = "EnterprisePassword123#";

            loginPage.setRememberMe(true);
            Assert.assertTrue(loginPage.isRememberMeSelected(), "Remember Me checkbox should be checked after selection");

            loginPage.doLogin(testUser, testPassword);

            Assert.assertFalse(loginPage.getCurrentUrl().isEmpty(), "Current URL must not be empty after submission");
        } catch (Exception e) {
            Assert.fail("Valid login execution test failed: " + e.getMessage(), e);
        }
    }
}
