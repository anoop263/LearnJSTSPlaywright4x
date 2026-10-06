package com.salesforce.tests;

import com.salesforce.pages.LoginPage;
import org.testng.Assert;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class InvalidLoginTest extends BaseTest {

    @DataProvider(name = "invalidCredentialsData")
    public Object[][] invalidCredentialsData() {
        return new Object[][]{
            {"invalid_user_alpha@test.com", "InvalidPass123!", "Please check your username and password. If you still can't log in, contact your Salesforce administrator."},
            {"qa_automation_dummy@randomdomain.org", "WrongSecret#99", "Please check your username and password. If you still can't log in, contact your Salesforce administrator."}
        };
    }

    @Test(priority = 1, dataProvider = "invalidCredentialsData", description = "Verify error message on submitting invalid credentials")
    public void testInvalidCredentials(String username, String password, String expectedErrorMessage) {
        try {
            LoginPage loginPage = new LoginPage(driver);
            loginPage.doLogin(username, password);
            Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error message container must be visible upon invalid login attempt");
            String actualMessage = loginPage.getErrorMessage();
            Assert.assertEquals(actualMessage, expectedErrorMessage, "Error message text does not match expected string");
        } catch (Exception e) {
            Assert.fail("Invalid login test execution failed: " + e.getMessage(), e);
        }
    }

    @Test(priority = 2, description = "Verify error message when password field is submitted empty")
    public void testEmptyPasswordSubmission() {
        try {
            LoginPage loginPage = new LoginPage(driver);
            loginPage.enterUsername("valid.format.user@enterprise.com");
            loginPage.clickLogin();
            Assert.assertTrue(loginPage.isErrorMessageDisplayed(), "Error notification must be rendered for empty password");
            String actualMessage = loginPage.getErrorMessage();
            Assert.assertTrue(actualMessage.contains("Please enter your password."), "Expected prompt to enter password, received: " + actualMessage);
        } catch (Exception e) {
            Assert.fail("Empty password test execution failed: " + e.getMessage(), e);
        }
    }
}
