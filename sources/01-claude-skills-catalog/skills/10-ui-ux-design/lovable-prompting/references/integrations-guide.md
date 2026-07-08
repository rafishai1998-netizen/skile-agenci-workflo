# Lovable Integrations Guide

How to connect Lovable apps to external services using webhooks, make.com, n8n, and edge functions.

## When to Use What

### Edge Functions (Supabase)

Use when:
- Direct API calls with well-documented APIs (OpenAI, Stripe, SendGrid)
- You need detailed error logs (Supabase ingests edge function logs automatically)
- The integration is straightforward request/response
- You want everything inside one platform

### make.com

Use when:
- The external service has a native make.com integration (CRMs, Slack, email tools)
- You are non-technical and need a visual builder
- The workflow is linear: receive data, process, respond
- You want fast setup without writing integration code

Trade-off: make.com charges per operation (one module execution = one operation). Costs add up at scale.

### n8n

Use when:
- You need custom code steps within the automation
- You want multi-agent workflows (n8n has an agent module for tool calls)
- You need to self-host for security or compliance
- Scale matters (n8n is cheaper at high volume than make.com)

## Webhook Integration Pattern

The core pattern for connecting Lovable to any external automation:

### Step 1: Create the Webhook Endpoint

In make.com or n8n, create a webhook trigger. This generates a URL that listens for incoming data.

### Step 2: Build the Lovable UI

Create a form or button in Lovable that collects user input. Your first prompt should focus only on the UI:

```
Build a user interface with a text input field and a submit button. When the
user clicks the button, it should send the text to a webhook. For now, just
create the UI with a clickable button. We will connect the webhook next.
```

### Step 3: Connect the Webhook

Once the UI exists, connect it to the webhook endpoint:

```
Send a POST JSON request of all user inputs to this webhook:
[paste webhook URL]

Expect a response from the webhook later. For now, just send the data cleanly
as text/string values.
```

### Step 4: Handle the Response

After confirming data flows to the webhook (check make.com/n8n to verify), add response handling:

```
The webhook now returns a response. Handle this response by displaying it in
a formatted container below the form. Show a loading state while waiting for
the response.
```

### Step 5: Test Incrementally

- Send minimal data first (one field)
- Verify the webhook receives it
- Add more fields
- Add response handling
- Add error handling last

## Example: Dental Consultation App

A practical example combining Lovable + make.com + AI APIs:

1. **Lovable:** Landing page with consultation form (name, email, dental issue description)
2. **make.com webhook:** Receives form data
3. **Perplexity API module:** Researches the dental condition
4. **GPT/reasoning model module:** Determines if the dentistry can handle this case or needs a specialist referral
5. **Webhook response:** Returns recommendation to Lovable UI

## Common Integration Errors

### Webhook Not Receiving Data

- Verify the webhook URL is correct and active
- Check that make.com/n8n is in "listening" mode when testing
- Open DevTools Network tab to confirm the POST request is sent
- Look for CORS errors in the console

### Response Not Displaying in Lovable

- Confirm the webhook response module is configured (make.com: add a "Webhook Response" module at the end)
- Check that Lovable is set up to handle async responses
- Verify the response format matches what the UI expects (JSON vs plain text)

### Authentication/Security Issues

- Edge function secrets should be stored in Supabase Edge Function Secrets, never in prompts
- Webhook URLs should be treated as semi-private (not secret, but not shared publicly)
- API keys for external services go in make.com/n8n connection settings, not in Lovable prompts

## Cheat Code: Screenshot-to-Edge-Function

If you built a working automation in make.com/n8n and want to convert it to a Supabase edge function:

1. Screenshot the entire automation flow
2. Feed it into a prompt: "This is what I am trying to replicate as a Supabase edge function. The flow goes from [step 1] to [step 2] to [step 3]. Write the edge function."
3. The visual flow serves as a cheat sheet for the AI, reducing ambiguity about the intended logic

## Prompting for Webhook Integration

When asking Lovable to set up webhook integrations, use chat mode first to verify understanding:

```
I now built a portion of the automation that sends back a response with [description].
Do you know how to handle this response? Confirm your approach before implementing.
```

This forces the AI to articulate its plan before writing code, catching misunderstandings early.
