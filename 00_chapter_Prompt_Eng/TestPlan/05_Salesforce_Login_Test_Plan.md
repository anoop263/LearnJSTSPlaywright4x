# Test Plan: Salesforce Authentication & Login Module

---

## 1. Test Plan ID and Title
- **Test Plan ID**: `TP-SF-AUTH-001`
- **Document Title**: Master Test Plan for Salesforce Login & Authentication Module
- **Version**: `1.0.0`
- **Status**: Approved / Ready for Execution
- **Author**: Lead QA Automation Architect

---

## 2. Objective and References

### 2.1 Objective
The objective of this test plan is to define the testing strategy, scope, execution workflow, and quality gates for the Salesforce Login Module (`https://login.salesforce.com/?locale=in`). This plan ensures that authentication functionality, UI validation, session retention, security controls, and negative error flows perform with enterprise reliability and adhere to production-grade quality standards.

### 2.2 References
| Reference Document | Location / Identifier | Description |
| :--- | :--- | :--- |
| Application Under Test | `https://login.salesforce.com/?locale=in` | Target Salesforce Login UI |
| Automation Framework | `00_chapter_Prompt_Eng/Selenium_Framework` | Selenium 4 + TestNG Page Object Model suite |
| QA Prompt Template | `00_chapter_Prompt_Eng/TestPlan/04_RICE_POT_Generic_QA_Template.md` | RICE-POT Profile B (Test Plan) |
| Architecture Standard | IEEE 829 Standard for Software Test Documentation | Test Plan Structural Standard |

---

## 3. In Scope and Out of Scope

### 3.1 In Scope
1. **Functional Authentication**:
   - Valid credential submission and landing page redirection.
   - Invalid username/password combinations and specific error messaging verification.
   - Blank field submissions (empty username, empty password, both empty).
2. **UI & Session Controls**:
   - "Remember Me" checkbox toggling and local state persistence.
   - Masking and security of password input field.
   - Component rendering (Username, Password, Log In button, branding elements).
3. **Navigation & Links**:
   - "Forgot Your Password?" link navigation.
   - "Use Custom Domain" link navigation.
4. **Cross-Browser Compatibility**:
   - Execution across Google Chrome (primary), Mozilla Firefox, and Microsoft Edge.
5. **Automation & Manual Hybrid Execution**:
   - Automated regression test execution via the Selenium 4 + TestNG suite.
   - Manual exploratory testing for edge UI rendering and security edge cases.

### 3.2 Out of Scope
1. Single Sign-On (SSO) / SAML federated identity provider logins.
2. Multi-Factor Authentication (MFA) SMS/Authenticator app hardware token validation.
3. Post-login backend CRM workflows (Leads, Contacts, Opportunities, Reports).
4. Automated CAPTCHA solving or third-party bot bypass mechanisms.
5. Performance, load, stress, and penetration testing of Salesforce infrastructure.

---

## 4. Requirements and Planned Coverage

| Requirement ID | Requirement Description | Test Level | Test Type | Planned Coverage Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-SF-01** | Valid credentials allow user access to authenticated Salesforce workspace | System / Integration | Functional Positive | Automated via `ValidLoginTest.testValidLoginSubmission` |
| **REQ-SF-02** | Invalid credentials display clear notification: *"Please check your username and password..."* | System | Functional Negative | Automated via `InvalidLoginTest.testInvalidCredentials` (`@DataProvider`) |
| **REQ-SF-03** | Submitting empty password displays required input prompt: *"Please enter your password."* | System | Validation Negative | Automated via `InvalidLoginTest.testEmptyPasswordSubmission` |
| **REQ-SF-04** | Login UI renders all required interactive components (inputs, buttons, titles) | System | UI / Usability | Automated via `ValidLoginTest.testLoginPageUIElements` |
| **REQ-SF-05** | Selecting "Remember Me" stores username in subsequent session visits | System | State / Session | Hybrid: Automated state toggle + manual session reload check |
| **REQ-SF-06** | "Forgot Your Password?" directs user to recovery URL (`/secur/forgotpassword.jsp`) | System | Navigation | Manual exploratory verification |
| **REQ-SF-07** | "Use Custom Domain" redirects user to domain input form (`mydomainLink`) | System | Navigation | Manual exploratory verification |
| **REQ-SF-08** | Authentication works uniformly across major browsers (Chrome, Firefox, Edge) | Compatibility | Cross-Browser | Automated matrix run via TestNG parallel execution |

---

## 5. Test Approach, Levels, and Types

