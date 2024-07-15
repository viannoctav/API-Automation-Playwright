How To Run tests :
1. Ketika mau run test script 1 folder tests
 npx playwright test


2. Ketika mau run test script specific file
 npx playwright test tests/your_file.spec.js



How Integrate Allure Report :  
1. Clean Report Existing sebelum generate report dari Allure
 Remove-Item -Recurse -Force ./allure-results

2. Generating Report Allure
 npx allure serve ./allure-results


	
