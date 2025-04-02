const { test, expect } = require("@playwright/test");

test("User Sign Up", async ({ page }) => {
  console.log("Navigating to website...");
  await page.goto("https://www.automationexercise.com/");

  console.log("Clicking Signup/Login button...");
  await page.click("text=Signup / Login");

  console.log("Filling name and email for sign up");
  await page.fill('input[name="name"]', "Test User");
  await page.fill('[data-qa="signup-email"]', "testNUser@example.com");
  await page.click('[data-qa="signup-button"]');

  console.log("Filling in details of sign up form");
  //   await page.screenshot({ path: "debug.png" });
  //   await page.locator("//input[@type='radio']").first().click();
  const radioButton = await page.locator("//input[@type='radio']").first();
  await radioButton.waitFor({ state: "visible", timeout: 5000 });
  await radioButton.click();

  await page.fill('input[name="name"]', "Test User");

  const emailInput = await page.locator("#email");
  await expect(emailInput).toBeDisabled();

  await page.fill("#password", "Test@1234");

  // Select Date of Birth
  await page.selectOption("#days", "2");
  await page.selectOption("#months", "2");
  await page.selectOption("#years", "2012");

  await page.fill('input[name="first_name"]', "Test");
  await page.fill('input[name="last_name"]', "User");
  await page.fill('input[name="address1"]', "21 Westmount");
  await page.fill('input[name="name"]', "Test User");
  await page.selectOption("#country", "Canada");
  await page.fill('input[name="state"]', "Ontario");
  await page.fill('input[name="city"]', "Kitchener");
  await page.fill('input[name="zipcode"]', "N2E 1C1");
  await page.fill('input[name="mobile_number"]', "2345436766");
  await page.click('[data-qa="create-account"]');
  console.log("Verifying account creation...");
  await page.waitForURL("https://www.automationexercise.com/account_created", {
    timeout: 15000,
  });

  // Verify the "Account Created!" message is visible
  const accountCreatedMessage = await page.locator("h2.title.text-center");
  await expect(accountCreatedMessage).toHaveText("Account Created!");
});


