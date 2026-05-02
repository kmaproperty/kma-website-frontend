import { transectionType } from "@/lib/constants";
import { Checkbox } from "@mui/material";

export default function TransactionByMenu({
  transactionBy,
  setTransactionBy,
  setSelectedPropertyType,
  setSelectedMinBudget,
  setSelectedMaxBudget,
}: {
  transactionBy: { name: string; value: string };
  setTransactionBy: (item: { name: string; value: string }) => void;
  setSelectedPropertyType: (v: unknown[]) => void;
  setSelectedMinBudget?: (v: null) => void;
  setSelectedMaxBudget?: (v: null) => void;
}) {
  return (
        <div>
        <div className="space-y-3">
          {transectionType?.map((item) => (
            <div
              onClick={() => {
                setTransactionBy(item)
                setSelectedPropertyType([])
                if (item.value !== transactionBy?.value) {
                  setSelectedMinBudget?.(null)
                  setSelectedMaxBudget?.(null)
                }
              }}
              key={item.value}
              className="flex items-center gap-3 cursor-pointer"
            >
              <Checkbox
                size="small"
                className="!p-0"
                sx={{
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
                checked={transactionBy?.value == item.value}
              />
              <span className="text-sm text-gray-800">{item?.name}</span>
            </div>
          ))}
        </div>
       </div>
    )
}