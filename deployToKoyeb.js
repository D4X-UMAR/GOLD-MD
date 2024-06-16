const axios = require('axios');

async function deployToKoyeb() {
  try {
    // Set your Koyeb API key and repository details
    const apiKey = 'yvnpd9am585uq5m0302nyxui4vo8qf7ox0d4zg22ieduf7gglmxggntfkmy972xq';
    const repoName = 'GOLD-MD';
    const branch = 'main';

    // Set the Koyeb API endpoint and headers
    const koyebApiUrl = '';
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };

    // Create a new Koyeb deployment
    const deploymentResponse = await axios.post(`${koyebApiUrl}/deployments`, {
      "name": `Deployment for ${repoName}`,
      "type": "github",
      "github": {
        "repo": repoName,
        "branch": branch
      }
    }, { headers });

    const deploymentId = ;

    // Wait for the deployment to complete
    while (true) {
      const deploymentStatusResponse = await axios.get(`${koyebApiUrl}/deployments/${deploymentId}`, { headers });
      const status = deploymentStatusResponse.data.status;
      if (status === 'SUCCESS') {
        break;
      } else if (status === 'FAILURE') {
        throw new Error(`Deployment failed`);
      }
      await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
    }

    console.log(`Deployment successful!`);
  } catch (error) {
    console.error(`Error deploying to Koyeb: ${error.message}`);
  }
}

// Call the function to deploy your repository
deployToKoyeb();
