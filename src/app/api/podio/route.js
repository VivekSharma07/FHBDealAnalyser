// app/api/podio/route.js
import axios from 'axios';

export async function GET(request) {
  try {
    const response = await axios.get(
      'https://workflow-automation.podio.com/podiofeed.php?c=19824&a=710533&f=7313'
    );
    const transactions_response = await axios.get(`https://workflow-automation.podio.com/podiofeed.php?c=19824&a=679625&f=7316`);
    const final_response = response.data.map((item)=>{
      item['custom_url'] = `https://podio.com/foreverhomebuyercom/book-of-business/apps/relationship-deals/items/${item['podio-app-item-id']}`
      return item
    })
    const final_transaction = transactions_response.data.map((item)=>{
      item['custom_url'] = `https://podio.com/foreverhomebuyercom/plus-ultraossad/apps/transaction-coordination/items/${item['podio-app-item-id']}`
      return item;
    })
    const combined_data = [...final_response, ...final_transaction]
    return new Response(JSON.stringify(combined_data), {
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