### 5.1 Hybrid Test Approach
The testing strategy employs a dual-track approach:
1. **Automated Regression Track**:
   - Employs the Page Object Model (`LoginPage.java`) with PageFactory and explicit XPath selectors.
   - Continuous headless/headed execution through Maven (`mvn test`) and TestNG (`testng.xml`).
   - Thread-safe driver instances with condition-based `WebDriverWait` synchronization.
2. **Manual Exploratory Track**:
   - Focuses on edge cases: fast multi-clicks, session invalidation, visual layout rendering across resolutions, and keyboard accessibility (Tab, Enter keys).

### 5.2 Test Levels
- **System Testing**: End-to-end evaluation of the authentication form and error messaging behavior.
- **Regression Testing**: Automated suite executed upon code modifications or environment promotions.
- **Compatibility Testing**: Execution across Chrome, Firefox, and Edge browsers.

---

## 6. Environment, Tools, Access, and Test Data

### 6.1 Environments
| Environment | URL | Purpose |
| :--- | :--- | :--- |
| Salesforce Developer Sandbox | `https://login.salesforce.com/?locale=in` | Primary Test Execution Environment |
| Custom Domain Staging | `https://[custom-domain].my.salesforce.com` | Custom Domain Redirection Verification |

### 6.2 Tooling Stack
- **Language / Runtime**: Java 17 LTS
- **Automation Engine**: Selenium WebDriver 4.25.0
- **Test Runner & Assertions**: TestNG 7.10.2
- **Driver Management**: WebDriverManager 5.9.2
- **Build & CI Tool**: Apache Maven 3.9+ (`maven-surefire-plugin` 3.5.0)
- **Defect Tracking**: Jira / GitHub Issues

### 6.3 Test Data Matrix
| Persona / Scenario | Username / Email | Password | Expected Status |
| :--- | :--- | :--- | :--- |
| **Valid Active User** | `test.user@enterprise.sandbox.salesforce.com` | `EnterprisePassword123#` | Authenticated session created |
| **Invalid Credentials** | `invalid_user_alpha@test.com` | `InvalidPass123!` | Error message rendered |
| **Empty Password** | `valid.format.user@enterprise.com` | `[EMPTY]` | Error prompt rendered |
| **Special Characters** | `' OR '1'='1' --` | `admin' --` | Input sanitized, access denied |
| **Locked User** | `locked.account@enterprise.sandbox.salesforce.com` | `ValidPass123!` | Account locked notice |

> *Note: Real credentials must be injected dynamically via environment variables (`SF_TEST_USERNAME`, `SF_TEST_PASSWORD`) and never stored in source code.*

---

## 7. Entry and Exit Criteria

### 7.1 Entry Criteria
- [ ] Test environment is online and accessible with >= 99.9% uptime.
- [ ] Valid synthetic test accounts are provisioned and active in the test sandbox.
- [ ] Selenium automation test framework dependencies build cleanly without compile errors.
- [ ] Test plan and test scenarios are reviewed and approved by stakeholders.

### 7.2 Exit Criteria
- [ ] **100%** of planned test cases executed.
- [ ] **0** open Severity 1 (Blocker/Critical) defects.
- [ ] **0** open Severity 2 (Major) defects.
- [ ] Overall test pass rate is **>= 95%**.
- [ ] Automated regression suite passes 100% on the final release candidate build.
- [ ] Test summary report generated and signed off by the QA Lead.

---

## 8. Roles, Responsibilities, Estimates, and Schedule

### 8.1 Roles & Responsibilities
| Role | Assignee / Entity | Responsibilities |
| :--- | :--- | :--- |
| **QA Automation Lead** | Senior SDET | Test plan authoring, framework design, CI pipeline configuration |
| **QA Automation Engineer** | QA Team Member | Script maintenance, automated test execution, failure triaging |
| **Manual QA Engineer** | QA Team Member | Exploratory testing, visual layout checks, defect reporting |
| **Product Owner** | Product Lead | Requirements clarification, sign-off on exit criteria |

### 8.2 Execution Schedule & Estimates
| Activity | Estimated Effort | Target Timeline |
| :--- | :--- | :--- |
| Framework & Page Object Setup | Completed | Day 1 |
| Automated Script Authoring (`ValidLoginTest`, `InvalidLoginTest`) | Completed | Day 1 - Day 2 |
| Exploratory & Cross-Browser Testing | 4 Hours | Day 3 |
| Defect Retesting & Regression Suite Runs | 4 Hours | Day 4 |
| Final Test Summary Report & Sign-off | 2 Hours | Day 5 |

---

## 9. Defect Management and Reporting

