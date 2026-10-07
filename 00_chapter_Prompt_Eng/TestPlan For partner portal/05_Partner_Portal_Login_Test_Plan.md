# Test Plan: Partner Portal Authentication & Login Module

---

## 1. Test Plan ID and Title
- **Test Plan ID**: `TP-PP-AUTH-002`
- **Document Title**: Master Test Plan for Partner Portal Authentication & Login Module
- **Version**: `1.0.0`
- **Status**: Approved / Ready for Execution
- **Author**: Lead QA Automation Architect

---

## 2. Objective and References

### 2.1 Objective
The objective of this test plan is to establish a rigorous, production-grade test strategy, operational scope, execution methodology, and quality criteria for the Partner Portal Login Module hosted at `https://dev.one.truventor.com/auth/login`. This plan guarantees that authentication flows, error validation, input field security, session persistence, and UI responsiveness function with high reliability across target web browsers.

### 2.2 References
| Reference Document | Location / Identifier | Description |
| :--- | :--- | :--- |
| Application Under Test | `https://dev.one.truventor.com/auth/login` | Target Partner Portal Authentication UI |
| Problem Statement | `00_chapter_Prompt_Eng/TestPlan2/02_Problem_Statement.md` | Partner Portal Requirements Definition |
| RICE-POT QA Template | `00_chapter_Prompt_Eng/TestPlan2/04_RICE_POT_Generic_QA_Template.md` | Master RICE-POT QA Framework (Profile B) |
| Test Documentation Standard | IEEE 829 Standard for Software Test Documentation | Standardized Test Plan Structure |

---

## 3. In Scope and Out of Scope

### 3.1 In Scope
1. **Functional Authentication**:
   - Valid credential verification and redirection to the Partner Portal home/dashboard.
   - Negative authentication flows (invalid email, incorrect password, unregistered accounts).
   - Validation handling for blank submissions (empty email, empty password, all fields blank).
   - Real-time client-side and server-side validation error banner/message displays.
2. **UI & Input Controls**:
   - Email format checking (RFC-compliant format validations).
   - Password masking and show/hide password toggle functionality.
   - "Remember Me" / session persistence controls.
   - Component rendering and state verification (Login button enabled/disabled state, input labels).
3. **Navigation & External Links**:
   - "Forgot Password?" navigation flow and password reset request verification.
   - Links to registration/onboarding or external support links (if present on the login view).
4. **Cross-Browser & Compatibility Testing**:
   - Google Chrome (primary), Mozilla Firefox, and Microsoft Edge across modern desktop viewports.
5. **Execution Strategies**:
   - Automated regression test execution using Selenium WebDriver 4.x + Java 17 + TestNG.
   - Manual exploratory testing for visual alignments, rapid double-clicks, and keyboard navigation.

### 3.2 Out of Scope
1. Third-party Single Sign-On (SSO) / OAuth 2.0 social authentication providers.
2. Two-factor authentication (2FA) / SMS OTP challenge workflows.
3. Post-authentication portal features (Partner dashboard, orders, inventory, billing).
4. Automated CAPTCHA bypass or rate-limiting penetration attacks.
5. Infrastructure-level load, stress, and network denial-of-service testing.

---

## 4. Requirements and Planned Coverage

| Requirement ID | Requirement Description | Test Level | Test Type | Planned Coverage Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-PP-01** | Valid credentials authenticate partner user and redirect to dashboard | System / Integration | Functional Positive | Automated test with session assertion |
| **REQ-PP-02** | Invalid password displays error message and denies entry | System | Functional Negative | Automated test with `@DataProvider` |
| **REQ-PP-03** | Unregistered or malformed email displays validation warning | System | Validation Negative | Automated format validation check |
| **REQ-PP-04** | Submitting empty required fields prevents submission and highlights inputs | System | Validation Negative | Automated blank form submission test |
| **REQ-PP-05** | Password input is masked by default with working visibility toggle | System | UI / Security | Automated toggle state & attribute inspection |
| **REQ-PP-06** | "Remember Me" selection retains user email on subsequent portal visits | System | State / Session | Hybrid: Automated state toggle + manual session check |
| **REQ-PP-07** | "Forgot Password" link directs user to password recovery page | System | Navigation | Automated link redirection verification |
| **REQ-PP-08** | Authentication workflow functions consistently across Chrome, Firefox, and Edge | Compatibility | Cross-Browser | Automated TestNG parallel multi-browser execution |

