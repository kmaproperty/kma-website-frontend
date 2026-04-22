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
    <div className="w-full mt-6">
      <div className="overflow-x-auto rounded-md border border-[#E5E7EB]">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-3 py-3 text-left font-medium text-[#888]">S.No.</th>
              <th className="px-3 py-3 text-left font-medium text-[#888]">City</th>
              <th className="px-3 py-3 text-left font-medium text-[#888]">Address</th>
              <th className="px-3 py-3 text-left font-medium text-[#888]">Phone</th>
              <th className="px-3 py-3 text-left font-medium text-[#888]">Email</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item) => (
              <tr key={item.sno} className="border-b border-gray-200 last:border-0">
                <td className="px-3 py-3 align-top">{item.sno}</td>
                <td className="px-3 py-3 align-top">{item.city}</td>
                <td className="px-3 py-3 align-top">
                  <b>{item.address.split(" ")[0]}</b> {item.address.split(" ").slice(1).join(" ")}
                </td>
                <td className="px-3 py-3 align-top whitespace-nowrap">{item.phone}</td>
                <td className="px-3 py-3 align-top whitespace-nowrap">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