### 9.1 Severity & Priority Classification
| Level | Severity (Impact) | Priority (Urgency) | SLA for Resolution |
| :--- | :--- | :--- | :--- |
| **Sev-1 / P1** | **Blocker**: Valid users unable to log in; system down | Immediate | < 4 Hours |
| **Sev-2 / P2** | **Critical**: Negative error flows broken; unmasked passwords | High | < 24 Hours |
| **Sev-3 / P3** | **Major**: Remember Me failing; broken redirect links | Medium | Current Sprint |
| **Sev-4 / P4** | **Minor**: Cosmetic layout alignment, label typos | Low | Backlog |

### 9.2 Defect Lifecycle
```
[New Defect] -> [Triage] -> [In Development / Fix] -> [Ready for QA] -> [Retesting] -> [Closed]
                                                                     \-> [Failed -> Reopened]
```

### 9.3 Defect Reporting Template
- **Defect ID**: `DEF-SF-[NUM]`
- **Title**: Concise defect description
- **Severity & Priority**: `Sev-[1-4]` / `P[1-4]`
- **Environment**: URL, OS, Browser + Version
- **Steps to Reproduce**: Numbered, deterministic steps
- **Expected Result**: Observable expected outcome
- **Actual Result**: Observed failure / error text
- **Artifacts**: Screenshot, video recording, or Selenium console log stack trace

---

## 10. Risks, Dependencies, Assumptions, and Open Questions

### 10.1 Risks & Mitigation
| Risk | Impact | Likelihood | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| CAPTCHA / Bot detection triggered during automated testing | High | Medium | Whitelist QA runner IP addresses or disable bot protection in test sandbox |
| Account lockout after multiple failed login iterations | Medium | High | Use dedicated pool of synthetic accounts; reset passwords before test runs |
| Flaky network timeouts on external Salesforce endpoints | Medium | Low | Use explicit `WebDriverWait` synchronization instead of hardcoded delays |

### 10.2 Dependencies
1. Availability and stability of the Salesforce Sandbox test tenant.
2. Unrestricted network egress to `https://login.salesforce.com`.
3. Maintenance of browser drivers matching installed browser versions via WebDriverManager.

### 10.3 Assumptions
- Synthetic test accounts have identical authentication permission sets as standard production users.
- Browser locale `?locale=in` produces English error messages as verified in the locators.

---

## 11. Suspension and Resumption Criteria

### 11.1 Suspension Criteria
Testing execution will be formally suspended if:
- Salesforce test sandbox is completely unreachable (HTTP 500/503 errors).
- Valid test account credentials are revoked, expired, or locked.
- A critical blocker defect prevents the login page from loading or rendering inputs.

### 11.2 Resumption Criteria
Testing execution will resume once:
- The environmental defect is resolved and confirmed operational.
- Test accounts are unlocked and validated with a smoke test check.

---

## 12. Test Deliverables and Approval

### 12.1 Deliverables
1. **Master Test Plan**: This document (`05_Salesforce_Login_Test_Plan.md`).
2. **Automated Test Suite**:
   - [pom.xml](file:///c:/Users/ANOOP/Desktop/LearnJSTSPlaywright-4x/00_chapter_Prompt_Eng/Selenium_Framework/pom.xml)
   - [LoginPage.java](file:///c:/Users/ANOOP/Desktop/LearnJSTSPlaywright-4x/00_chapter_Prompt_Eng/Selenium_Framework/src/main/java/com/salesforce/pages/LoginPage.java)
   - [BaseTest.java](file:///c:/Users/ANOOP/Desktop/LearnJSTSPlaywright-4x/00_chapter_Prompt_Eng/Selenium_Framework/src/test/java/com/salesforce/tests/BaseTest.java)
   - [ValidLoginTest.java](file:///c:/Users/ANOOP/Desktop/LearnJSTSPlaywright-4x/00_chapter_Prompt_Eng/Selenium_Framework/src/test/java/com/salesforce/tests/ValidLoginTest.java)
   - [InvalidLoginTest.java](file:///c:/Users/ANOOP/Desktop/LearnJSTSPlaywright-4x/00_chapter_Prompt_Eng/Selenium_Framework/src/test/java/com/salesforce/tests/InvalidLoginTest.java)
   - [testng.xml](file:///c:/Users/ANOOP/Desktop/LearnJSTSPlaywright-4x/00_chapter_Prompt_Eng/Selenium_Framework/testng.xml)
3. **Execution Reports**: TestNG HTML surefire reports and console execution logs.
4. **Final Test Summary Report**: Post-execution sign-off document.

### 12.2 Approval & Sign-off
| Stakeholder | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **Lead QA Architect** | Test Engineering Lead | **Approved** | 2026-10-06 |
| **Product Owner** | CRM Product Manager | **Approved** | 2026-10-06 |
| **Engineering Lead** | Software Development Lead | **Approved** | 2026-10-06 |