---

## 5. Test Approach, Levels, and Types

### 5.1 Hybrid Test Approach
1. **Automated Regression Suite**:
   - Implements the Page Object Model (POM) with PageFactory or explicit `By` locators.
   - Condition-based synchronization using `WebDriverWait` and `ExpectedConditions` (zero `Thread.sleep()`).
   - Integrated with TestNG for structured assertions, data-driven tests, and execution suites (`testng.xml`).
2. **Manual Exploratory Testing**:
   - Validates visual aesthetics, font rendering, responsive viewport resizing, and accessibility navigation (Tab, Shift+Tab, Enter).

### 5.2 Test Levels
- **System Testing**: End-to-end evaluation of the authentication form and error messaging behavior.
- **Regression Testing**: Automated suite executed upon code modifications or environment promotions.
- **Compatibility Testing**: Multi-browser test runs on Chrome, Firefox, and Edge.

---

## 6. Environment, Tools, Access, and Test Data

### 6.1 Environments
| Environment | URL | Purpose |
| :--- | :--- | :--- |
| **Partner Portal Development** | `https://dev.one.truventor.com/auth/login` | Primary Execution Environment |
| **Partner Portal Staging** | `https://staging.one.truventor.com/auth/login` | Release Candidate Smoke Validation |

### 6.2 Tooling Stack
- **Language / Runtime**: Java 17 LTS
- **Automation Framework**: Selenium WebDriver 4.25.0
- **Test Runner & Annotations**: TestNG 7.10.2
- **Driver Management**: WebDriverManager 5.9.2
- **Build & Dependency Management**: Apache Maven 3.9+
- **Defect Tracking**: Jira / GitHub Issues

### 6.3 Test Data Matrix
| Persona / Scenario | Username / Email | Password | Expected Status |
| :--- | :--- | :--- | :--- |
| **Active Partner User** | `partner.test@truventor.com` | `PartnerPass2026#` | Authenticated session created |
| **Invalid Password** | `partner.test@truventor.com` | `WrongSecret!99` | Error message displayed |
| **Malformed Email** | `invalid-partner-format` | `AnyPassword123!` | Input validation error |
| **Empty Fields** | `[EMPTY]` | `[EMPTY]` | Submission blocked with prompts |
| **Locked/Inactive Partner** | `inactive.partner@truventor.com` | `PartnerPass2026#` | Account status alert |

> *Security Note: Real credentials must be injected dynamically via environment variables (`PARTNER_TEST_USER`, `PARTNER_TEST_PASS`) and never checked into source control.*

---

## 7. Entry and Exit Criteria

### 7.1 Entry Criteria
- [ ] Development environment `https://dev.one.truventor.com/auth/login` is deployed and operational.
- [ ] Test accounts with verified Partner roles are provisioned and active.
- [ ] Automation framework dependencies compile cleanly without missing coordinates.
- [ ] Test Plan and test cases have been reviewed and approved by stakeholders.

### 7.2 Exit Criteria
- [ ] **100%** of in-scope test cases executed.
- [ ] **0** open Severity 1 (Blocker/Critical) defects.
- [ ] **0** open Severity 2 (Major) defects.
- [ ] Overall test pass rate is **>= 95%**.
- [ ] Automated regression suite runs clean (100% pass) on release candidate build.
- [ ] Final Test Summary Report published and signed off by the QA Lead.

---

## 8. Roles, Responsibilities, Estimates, and Schedule

### 8.1 Roles & Responsibilities
| Role | Assignee / Entity | Responsibilities |
| :--- | :--- | :--- |
| **QA Automation Architect** | Lead QA | Test plan design, framework architecture, test suite review |
| **QA Automation Engineer** | QA Team Member | Script development, execution monitoring, bug reporting |
| **Manual QA Specialist** | QA Team Member | Exploratory testing, visual layout and UX edge cases |
| **Product Manager** | Truventor Product Team | Requirements clarification, acceptance sign-off |

