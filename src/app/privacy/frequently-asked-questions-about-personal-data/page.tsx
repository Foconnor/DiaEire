import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex items-center justify-start bg-[var(--grey)] py-3">
          <div className="wrapper">
            <p className="text-[var(--grey-300)] text-sm">
              <Link href="/privacy" className="underline">
                Privacy
              </Link>{" "}
              / Frequently asked questions about personal data
            </p>
          </div>
        </div>
        <div className="md:h-[273px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
          <div className="wrapper">
            <h1 className="text-[calc(1.475rem_+_1.7vw)] text-[var(--primary)] max-w-[600px]">
              Frequently asked questions about personal data
            </h1>
          </div>
        </div>
        <div className="wrapper pt-10">
          <h2 className="text-3xl font-semibold mb-2">
            Where did you get my personal data?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            Unless you gave it to us in the past, we got your personal data,
            including your home address, from the Electoral Register.
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            What access does the Labour Party have to the Electoral Register?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            Political parties have access to the full electoral register and
            also to what’s known as the ‘marked register’. The ‘marked register’
            identifies contact details for individuals who have voted in
            previous elections, but importantly, not how they voted. This access
            is for ‘democratic engagement’ activities and is written into law
            under the ‘Representation of the People Regulations 2001’.
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            When did I consent to this use of my data?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            Under the law, consent is not required for the Labour Party to use
            your personal data from ‘the ‘Marked Register’ of the Electoral
            Register.You are not able to opt-out from the Marked Register,
            unlike the ‘Open Register’ version of the Electoral Register which
            permits opt out.’. The Information Commissioner’s Office has a good
            explainer about this if you’d like to understand more : Use of the
            electoral register | ICO
          </p>
          <p className="mb-4 text-[0.9rem] ">
            Where access to your data on the Electoral Register is governed by a
            law for political parties, the use of your data found on the
            Electoral Register by a political party is governed under the term
            “democratic engagement” activities as specified within Section 8(86)
            of the Data Protection Act 2018 (DPA18).
          </p>
          <p className="mb-4 text-[0.9rem] ">
            The lawful basis under the UK General Data Protection Regulation
            (GDPR) for a DPA18 ‘democratic engagement’ activity is a ‘task in
            the public interest’ otherwise known as ‘public task’. This also
            means political parties are not required to gather your consent for
            those uses of your personal data.
          </p>
          <p className="mb-4 text-[0.9rem] ">
            ‘Democratic engagement’ includes using your personal data to send
            you campaign materials in the post addressed directly to you and
            conduct a political campaign where we may knock on your front door
            at your home or registered location to speak with you, where we
            might:
          </p>
          <ul className="list-disc ps-8">
            <li className="mb-4">
              Ask you for voting preference score (who you are most likely to
              vote for in an election on a scale of 1-10);
            </li>
            <li className="mb-4">
              Ask if you if there are any local or national topics of interest
              to you;
            </li>
            <li className="mb-4">
              Ask you whether you would like direct contact with a local Labour
              MP or councillor (and take further details with your permission if
              you do);
            </li>
            <li className="mb-4">
              Where you are showing specific interest in Labour, ask if you
              might like to join Labour as a member, and provide you with the
              means to do so; and
            </li>
            <li className="mb-4">
              Where you are communicating specific interest in making any sort
              of financial contribution to Labour to help our cause, take some
              details and also gain your consent, so we can send information
              either electronically or in the post asking for donations or
              whether you would like to take part in things like the Labour
              Lottery and/or our raffle (you can opt out of this consent at any
              time)
            </li>
          </ul>
          <h2 className="text-3xl font-semibold mb-2">
            I’ve had communications with the Labour Party before but how can I
            stop you continuing to use my data?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            If you have interacted with the Labour Party before as a supporter
            and provided us with your email address at any time and no longer
            want to receive emails from us, it will often be much quicker for
            you to click ‘unsubscribe’ rather than submit a data subject rights
            request.
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            As a Labour Party member do I need to consent to party
            communications?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            Consent is not required for communications with you when you are a
            Labour Party member
          </p>
          <p className="mb-4 text-[0.9rem] ">
            If you are a Labour Party member and unless you have used an
            ‘unsubscribe’ button or notified us of specific contact preference
            in Labour Hub, we do not need to gain your consent to communicate
            anything to you. All members are given the opportunity to decide
            contact preferences when becoming a Labour member.A As a member of
            the Labour Party, you can login to Labour Hub and change or set you
            can set your communication preferences..
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            I’ve submitted a GDPR request, why do I have to submit ID?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            In this age of digital communications, not everyone using an email
            is who they say they are. We want to be sure we are communicating
            with the right person.
          </p>
          <p className="mb-4 text-[0.9rem] ">
            We have experienced people impersonating other people from their own
            email addresses. Sometimes, this is very convincing. It is perfectly
            legal for the Labour Party to verify who it is communicating with.
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            You don’t have a photo of me to prove it is me, why do I need to
            share a passport or driver’s license?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            When we ask you to verify who you are we split the digital from the
            physical. It is unlikely someone impersonating you through your own
            email address will have the physical documents we ask from you.
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            I don’t have a passport or driver’s license, what then?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            Where you are not comfortable sharing photo ID we are able to accept
            an image of a utility bill or council tax bill which displays your
            name and address (unfortunately we do not accept internet or mobile
            phone bills as forms of identification).
          </p>
          <h2 className="text-3xl font-semibold mb-2">
            Where do I submit a request?
          </h2>
          <p className="mb-4 text-[0.9rem] ">
            To understand how we use your personal data and submit your GDPR
            request you can visit the privacy pages on our website which can be
            found by clicking here.
          </p>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
