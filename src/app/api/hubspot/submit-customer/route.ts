import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Customer API Route called');
    console.log('Environment variables:', {
      HUBSPOT_PORTAL_ID: process.env.HUBSPOT_PORTAL_ID,
      HUBSPOT_CUSTOMER_FORM_GUID: process.env.HUBSPOT_CUSTOMER_FORM_GUID
    });
    
    const body = await request.json();
    console.log('Received customer form body:', body);
    
    // Extract form data
    const { firstname, lastname, email, phone, company, location, message } = body;
    
    // Validate required fields
    if (!firstname || !lastname || !email || !company) {
      return NextResponse.json(
        { error: 'Missing required fields: firstname, lastname, email, company' },
        { status: 400 }
      );
    }

    // Prepare HubSpot payload for customer form
    const hubspotPayload = {
      fields: [
        { name: 'firstname', value: firstname },
        { name: 'lastname', value: lastname },
        { name: 'email', value: email },
        { name: 'phone', value: phone || '' },
        { name: 'company', value: company },
        { name: 'location', value: location || '' },
        { name: 'message', value: message || '' }
      ],
      context: {
        pageUri: request.headers.get('referer') || '',
        pageName: 'Customer Inquiry Form Submission'
      }
    };

    console.log('Customer HubSpot payload:', JSON.stringify(hubspotPayload, null, 2));

    // Submit to HubSpot using customer form GUID
    const hubspotResponse = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_CUSTOMER_FORM_GUID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotPayload),
      }
    );

    console.log('HubSpot Customer Response Status:', hubspotResponse.status);
    console.log('HubSpot Customer Response Headers:', Object.fromEntries(hubspotResponse.headers.entries()));

    if (!hubspotResponse.ok) {
      const errorText = await hubspotResponse.text();
      console.error('HubSpot Customer API Error Status:', hubspotResponse.status);
      console.error('HubSpot Customer API Error Response:', errorText);
      console.error('Our customer payload was:', JSON.stringify(hubspotPayload, null, 2));
      return NextResponse.json(
        { error: `Failed to submit to HubSpot: ${hubspotResponse.status} - ${errorText}` },
        { status: 500 }
      );
    }

    const result = await hubspotResponse.json();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Customer form submitted successfully',
      hubspotResponse: result 
    });

  } catch (error) {
    console.error('Customer API Route Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
