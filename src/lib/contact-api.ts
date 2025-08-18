import { ContactFormData, NewsletterFormData } from '@/types';

export async function submitContactForm(data: ContactFormData) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || 'Failed to submit contact form');
  }

  return response.json();
}

export async function subscribeToNewsletter(data: NewsletterFormData) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.details || 'Failed to subscribe to newsletter');
  }

  return response.json();
}
