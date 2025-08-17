"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PreFooter from "@/components/pre-footer";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

function page() {
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex items-center justify-start bg-[var(--grey)] py-3">
          <div className="wrapper">
            <p className="text-[var(--grey-300)] text-sm">
              <Link href="/privacy" className="underline">
                Privacy
              </Link>
              / data-subject-rights
            </p>
          </div>
        </div>
        <div className="md:h-[273px] h-[100px] flex items-center justify-start bg-[var(--grey)]">
          <div className="wrapper">
            <h1 className="text-[calc(1.475rem_+_1.7vw)] text-[var(--primary)] max-w-[600px]">
              Data subject rights
            </h1>
          </div>
        </div>
        <div className="wrapper pt-40 pb-16">
          <div className="border-t border-[var(--line)] p-6 relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpen(!open && true);
              }}
            >
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] absolute top-6 right-6 transition-all duration-300 ease-in-out ${
                  open ? "rotate-180" : "rotate-0"
                } `}
                icon={faChevronDown}
                size="2xl"
              />
              <h2 className="text-2xl">About your data rights</h2>
            </div>
            <div
              className={`overflow-hidden transition-all ease-in-out duration-300 ${
                open ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <p className="pt-6">
                Welcome to Labour’s data subject rights page. Below you will
                find each data subject right you are entitled to with
                information about the right and how to express your rights to
                us. Should you need to return to the Privacy Notice you can do
                so by clicking here.
              </p>
            </div>
          </div>
          <div className="border-t border-[var(--line)] p-6 relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenTwo(!openTwo && true);
              }}
            >
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] absolute top-6 right-6 transition-all duration-300 ease-in-out ${
                  openTwo ? "rotate-180" : "rotate-0"
                } `}
                icon={faChevronDown}
                size="2xl"
              />
              <h2 className="text-2xl">Your right to be informed</h2>
            </div>
            <div
              className={`overflow-hidden transition-all ease-in-out duration-300 ${
                openTwo ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              <h2 className="text-3xl pt-6">Our commitment to you</h2>
              <p className="pt-6">
                Where the Labour Party is using your personal data, you have the
                right to be informed about it.
              </p>
              <p className="pt-2">
                We’re committed to make sure that everyone whose personal data
                is being held or used by us understands:
              </p>
              <ul className="list-disc ps-8 pt-3">
                <li className="pt-1">
                  What personal data we may collect from you/them
                </li>
                <li className="pt-1">What we do with it once we have it</li>
              </ul>
              <h2 className="text-3xl pt-6">How you will be informed</h2>
              <p className="pt-4">
                The Labour Party provides access to a data privacy notice, also
                known as a data protection notice, at the time we first collect
                personal data from you, either:
              </p>
              <ul className="list-disc ps-8 pt-3">
                <li className="pt-1">
                  via the privacy notices on our website, for example: accessed
                  via a link from a survey, questionnaire or other online form,
                  or another digital location we control; or verbal notification
                  of the relevant notice on this website
                </li>
                <li className="pt-1">
                  physically at a location where we are gathering your data
                </li>
                <li className="pt-1">in writing, issued to you upon request</li>
              </ul>
              <p className="pt-5">
                If we receive information about you from someone else, we’ll
                usually tell you before we use or share your personal data. This
                does not apply if we know you already have this information, or
                where the law says it’s not necessary.
              </p>
            </div>
          </div>
          <div className="border-t border-[var(--line)] p-6 relative">
            <div
              className="cursor-pointer"
              onClick={() => {
                setOpenThree(!openThree && true);
              }}
            >
              <FontAwesomeIcon
                className={`text-[var(--grey-300)] absolute top-6 right-6 transition-all duration-300 ease-in-out ${
                  openThree ? "rotate-180" : "rotate-0"
                } `}
                icon={faChevronDown}
                size="2xl"
              />
              <h2 className="text-2xl">
                Your right to access your personal data
              </h2>
            </div>
            <div
              className={`overflow-hidden transition-all ease-in-out duration-300 ${
                openThree ? "max-h-[4500px]" : "max-h-0"
              }`}
            >
              <p className="pt-6">
                If you have come to this page to submit a Data Subject Access
                Request, click here to go to the form you can complete which
                will act as your submission
              </p>
              <h2 className="text-3xl pt-6">Our commitment to you</h2>
              <p className="pt-6">
                Where the Labour party holds a copy of your personal data, you
                can request a copy of your personal data from us. This is known
                as a Data Subject Access Request (DSAR).
              </p>
              <p className="pt-2">You can ask us:</p>
              <ul className="list-disc ps-8 pt-3">
                <li className="pt-1">
                  what information we have about you and why
                </li>
                <li className="pt-1">
                  for a copy of the personal data we hold about you{" "}
                </li>
                <li className="pt-1">who we might share it with</li>
                <li className="pt-1">how long we keep this information for </li>
                <li className="pt-1">where we got your information from </li>
              </ul>
              <p className="pt-6">
                For some of this information it may be useful to see our privacy
                notices before making your request which can be found here.
              </p>
              <h2 className="text-3xl pt-6">When you submit a DSAR</h2>
              <p className="pt-6">
                Every DSAR we receive is logged by us. To conduct our search, we
                require:
              </p>
              <ul className="list-disc ps-8 pt-3">
                <li className="pt-1">
                  Your full name, email address, home address (including your
                  postcode), and if you are a Labour Member, your membership
                  number;
                </li>
                <li className="pt-1">
                  The dates to and from, you would like us to look e.g. From:
                  01/01/2024 to: 04/02/2024.
                </li>
                <li className="pt-1">
                  A clear description of the information you may be seeking. (If
                  we can find this specific information for you it may be easier
                  to complete your request more quickly);
                </li>
                <li className="pt-1">
                  A copy of the photo page of your passport or the side of your
                  driving licence with your photo (if you cannot provide these
                  for any reason, please contact us to discuss other possible
                  forms of ID) [Also see section 3 below]
                </li>
              </ul>
              <p className="pt-4">
                If we do not receive an item of the information above it will
                likely limit how much of our systems we are able to search or
                mean we are unable to continue with your request.
              </p>
              <p className="pt-4">
                How you have submitted your DSAR will determine how we will
                responded to you:
              </p>
              <ul className="list-disc ps-8 pt-3">
                <li className="pt-1">
                  Where you have completed an online form we have set up, you
                  will also receive an automatic email response as our
                  acknowledgement of receipt of your DSAR.
                </li>
                <li className="pt-1">
                  Where you have emailed dataprotection@labour.org.uk you will
                  have received an automatic email response as our
                  acknowledgement of receipt of your DSAR.
                </li>
                <li className="pt-1">
                  Where you have made a request for a DSAR via another Labour
                  email address or the Information Commissioner’s Office (ICO)
                  website, we will manually send you an email response as our
                  acknowledgement of receipt of your DSAR.
                </li>
                <li className="pt-1">
                  Where you have used a third-party data subject rights provider
                  and you have provided your direct email address, whether or
                  not you have provided a form of acceptable identification, we
                  will email you to confirm the DSAR was sent by you. If we do
                  not receive a reply from you as confirmation, we will not
                  continue with your DSAR.
                </li>
                <li className="pt-1">
                  Where a DSAR has been sent on your behalf by someone else,
                  maybe a friend, a relative, a solicitor or maybe an employee
                  of a consumer organisation such as Citizens Advice Bureau, we
                  will require a letter from them, signed by yourself,
                  confirming you have given permission to them to make the DSAR
                  on your behalf. Where this letter is not received, we will not
                  continue with your DSAR.
                </li>
              </ul>
              <p className="pt-4">
                Each response we send, unless you have already provided suitable
                identification, will contain a request for identification from
                you. This is for our identity verification purposes.
              </p>
              <p className="pt-4">
                Upon receipt of relevant identity information, we will let you
                know we have received this successfully and continue with your
                DSAR. If there are any problems we will let you know as soon as
                we can and will aim to let you know before the 30 day statutory
                period for reply.
              </p>
              <p className="pt-4">
                If there aren’t any problems (also see section 4 below), you
                will receive the information we are obliged to provide to you
                within 30 days of successfully passing our identity verification
                process.
              </p>
              <h2 className="text-3xl pt-6">Our approach to DSARs</h2>
              <p className="pt-4">
                The following bullet points provide some further information on
                the Labour Party’s general approach to dealing with DSARs in
                line with data protection legislation:
              </p>
              <ul className="list-disc ps-8 pt-3">
                <li className="pt-1">
                  We can only provide personal data that the Labour Party is
                  processing about you;
                </li>
                <li className="pt-1">
                  If your DSAR is deemed complex, we will need to apply an
                  exemption available to extend the timeframe for completion by
                  up to two months (in addition to the original 30 days);
                </li>
                <li className="pt-1">
                  We do not provide third party data, for example, a complaint
                  made about you;
                </li>
                <li className="pt-1">
                  We do not provide contextual information that could identify a
                  third party, for example, personal comments;
                </li>
                <li className="pt-1">
                  DSARs do not bypass the Labour Party’s internal complaints
                  process;
                </li>
                <li className="pt-1">
                  We do not disclose internal complaint procedures or policies
                  as part of a DSAR;
                </li>
                <li className="pt-1">We remove legally privileged advice;</li>
                <li className="pt-1">
                  Where we believe, or it is proven, that the information is
                  being requested so that you can target someone else, your DSAR
                  will be classified as “manifestly unfounded” and we will
                  reject your DSAR on these grounds;
                </li>
                <li className="pt-1">
                  Where you have used violent language, if your swear, or are
                  suggestive of any threat of violent within your request, your
                  DSAR will be classified as “manifestly unfounded” and we will
                  reject your DSAR on these grounds; and,
                </li>
                <li className="pt-1">
                  Where you make multiple DSARs for the same period of time, or
                  submit another DSAR within a period of time that is close to a
                  previous DSAR submission, where there is no good reason for
                  another DSAR submission, your DSAR will be classified as
                  “manifestly excessive” and we will reject your DSAR on these
                  grounds.
                </li>
                <li className="pt-1">
                  Where you are involved in a contentious issue (such as a
                  selection appeal, disciplinary investigation or where you are
                  contemplating or actively involved in litigation against the
                  Labour Party) this is classified as a complex request and will
                  have a probability of being rejected due to a reason above or
                  because, depending on the circumstances, it may be considered
                  “manifestly unfounded”, “manifestly excessive” or a
                  “vexatious” DSAR.
                </li>
              </ul>
              <p className="pt-4">
                For the avoidance of doubt, the definition of both “manifestly
                excessive” and “manifestly unfounded” align with the definition
                of “vexatious”. If we still consider a DSAR as vexatious yet it
                does not align easily with either definition, we will take all
                ICO related considerations and may consult with the ICO, before
                rejecting a DSAR for being “vexatious”.
              </p>
              <h2 className="text-2xl pt-4">
                A note on Freedom of Information (FOI) requests
              </h2>
              <p className="pt-4">
                The Labour Party does not fall into the category of “public
                authority” under the Freedom of Information Act 2000. We will
                not, therefore, provide information if you have made this type
                of request.
              </p>
              <h2 className="text-2xl pt-4">How else to submit a DSAR</h2>
              <p className="pt-4">
                You can also submit your request for a copy of your personal
                data by sending the required information via email to
                dataprotection@labour.org.uk or by post within a letter to:
              </p>
              <p className="pt-4 text-sm font-bold">
                Labour Statutory Data Protection Officer
              </p>
              <p className="pt-4">
                The Labour Party, Southworks, 20 Rushworth Street, United
                Kingdom, SE1 0SS{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PreFooter />
      <Footer />
    </div>
  );
}

export default page;
