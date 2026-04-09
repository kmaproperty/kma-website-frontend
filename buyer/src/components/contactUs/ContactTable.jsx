const dummyData = [
  {
    sno: 1,
    city: "Noida",
    address: "Rahul Mehta (Sales Consultant) KMA Realty, Sector 62",
    phone: "+91 98765 43210",
    email: "rahul.mehta@kma.in"
  },
  {
    sno: 2,
    city: "Delhi",
    address: "Nidhi Sharma (Partner Onboarding) KMA Partner Team",
    phone: "+91 91234 56789",
    email: "nidhi.sharma@kma.in"
  },
  {
    sno: 3,
    city: "Lucknow",
    address: "Mohit Verma (Support) KMA Channel Desk",
    phone: "+91 90012 34567",
    email: "mohit.verma@kma.in"
  },
]

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

      {
        dummyData.map((item, index) => (
          <div key={index} className="flex border-b border-gray-200 py-3">
            <p className="w-[6%] px-2">{item.sno}</p>
            <p className="w-[12%] px-2">{item.city}</p>
            <p className="w-[42%] px-2">
              <b>{item.address.split(" ")[0]}</b> {item.address.split(" ").slice(1).join(" ")}
            </p>
            <p className="w-[20%] px-2">{item.phone}</p>
            <p className="w-[20%] px-2">{item.email}</p>
          </div>
        ))
      }
      
      
    </div>
  );
};

export default ContactTable;
