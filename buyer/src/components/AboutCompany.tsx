"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Building2,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function AboutCompany() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Hero Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-extrabold text-blue tracking-tight leading-tight max-w-3xl mx-auto">
            Explore 3000+ verified listings <br className="hidden sm:inline" />{" "}
            across premium locations.
          </h1>
          <div className="w-24 h-1 bg-[#010048] mx-auto mt-6 rounded-full" />
        </div>

        <div className="text-gray-600 text-sm md:text-base leading-relaxed space-y-6">
          <div className="space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight mt-2">
              Why So Many Property Seekers in Delhi NCR Choose KMA Global
              Property?
            </h2>
            <p>
              Finding the right property in Gurugram or Delhi NCR is rarely a
              straightforward experience. Listings go stale. Agents don't call
              back. Prices quoted online rarely match what you're told at the
              site visit. It's a process most buyers describe as exhausting, and
              most renters simply dread.
            </p>
            <p>That's the problem KMA Global Property was built to address.</p>
            <p>
              We're not a portal that aggregates thousands of verified listings
              and leaves you to sort through the noise. We work differently, as
              a referral-based platform that connects serious property seekers
              with verified owners, trusted channel partners, and experienced
              real estate professionals across Delhi NCR like Gurugram, Noida,
              Faridabad, and Ghaziabad.
            </p>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden space-y-6 ${
              isExpanded
                ? "max-h-auto opacity-100 mt-6"
                : "max-h-0 opacity-0 pointer-events-none"
            }`}
          >
            {/* Section 2 */}
            <div className="pt-4 space-y-4">
              <p>
                Every property on our platform goes through a basic review
                before it appears: no ghost listings, no outdated prices, no
                properties that were sold six months ago. When you browse KMA,
                what you see is what's actually available.
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#010048]/80 shrink-0" />
                <span>More Than a Search Engine for Homes</span>
              </h2>
              <p>
                Most people come to us looking for a property. What they find is
                something more useful, a team that understands the NCR market
                well enough to give them a real opinion.
              </p>
              <p>
                Which sectors on Dwarka Expressway are seeing genuine price
                appreciation? Which builder floors in South Delhi come with
                clean title documentation? Where in New Gurugram do you get the
                best value for a 2BHK right now, and where are you paying for a
                brand name more than actual quality?
              </p>
              <p>
                These are questions that don't have a filter on any portal. But
                they're exactly the kind of questions our network of channel
                partners and property professionals can answer, because they're
                working this market every day.
              </p>
              <p>
                When you reach out to KMA, you're not routed to a generic
                customer support queue. You're connected directly to someone
                with ground-level knowledge of the area you're looking in.
              </p>
            </div>

            {/* Section 3 */}
            <div className="pt-4 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#010048]/80 shrink-0" />
                <span>A Platform Built Around Trust, Not Transactions</span>
              </h2>
              <p>
                One thing we're deliberate about: we don't handle direct
                financial settlements or loan disbursals. If you need home loan
                support, we'll connect you to the right external professionals,
                people we've worked with and trust. Our role is to make sure the
                right people find each other, then step back and let the experts
                handle what they're best at.
              </p>
              <p>
                This referral-based model keeps our incentives aligned with
                yours. We succeed when you close the right deal, not just any
                deal.
              </p>
              <p>
                It also means our channel partners are people we've personally
                vetted. The 350+ professionals in our network aren't just
                registered users; they're agents and brokers who have been
                onboarded through a review process and hold themselves
                accountable to the same standards of clarity and transparency we
                do.
              </p>
            </div>

            {/* Section 4 */}
            <div className="pt-4 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-[#010048]/80 shrink-0" />
                <span>Real Estate in NCR Is Complex. We Make It Less So.</span>
              </h2>
              <p>
                Whether you're a first-time buyer trying to understand stamp
                duty in Haryana, an NRI investor evaluating plots near Jewar
                Airport, or a landlord who simply wants a valid rent agreement
                without visiting three government offices, KMA brings the right
                structure to what is otherwise a very unstructured process.
              </p>
              <p>
                Property decisions are among the most significant financial
                choices most people make. We take that seriously.
              </p>
              <p>
                If you're ready to start, or just have questions you haven't
                found straight answers to yet, our team is here. No pressure, no
                scripts, just real information from people who know this market.
              </p>
            </div>

            <div className="pt-8 border-t border-gray-100 space-y-6">
              <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight">
                Earn While You Refer - KMA Coin Rewards Program
              </h2>
              <p>
                If you've had a good experience with KMA, sharing it shouldn't
                just feel good; it should be worth something. Our Coin Rewards
                Program is designed for users who are already part of the KMA
                network and want to bring others in. It's straightforward, fair,
                and tied to real outcomes rather than just sign-ups.
              </p>
              <p>
                Here's how it works: When you create an account on KMA, you
                receive 1 Coin simply for joining. If you then refer a friend
                and they register on the platform, you earn 1 additional Coin,
                bringing your total to 2 Coins. Each Coin holds a value of
                ₹1,000.
              </p>

              <h3 className="text-lg font-bold text-[#010048] pt-2">
                When can you withdraw?
              </h3>
              <p>
                This is where our model differs from typical referral schemes.
                We don't release rewards just for registrations, because that
                doesn't benefit anyone in a meaningful way.
              </p>
              <p>
                Your first Coin (registration reward) becomes withdrawable once
                your own property deal is successfully completed through KMA.
                Your second Coin (referral reward) becomes withdrawable once the
                friend you referred also completes their deal. You can continue
                referring more people, and you'll earn additional Coins each
                time a referred user successfully completes a property
                transaction through KMA.
              </p>

              <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm mt-4">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-[#010048] text-white text-xs md:text-sm font-semibold tracking-wider">
                      <th className="p-4">Action</th>
                      <th className="p-4">Coins Earned</th>
                      <th className="p-4">Withdrawal Condition</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm text-gray-700 divide-y divide-gray-100 font-medium">
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 text-gray-900 font-semibold">
                        You register on KMA
                      </td>
                      <td className="p-4 text-green-600 font-bold">
                        1 Coin (₹1,000)
                      </td>
                      <td className="p-4 text-gray-500">
                        After your deal is completed
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/80 transition-colors">
                      <td className="p-4 text-gray-900 font-semibold">
                        Your referred friend registers
                      </td>
                      <td className="p-4 text-green-600 font-bold">
                        1 Coin (₹1,000)
                      </td>
                      <td className="p-4 text-gray-500">
                        After their deal is completed
                      </td>
                    </tr>
                    <tr className="bg-gray-50/50 font-bold text-gray-900">
                      <td className="p-4 text-[#010048]">Total possible</td>
                      <td className="p-4 text-[#010048]">2 Coins (₹2,000)</td>
                      <td className="p-4 text-gray-400 font-normal">
                        Per referral cycle
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 bg-white text-[#010048] border-2 border-[#010048] hover:bg-[#010048] hover:text-white transition-all duration-300 px-6 py-3 rounded-full text-sm font-semibold shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>{isExpanded ? "Read Less" : "Read More"}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>

        <div className="pt-10  space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-[#010048] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-1 font-medium">
              Real questions from property buyers, renters, and investors in
              Gurugram and Delhi NCR.
            </p>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              {
                q: "Is KMA Global Property a broker or a listing platform?",
                a: "Yes. KMA Global Property operates as both a real estate broker and a referral-based property platform. While we assist buyers, sellers, tenants, and investors throughout the property journey, we also connect them with verified property owners, trusted agents, and channel partners based on their specific requirements. Rather than acting solely as a traditional broker representing one party, we focus on helping the right people connect quickly and transparently.",
              },
              {
                q: "Are the properties listed on KMA verified?",
                a: "Yes. Every listing goes through a review before it's published. We check for basic accuracy, ownership relevance, current availability, and price reasonableness, so you're not wading through properties that are already sold or priced three years out of date. That said, we always recommend independent legal verification before finalising any property transaction, which is standard practice regardless of the platform you use.",
              },
              {
                q: "Does KMA charge buyers or tenants for property search?",
                a: "KMA charges apply based on the service and user type. Channel partners can list properties on our platform at no cost. Free listings are our way of supporting the agent and broker community. For buyers, tenants, and sellers, applicable fees are communicated upfront before any commitment, so there are no surprises mid-process.",
              },
              {
                q: "Do you provide home loans or financial services directly?",
                a: "We don't disburse loans or handle financial settlements ourselves. However, if you need home loan guidance or referrals to trusted lending professionals, we can connect you with external financial institutions and advisors we've worked with. It's not something we manage in-house, but we won't leave you to figure it out alone either.",
              },
              {
                q: "Which areas in NCR does KMA mainly cover?",
                a: "Our strongest presence is in Gurugram, where we actively track listings and price movements across high-demand corridors including Dwarka Expressway, Golf Course Extension Road, Sohna Road, and New Gurugram. Beyond Gurugram, we also cover Delhi, Noida, Greater Noida, and Faridabad, with varying inventory depth across each city.",
              },
              {
                q: "How does the KMA Coin Rewards Program work?",
                a: "When you register on KMA, you receive 1 Coin worth ₹1,00,00. Refer a friend who also registers, and you earn another Coin. Your registration Coin can be withdrawn after your own deal is completed; your referral Coin becomes available after your referred friend's deal closes. It's designed to reward real outcomes, not just sign-ups.",
              },
              {
                q: "How does your property buying process work?",
                a: "Once you share your requirement, budget, location, property type, and timeline, we match you with the most relevant channel partner or property professional from our network. They reach out directly to take the conversation forward. You're not handed off to a call centre; you're connected to someone who specialises in the area or property type you're looking for.",
              },
              {
                q: "I'm an NRI. Can I buy property in India through KMA?",
                a: "Yes, and we've helped several NRI buyers navigate this. We can arrange video walkthroughs, assist with documentation coordination, guide you on Power of Attorney requirements, and connect you with legal and financial professionals familiar with NRI property transactions in India. The entire initial process can be handled remotely.",
              },
              {
                q: "How do I become a channel partner with KMA?",
                a: "You can apply through our partner registration form. We review each application and schedule a brief onboarding conversation before formally adding partners to our network. There's no joining fee. Once onboarded, you get access to relevant buyer and tenant leads, shared listings, and direct coordination support from our team.",
              },
            ].map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div
                  key={index}
                  className="border border-gray-100 rounded-xl overflow-hidden bg-gray-50/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 font-semibold text-sm md:text-base text-[#010048] hover:bg-gray-50 transition-all outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 rounded-full bg-white text-[#010048] shadow-sm border border-gray-100/50">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-[500px] opacity-100 border-t border-gray-50 bg-white"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="p-5 text-xs md:text-sm text-gray-500 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
