const ContactTable = () => {
  return (
    <div className="w-full text-sm mt-6">
      {/* Header */}
      <div className="flex border-b border-gray-300 py-3 font-medium">
        <p className="w-[6%] px-2 text-[#888]">S.No.</p>
        <p className="w-[12%] px-2 text-[#888]">City</p>
        <p className="w-[42%] px-2 text-[#888]">Address</p>
        <p className="w-[20%] px-2 text-[#888]">Phone</p>
        <p className="w-[20%] px-2 text-[#888]">Email</p>
      </div>

      {/* Row 1 */}
      <div className="flex border-b border-gray-200 py-3">
        <p className="w-[6%] px-2">01</p>
        <p className="w-[12%] px-2">Noida</p>
        <p className="w-[42%] px-2">
          <b>Rahul Mehta</b> (Sales Consultant) KMA Realty, Sector 62
        </p>
        <p className="w-[20%] px-2">+91 98765 43210</p>
        <p className="w-[20%] px-2">rahul.mehta@kma.in</p>
      </div>

      {/* Row 2 */}
      <div className="flex border-b border-gray-200 py-3">
        <p className="w-[6%] px-2">02</p>
        <p className="w-[12%] px-2">Delhi</p>
        <p className="w-[42%] px-2">
          <b>Nidhi Sharma</b> (Partner Onboarding) KMA Partner Team
        </p>
        <p className="w-[20%] px-2">+91 91234 56789</p>
        <p className="w-[20%] px-2">nidhi.sharma@kma.in</p>
      </div>

      {/* Row 3 */}
      <div className="flex border-b border-gray-200 py-3">
        <p className="w-[6%] px-2">03</p>
        <p className="w-[12%] px-2">Lucknow</p>
        <p className="w-[42%] px-2">
          <b>Mohit Verma</b> (Support) KMA Channel Desk
        </p>
        <p className="w-[20%] px-2">+91 90012 34567</p>
        <p className="w-[20%] px-2">mohit.verma@kma.in</p>
      </div>
    </div>
  );
};

export default ContactTable;
