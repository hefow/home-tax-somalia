try {
    const response = await fetch('/api/submit-report');
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError("Expected JSON response but received: " + contentType);
    }

    const data = await response.json();
    // Handle success
} catch (error) {
    console.error('Error submitting report:', error);
    // Handle error appropriately
} 