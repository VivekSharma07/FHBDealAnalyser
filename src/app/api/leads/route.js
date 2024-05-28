// app/api/podio/route.js
import axios from 'axios';

export async function GET(request) {
  try {
    const response = await axios.get(
      'https://workflow-automation.podio.com/podiofeed.php?c=19824&a=652365&f=7314'
    );
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching KPI data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch KPI data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(request) {
  // Handle POST requests
  // ...
}

export async function PUT(request) {
  // Handle PUT requests
  // ...
}

export async function DELETE(request) {
  // Handle DELETE requests
  // ...
}