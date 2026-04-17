
async function testRegistration() {
  const testData = {
    fullName: "OFFICIAL_FINAL_BACKEND_TEST",
    rollNumber: "VERIFIED_007",
    department: "CSE",
    year: "3rd Year",
    mobile: "9999999999",
    email: "test@example.com",
    college: "NNRG",
    preferredDomain: "Web Development",
    transactionId: "TXN123456789"
  };

  console.log("Testing Registration API...");
  try {
    const response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log("Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testRegistration();
