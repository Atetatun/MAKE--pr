/**
 * API Integration Test File
 * 
 * Issue #9 Subtask: Test API responses
 * 
 * This file demonstrates how to use the API services and hooks
 * Run this in development console or create unit tests
 */

import { authService, cvService, aiService, exportService } from './services';

/**
 * Test Auth Service
 */
export const testAuth = async () => {
  console.log('=== Testing Auth Service ===');
  
  try {
    // Test signup
    console.log('Testing signup...');
    const signupResult = await authService.signup({
      email: 'test@example.com',
      password: 'Test1234',
    });
    console.log('Signup success:', signupResult);

    // Test login
    console.log('Testing login...');
    const loginResult = await authService.login({
      email: 'test@example.com',
      password: 'Test1234',
    });
    console.log('Login success:', loginResult);

    // Test get current user
    console.log('Testing getCurrentUser...');
    const currentUser = authService.getCurrentUser();
    console.log('Current user:', currentUser);

    // Test isAuthenticated
    console.log('Testing isAuthenticated...');
    const isAuth = authService.isAuthenticated();
    console.log('Is authenticated:', isAuth);

    return true;
  } catch (error) {
    console.error('Auth test failed:', error.message);
    return false;
  }
};

/**
 * Test CV Service
 */
export const testCV = async () => {
  console.log('=== Testing CV Service ===');
  
  try {
    // Test create CV
    console.log('Testing createCV...');
    const newCV = await cvService.createCV({
      template_id: 1,
      name: 'My Test CV',
    });
    console.log('Create CV success:', newCV);

    const cvId = newCV.id;

    // Test list CVs
    console.log('Testing listCVs...');
    const cvList = await cvService.listCVs();
    console.log('CV List:', cvList);

    // Test get CV
    console.log('Testing getCV...');
    const cv = await cvService.getCV(cvId);
    console.log('Get CV success:', cv);

    // Test update CV
    console.log('Testing updateCV...');
    const updatedCV = await cvService.updateCV(cvId, {
      header: { name: 'John Doe', email: 'john@example.com' },
      summary: { text: 'Professional developer' },
    });
    console.log('Update CV success:', updatedCV);

    // Test save progress
    console.log('Testing saveProgress...');
    const saveResult = await cvService.saveProgress(cvId, {
      header: { name: 'John Doe Updated' },
    });
    console.log('Save progress success:', saveResult);

    // Test delete CV (commented out to preserve test data)
    // console.log('Testing deleteCV...');
    // await cvService.deleteCV(cvId);
    // console.log('Delete CV success');

    return true;
  } catch (error) {
    console.error('CV test failed:', error.message);
    return false;
  }
};

/**
 * Test AI Service
 */
export const testAI = async () => {
  console.log('=== Testing AI Service ===');
  
  try {
    // Test generate experience
    console.log('Testing generateExperience...');
    const experienceOptions = await aiService.generateExperience({
      position: 'Senior Software Engineer',
      company: 'Tech Corp',
      duration: '2020-2023',
      achievements: 'Led team of 5 developers, improved performance by 40%',
    });
    console.log('Experience options:', experienceOptions);

    // Test generate skills
    console.log('Testing generateSkills...');
    const skillsOptions = await aiService.generateSkills({
      position: 'Frontend Developer',
      experience: '3 years',
      industry: 'Technology',
    });
    console.log('Skills options:', skillsOptions);

    // Test generate summary
    console.log('Testing generateSummary...');
    const summaryOptions = await aiService.generateSummary({
      position: 'Full Stack Developer',
      yearsExperience: '5',
      strengths: 'React, Node.js, Cloud Architecture',
      industry: 'SaaS',
    });
    console.log('Summary options:', summaryOptions);

    return true;
  } catch (error) {
    console.error('AI test failed:', error.message);
    return false;
  }
};

/**
 * Test Export Service
 */
export const testExport = async (cvId) => {
  console.log('=== Testing Export Service ===');
  
  try {
    if (!cvId) {
      console.log('Please provide CV ID');
      return false;
    }

    // Test export PDF
    console.log('Testing exportPDF...');
    const pdfBlob = await exportService.exportPDF(cvId);
    console.log('Export PDF success, blob size:', pdfBlob.size);
    exportService.downloadPDF(pdfBlob, 'test-cv.pdf');

    // Test export JSON
    console.log('Testing exportJSON...');
    const jsonData = await exportService.exportJSON(cvId);
    console.log('Export JSON success:', jsonData);
    exportService.downloadJSON(jsonData, 'test-cv.json');

    return true;
  } catch (error) {
    console.error('Export test failed:', error.message);
    return false;
  }
};

/**
 * Run all tests
 */
export const runAllTests = async () => {
  console.log('========================================');
  console.log('Running API Integration Tests');
  console.log('========================================');

  const authResult = await testAuth();
  const cvResult = await testCV();
  const aiResult = await testAI();

  console.log('========================================');
  console.log('Test Results:');
  console.log('Auth:', authResult ? '✓ PASS' : '✗ FAIL');
  console.log('CV:', cvResult ? '✓ PASS' : '✗ FAIL');
  console.log('AI:', aiResult ? '✓ PASS' : '✗ FAIL');
  console.log('========================================');

  return authResult && cvResult && aiResult;
};

// Export for window object (for console testing)
if (typeof window !== 'undefined') {
  window.testAPI = {
    testAuth,
    testCV,
    testAI,
    testExport,
    runAllTests,
  };
}

export default {
  testAuth,
  testCV,
  testAI,
  testExport,
  runAllTests,
};