### 8.2 Execution Schedule & Estimates
| Activity | Estimated Effort | Target Timeline |
| :--- | :--- | :--- |
| Test Plan Authoring & Review | Completed | Day 1 |
| Page Object & Automation Scripting | 6 Hours | Day 2 |
| Exploratory & Cross-Browser Execution | 4 Hours | Day 3 |
| Defect Retesting & Regression Runs | 4 Hours | Day 4 |
| Final Test Summary Report & Sign-Off | 2 Hours | Day 5 |

---

## 9. Defect Management and Reporting

### 9.1 Severity & Priority Classification
| Level | Severity (Impact) | Priority (Urgency) | Target SLA |
| :--- | :--- | :--- | :--- |
| **Sev-1 / P1** | **Blocker**: Users cannot log in; complete service interruption | Immediate | < 4 Hours |
| **Sev-2 / P2** | **Critical**: Password unmasked improperly; major validation failure | High | < 24 Hours |
| **Sev-3 / P3** | **Major**: "Remember Me" failure; broken reset password link | Medium | Current Sprint |
| **Sev-4 / P4** | **Minor**: Cosmetic styling inconsistencies, label typos | Low | Backlog |

### 9.2 Defect Lifecycle
```
[Logged] -> [Triage] -> [In Development / Fix] -> [Ready for QA] -> [Retesting] -> [Closed]
                                                                  \-> [Failed -> Reopened]
```

### 9.3 Defect Reporting Template
- **Defect ID**: `DEF-PP-[NUM]`
- **Title**: Brief, descriptive issue summary
- **Severity & Priority**: `Sev-[1-4]` / `P[1-4]`
- **Environment**: URL, Browser, OS, Screen Resolution
- **Steps to Reproduce**: Sequential, reproducible steps
- **Expected Result**: Expected observable outcome
- **Actual Result**: Observed defect outcome
- **Evidence**: Screenshots, video clips, or Selenium driver logs

---

## 10. Risks, Dependencies, Assumptions, and Open Questions

### 10.1 Risks & Mitigation
| Risk | Impact | Likelihood | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| Instability or downtime on development server (`dev.one.truventor.com`) | High | Medium | Execute smoke health check prior to suite run; alert DevOps on failure |
| Rate-limiting / IP blocking after automated bursts | Medium | Medium | Introduce small condition-based throttles; whitelist test runner IP |
| Dynamic DOM or locator updates during active development | High | Low | Use resilient, decoupled locator strategies with central Page Objects |

### 10.2 Dependencies
1. Continuous availability of the Partner Portal development environment.
2. Active synthetic accounts configured with partner access privileges.
3. Network egress allowing HTTPS traffic to `https://dev.one.truventor.com`.

### 10.3 Assumptions
- The development portal mirrors production authentication rules and password complexity policies.
- Error messages returned by the API are consistent in English across all responses.

---

## 11. Suspension and Resumption Criteria

### 11.1 Suspension Criteria
Testing will be suspended if:
- `dev.one.truventor.com` returns persistent 5xx server errors or is unreachable.
- Test accounts are locked or disabled without immediate reset capability.
- A Blocker (Sev-1) defect prevents rendering of the login form elements.

### 11.2 Resumption Criteria
Testing will resume once:
- The environment is confirmed operational via a successful manual ping.
- Test accounts are unlocked and verified through a single smoke login.

---

## 12. Test Deliverables and Approval

### 12.1 Deliverables
1. **Master Test Plan**: This document (`05_Partner_Portal_Login_Test_Plan.md`).
2. **Selenium Automation Suite**: Page Objects, test cases, and TestNG XML suite runner.
3. **Execution Results**: TestNG Surefire execution report and defect log exports.
4. **Final Test Summary Report**: Executive sign-off report summarizing coverage and pass metrics.

### 12.2 Approval & Sign-Off
| Stakeholder | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **Lead QA Architect** | Test Engineering Lead | **Approved** | 2026-10-07 |
| **Partner Portal Product Owner** | Product Manager | **Approved** | 2026-10-07 |
| **Engineering Lead** | Tech Lead | **Approved** | 2026-10-07 |
