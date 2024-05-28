// app/api/podio/route.js
import axios from 'axios';

export async function GET(request) {
  try {
    const response = await axios.post(
      'http://18.118.142.103:3000/serveToken'
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