import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { buffer } from 'micro'

// STRIPE
import Stripe from 'stripe'
import { prisma } from "~/server/db";
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
const endpointSecret = env.STRIPE_WEBHOOK_SECRET
// app.listen(4242, () => console.log('Running on port 4242'));


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction (NextJS won't properly parse the body of the request without this)
export const config ={
  api: {
    bodyParser: false,
  },
}



const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature'] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        endpointSecret
      )
    } catch (err) {
      // satisfy TS
      let message = "Unknown Error"
      if (err instanceof Error) message = err.message
      // main
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    // Handle the event (https://dashboard.stripe.com/test/webhooks/create?events=checkout.session.completed)
    switch (event.type) {
      // TODO(?): handle charge.succeeded (?)
      // TODO(?): handle payment_intent.created (?)

      // case 'payment_intent.succeeded':
      //   const completedEvent = event.data.object as { id: string, metadata: { userId: string } }
      //   console.log('completedEvent', completedEvent)

      //   // Then define and call a function to handle the completedEvent
      //   await prisma.user.update({
      //     where: {
      //       id: completedEvent.metadata.userId,
      //     },
      //     data: {
      //       credits: {
      //         increment: 100,
      //       },
      //     },
      //   })

      //   break;
      case 'checkout.session.completed':
        const completedEvent = event.data.object as { id: string, metadata: { userId: string } }
        console.log('completedEvent', completedEvent)

        // Then define and call a function to handle the completedEvent
        await prisma.user.update({
          where: {
            id: completedEvent.metadata.userId,
          },
          data: {
            credits: {
              increment: 100,
            },
          },
        })

        break;

      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    
    // Return a 200 response to acknowledge receipt of the event
    // res.send();
    res.json({ received: true })

  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}



export default webhook