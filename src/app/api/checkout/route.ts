import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { membershipAmount, extraDonation, paymentType } = await req.json();

    const interval = paymentType === 0 ? 'month' : 'year';
    const currency = 'eur';

    const line_items = [];

    // Membership
    if (membershipAmount > 0) {
      const membershipPrice = await stripe.prices.create({
        unit_amount: Math.round(membershipAmount * 100),
        currency,
        recurring: { interval },
        product_data: { name: 'Standard Rate' },
      });

      line_items.push({
        price: membershipPrice.id,
        quantity: 1,
      });
    }

    // Extra Donation
    if (extraDonation > 0) {
      const donationPrice = await stripe.prices.create({
        unit_amount: Math.round(extraDonation * 100),
        currency,
        recurring: { interval },
        product_data: { name: 'Donation Boost' },
      });

      line_items.push({
        price: donationPrice.id,
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items,
      success_url: 'http://localhost:3001/join',
      // success_url: 'https://dia-eire.vercel.app/join',
      cancel_url: 'http://localhost:3001/join',
      // cancel_url: 'https://dia-eire.vercel.app/join',
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    return NextResponse.json(
      { error: 'Something went wrong creating the session.' },
      { status: 500 }
    );
  }
}